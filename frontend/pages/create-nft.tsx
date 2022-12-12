import React, { useState } from 'react';
import { Metaplex, toMetaplexFileFromBrowser, walletAdapterIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useWallet } from '@solana/wallet-adapter-react';

const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = new Metaplex(connection);


const CreateNFT = () => {
    const [inputFile, setInputFile] = useState<File | undefined>();

    const handleChange = (files: FileList | null) => {
        setInputFile(files? files[0] : undefined);
    }

        return (
            <div>
                <input type="file" onChange={(e) => handleChange(e.target.files)} />
            </div>
            
        )
    
}

export default CreateNFT;