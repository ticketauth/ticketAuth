import { useWalletModal, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC } from "react";
import { Button } from '@chakra-ui/react';

require('@solana/wallet-adapter-react-ui/styles.css');
export const WalletMulti: FC = props => {
    const { setVisible } = useWalletModal();

    return (
        <Button bg='white' w='100%' h='150px' onClick={()=>setVisible(true)}>Connect wallet</Button>
    )
}