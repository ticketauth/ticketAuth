import { bundlrStorage, CreateCandyMachineInput, DefaultCandyGuardSettings, Metaplex, toMetaplexFileFromBrowser, walletAdapterIdentity, PublicKey, toMetaplexFile, toBigNumber, sol, InsertCandyMachineItemsOutput, insertCandyMachineItemsBuilder, InsertCandyMachineItemsInput, TransactionBuilder } from "@metaplex-foundation/js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionContext, useConnection, useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, Transaction } from "@solana/web3.js";

const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK ||
  WalletAdapterNetwork.Devnet) as WalletAdapterNetwork;
console.log(network);
const endpoint = process.env.NEXT_PUBLIC_QUICKNODE_RPC_HOST || "https://api.devnet.solana.com"


async function uploadImage(ticketImage : File,  metaplex: Metaplex): Promise<string> {
    const imgMetaplexFile = await toMetaplexFileFromBrowser(ticketImage); 
    const imgUri = await metaplex.storage().upload(imgMetaplexFile);
    console.log(`Image URI:`,imgUri);
    return imgUri;
    //return "https://arweave.net/ePCQH2yLcD_0TNw5kRUkUINEBMDkbGw7GbzmSuYRIJk"
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
    //return "https://arweave.net/GJQk6xMZhJnTkA_XdXJMlkrahGcMNAZitcr_k45-YKw"
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
async function createInstruction(candyMachineID: PublicKey, uri : string, totalTickets : number, metaplex : Metaplex, wallet: WalletContextState, connection: Connection) {
    const candyMachine = await metaplex
    .candyMachines()
    .findByAddress({ address: candyMachineID });
    
    let input: InsertCandyMachineItemsInput;
    let itemsToAdd: number;
    const transactionBuilder: TransactionBuilder[] = [];
    const totalLoop = Math.ceil(totalTickets/10);

    for(let j = 0; j < totalLoop; j++){
        totalTickets >= 10 ? itemsToAdd = 10 : itemsToAdd = totalTickets;
        totalTickets -= 10; 
        let items = [];
        
        for (let i = 0; i < itemsToAdd; i++) {
            items.push({
                name: "",
                uri: uri,
            });
        }
        let index = j == 0 ? 0 :  (j*10);
        
        input = {
            candyMachine,
            index: index , //just to set the index of the items to be added into the candy machine 
            items: items,
        }
        transactionBuilder.push(insertCandyMachineItemsBuilder(metaplex,input)); // this is to get the transaction from inserting items into candymachine
    }
    const blockhash = await metaplex.rpc().getLatestBlockhash();

    const transactions = transactionBuilder.map((t) => //turning transactionbuilder to transaction 
        t.toTransaction(blockhash)
    );
    const signedTransactions = await wallet.signAllTransactions(transactions) //signing all transaction 
    
    for (const ta of signedTransactions){
        const txid = await connection.sendRawTransaction( 
            ta.serialize(),
            {
            skipPreflight: false,
            }
        );
        console.log(txid);
    }
}

async function addItems(candyMachineID: PublicKey, uri : string, totalTickets : number, metaplex : Metaplex, wallet: WalletContextState) {
    const candyMachine = await metaplex
    .candyMachines()
    .findByAddress({ address: candyMachineID });
    const items = [];
    for (let i = 0; i < 9; i++) {
        //Adding max of 10 items per instruction
        items.push({
        name: "",
        uri: uri,
    });
    }
    let response: InsertCandyMachineItemsOutput;

    for(let j = 0; j < totalTickets/10; j++){
        let index = j == 0 ? 0 :  (j*10 - 1 );
        response = await metaplex.candyMachines().insertItems(
            {
            candyMachine,
            index: index , //just to set the index of the items to be added into the candy machine 
            items: items,
            },
        );

        console.log(response);
    }


    console.log(
    `✅ - Items added to Candy Machine: ${candyMachineID.toString()}`
    );
    console.log(
    `https://explorer.solana.com/tx/${response.response.signature}?cluster=${network}`
    );
    return response.response.signature
}

async function createNFT (eventName: string, eventDescription: string, startDate : string, endDate : string, eventCapacity: number, ticketPrice: number, ticketImage : File, metaplex : Metaplex, wallet: WalletContextState, connection: Connection): Promise<[string, string]> {
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
    await createInstruction(candyMachineID,uriData[3], eventCapacity, metaplex, wallet, connection); 
    
    return [collectionAddress.toBase58(), candyMachineID.toBase58()];
    //return ["5PAAUq7tiwsLEQwbG3YLvzzmemWeWGkcwHZAd2Zb7djA", "BdYtP59ZqLK8YGDM2d6fJwHZtWyYcjP2w78UxaUiLWhX", transactionSignature];
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

    const connection = new Connection(endpoint, {commitment: "finalized"});
    
    const metaplex = new Metaplex(connection)
        .use(walletAdapterIdentity(wallet)) // Will prompt the user 
        //.use(keypairIdentity(accountFromSecret))
        .use(bundlrStorage({
            address: process.env.NEXT_PUBLIC_BUNDLR_ADDRESS || 'https://devnet.bundlr.network',
            providerUrl: process.env.NEXT_PUBLIC_QUICKNODE_RPC_HOST || 'https://api.devnet.solana.com',
            timeout:60000,
        }));
    try{
        const data = await createNFT(eventName, eventDescription, startDate, endDate, eventCapacity, ticketPrice, ticketImage, metaplex, wallet, connection);
        console.log("Createcandymachine ending");
        return data;
    } catch(e : unknown){
        if(typeof e === "string") {
            console.log(e.toUpperCase());
        } else if (e instanceof Error) {
            console.log(e.message);
        }
    }
    return []
}