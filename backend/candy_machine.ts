import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile, toBigNumber, CreateCandyMachineInput, DefaultCandyGuardSettings, CandyMachineItem, toDateTime, sol, TransactionBuilder, CreateCandyMachineBuilderContext } from "@metaplex-foundation/js";
import * as fs from 'fs';


let secret = Uint8Array.from([239,17,104,32,32,253,36,39,254,61,122,102,97,97,71,54,189,170,89,146,198,196,47,112,190,155,250,254,12,78,87,59,173,82,146,30,195,223,198,73,35,54,15,60,161,109,232,20,182,171,1,132,50,73,109,2,48,166,36,68,66,184,120,78]);
let accountFromSecret = Keypair.fromSecretKey(secret);


const QUICKNODE_RPC = 'https://still-purple-arm.solana-devnet.discover.quiknode.pro/338672622c9c1591ece914109e07669ad4acc89a/';
const SESSION_HASH = 'QNDEMO'+Math.ceil(Math.random() * 1e9); // Random unique identifier for your session
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC, { commitment: 'finalized' , httpHeaders: {"x-session-hash": SESSION_HASH}});


const metaplex = new Metaplex(SOLANA_CONNECTION)
    .use(keypairIdentity(accountFromSecret))
    .use(bundlrStorage({
        address:'https://devnet.bundlr.network',
        providerUrl: QUICKNODE_RPC,
        timeout:60000,
    }));

const CONFIG = {
    uploadPath: 'uploads/',
    imgFileName: 'Card 1.png',
    imgType: 'image/png',
    imgName: 'Meta Camp',
    description: 'Ticket for Meta Camp after party!',
    sellerFeeBasisPoints: 5000,//500 bp = 5%
    symbol: 'metaCamp',
    creators: [
        {address: accountFromSecret.publicKey, share: 100}
    ]
};  

const totalTickets = 10; 

async function uploadImage(filePath: string, fileName: string): Promise<string> {
    const imgBuffer = fs.readFileSync(filePath+fileName);
    const imgMetaplexFile = toMetaplexFile(imgBuffer,fileName);
    const imgUri = await metaplex.storage().upload(imgMetaplexFile);
    console.log(`Image URI:`,imgUri);
    return imgUri;
}

async function uploadMetadata(imgUri: string, imgType: string, nftName: string, description: string) {
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

async function createCollectionNft(metadataUri: string, name: string) {
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
    console.log(`     https://explorer.solana.com/address/${collectionNft.address.toBase58()}?cluster=devnet`);

    return collectionNft.address;
}

async function generateCandyMachine(totalTickets: number, collectionAddress : PublicKey, collectionSymbol: string) {
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
                amount: sol(0.01),
                destination: metaplex.identity().publicKey,
                },
                redeemedAmount: {
                maximum: toBigNumber(totalTickets),
                },
                gatekeeper: {
                    network: new PublicKey("ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6"),
                    expireOnUse: true
                }
                
            },
            
        };
    
    const { candyMachine } = await metaplex.candyMachines().create(candyMachineSettings);
    console.log(`✅ - Created Candy Machine: ${candyMachine.address.toBase58()}`);
    console.log(`     https://explorer.solana.com/address/${candyMachine.address.toBase58()}?cluster=devnet`);
        
    return candyMachine;
}

async function addItems(candyMachineID: PublicKey, uri : string, totalTickets : number) {
  const candyMachine = await metaplex
    .candyMachines()
    .findByAddress({ address: candyMachineID });

  const items: any[] = [];
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
    `     https://explorer.solana.com/tx/${response.signature}?cluster=devnet`
  );
}

async function mintNft(candyMachineID: PublicKey) {

    const candyMachine = await metaplex.candyMachines().findByAddress({
        address: candyMachineID
    })
    const resp = await metaplex.candyMachines().mint({
        candyMachine,
        collectionUpdateAuthority: metaplex.identity().publicKey,
        owner: metaplex.identity().publicKey,
    },
    {
        payer: metaplex.identity()
    }
    )
    
    console.log(` ✅ - Minted NFT from Candy Machine with signature ${resp.response.signature} `);
    console.log(` Minted NFT name is ${resp.nft.name} from Collection ${resp.nft.collection}`)
}

async function createNFT () {
    //Step 1 - Upload Image
    const imgUri = await uploadImage(CONFIG.uploadPath, CONFIG.imgFileName);
    //Step 2 - Upload Metadata
    const metadataUri = await uploadMetadata(imgUri, CONFIG.imgType, CONFIG.imgName, CONFIG.description); 
    //Step 3 - Minting CollectionNFT
    const collectionAddress = await createCollectionNft(metadataUri, CONFIG.imgName);
    //Step 4 - Create Candy Machine
    const candyMachine = await generateCandyMachine(totalTickets, collectionAddress, CONFIG.symbol)
    const candyMachineID = candyMachine.address;
    //Step 5 - Adding items to Candy Machine
    const uriData = metadataUri.split("/");
    await addItems(candyMachineID, uriData[3], totalTickets); 
    //Step 6 - Minting NFT from Candy Machine
    await mintNft(candyMachineID);
    //Step 7- Transfer authority to the event creator 
}


createNFT();