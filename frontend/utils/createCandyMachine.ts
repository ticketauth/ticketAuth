import { bundlrStorage, CreateCandyMachineInput, DefaultCandyGuardSettings, Metaplex, toMetaplexFileFromBrowser, walletAdapterIdentity, PublicKey, toMetaplexFile, toBigNumber, sol } from "@metaplex-foundation/js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection } from "@solana/web3.js";

const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK ||
  WalletAdapterNetwork.Devnet) as WalletAdapterNetwork;

async function uploadImage(ticketImage : File,  metaplex: Metaplex): Promise<string> {
    const imgMetaplexFile = await toMetaplexFileFromBrowser(ticketImage); 
    const imgUri = await metaplex.storage().upload(imgMetaplexFile);
    console.log(`Image URI:`,imgUri);
    return imgUri;
}

async function uploadMetadata(imgUri: string, imgType: string, nftName: string, description: string, metaplex : Metaplex) {
    const { uri } = await metaplex
        .nfts()
        .uploadMetadata({
            name: nftName,
            description: description,
            image: imgUri,
            properties: {
                files: [
                    {
                        type: imgType,
                        uri: imgUri,
                    },
                ]
            }
    });
    console.log('Metadata URI:',uri);
    
    return uri;  
}

async function createCollectionNft(metadataUri: string, name: string, metaplex : Metaplex) {
    const { nft : collectionNft}  = await metaplex
        .nfts()
        .create({
            name: name,
            uri: metadataUri,
            sellerFeeBasisPoints: 0,
            updateAuthority: metaplex.identity(), 
            isCollection: true,
    });
    console.log(`✅ - Minted Collection NFT: ${collectionNft.address.toBase58()}`);
    console.log(`https://explorer.solana.com/address/${collectionNft.address.toBase58()}?cluster=${network}`);

    return collectionNft.address;
}

async function generateCandyMachine(totalTickets: number, ticketPrice : number , collectionAddress : PublicKey, collectionSymbol: string, metaplex: Metaplex) {
    const candyMachineSettings: CreateCandyMachineInput<DefaultCandyGuardSettings> =
        {
            authority: metaplex.identity(),
            itemsAvailable: toBigNumber(totalTickets), // Collection Size: 100
            sellerFeeBasisPoints: 1000, // 10% Royalties on Collection
            symbol: collectionSymbol,
            maxEditionSupply: toBigNumber(0), // 0 reproductions of each NFT allowed
            isMutable: true,
            creators: [
                { address: metaplex.identity().publicKey, share: 100 },
            ],
            collection: {
                address: collectionAddress,
                updateAuthority: metaplex.identity(),
            },
            itemSettings:{
                type: "configLines",
                prefixName: "Ticket #$ID+1$",
                nameLength: 0,
                prefixUri: "https://arweave.net/",
                uriLength: 43,
                isSequential: true,
            },
            guards: {
                solPayment: {
                amount: sol(ticketPrice),
                destination: collectionAddress,
                },
                redeemedAmount: {
                maximum: toBigNumber(totalTickets),
                },
                // gatekeeper: {
                //     network: new PublicKey("ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6"),
                //     expireOnUse: true
                // }
                
            }, 
        };
    
    const { candyMachine } = await metaplex.candyMachines().create(candyMachineSettings, {commitment : "finalized"});
    console.log(`✅ - Created Candy Machine: ${candyMachine.address.toBase58()}`);
    console.log(`     https://explorer.solana.com/address/${candyMachine.address.toBase58()}?cluster=${network}`);
        
    return candyMachine;
}

async function addItems(candyMachineID: PublicKey, uri : string, totalTickets : number, metaplex : Metaplex) {
  const candyMachine = await metaplex
    .candyMachines()
    .findByAddress({ address: candyMachineID });

  const items = [];
  for (let i = 0; i < totalTickets; i++) {
    // Add 10 NFTs (the size of our collection)
    items.push({
      name: "",
      uri: uri,
    });
  }

  const { response } = await metaplex.candyMachines().insertItems(
    {
      candyMachine,
      items: items,
    },
    { commitment: "finalized" }
  );

  console.log(
    `✅ - Items added to Candy Machine: ${candyMachineID.toString()}`
  );
  console.log(
    `https://explorer.solana.com/tx/${response.signature}?cluster=${network}`
  );
  return response.signature;
}

async function createNFT (eventName: string, eventDescription: string, startDate : string, endDate : string, eventCapacity: number, ticketPrice: number, ticketImage : File, metaplex : Metaplex, creatorPubKey: PublicKey): Promise<[string, string, string]> {
    //Step 1 - Upload Image
    const imgUri = await uploadImage(ticketImage, metaplex);
    //Step 2 - Upload Metadata
    const metadataUri = await uploadMetadata(imgUri, "video/mp4", eventName, eventDescription, metaplex); 
    //Step 3 - Minting CollectionNFT
    const collectionAddress = await createCollectionNft(metadataUri, eventName, metaplex);
    //Step 4 - Create Candy Machine
    const candyMachine = await generateCandyMachine(eventCapacity, ticketPrice,  collectionAddress, "tktAuth", metaplex)
    const candyMachineID = candyMachine.address;
    //Step 5 - Adding items to Candy Machine
    const uriData = metadataUri.split("/");
    const transactionSignature = await addItems(candyMachineID, uriData[3], eventCapacity, metaplex); 
    console.log("Ending createNFT function");
    return [collectionAddress.toBase58(), candyMachineID.toBase58(), transactionSignature];
}

export default async function createCandyMachine(
    eventName : string,
    eventDescription : string,
    startDate : string,
    endDate : string,
    eventCapacity: number,
    ticketPrice : number,
    ticketImage : File,
    wallet : WalletContextState,
) {
    const SOLANA_CONNECTION = new Connection(process.env.NEXT_QUICKNODE_RPC_HOST, {commitment: "finalized"});
    const metaplex = new Metaplex(SOLANA_CONNECTION)
        .use(walletAdapterIdentity(wallet)) // Will prompt the user 
        //.use(keypairIdentity(accountFromSecret))
        .use(bundlrStorage({
            address: process.env.NEXT_BUNDLR_ADDRESS || 'https://devnet.bundlr.network',
            providerUrl: process.env.NEXT_QUICKNODE_RPC_HOST || 'https://api.devnet.solana.com',
            timeout:60000,
        }));
    try{
        const data = await createNFT(eventName, eventDescription, startDate, endDate, eventCapacity, ticketPrice, ticketImage, metaplex, wallet.publicKey);
        console.log("Createcandymachine ending");
        return data;
    } catch(e : unknown){
        if(typeof e === "string") {
            console.log(e.toUpperCase());
        } else if (e instanceof Error) {
            console.log(e.message);
        }
    }
    console.log("Something")
    return []
    
    
}


// URL.createObjectURL();
// toMetaplexFileFromBrowser();