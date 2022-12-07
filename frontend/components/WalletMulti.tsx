import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC } from "react";

require('@solana/wallet-adapter-react-ui/styles.css');
export const WalletMulti: FC = props => {

    return (
        <WalletMultiButton />
    )
}