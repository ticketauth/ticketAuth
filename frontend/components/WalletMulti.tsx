import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC } from "react";
import dynamic from "next/dynamic";

export const WalletMulti: FC = props => {
    const ReactUIWalletModalButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletModalButton,
    { ssr: false }
);
    return (
        <ReactUIWalletModalButtonDynamic />
    )
}