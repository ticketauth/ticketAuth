import { FC, useEffect, useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
type Props = {
    onUseWalletClick: () => void;
};

const SelectAndConnectWalletButton: FC<Props> = ({
    onUseWalletClick,
}) => {
    const { setVisible } = useWalletModal();
    const { wallet, connect, connecting, publicKey } = useWallet();


    useEffect(() => {
    if (!publicKey && wallet) {
      try {
        connect();
      } catch (error) {
        console.log("Error connecting to the wallet: ", (error as any).message);
      }
    }
  }, [wallet]);

  const handleWalletClick = () => {
    try {
      if (!wallet) {
        setVisible(true);
      } else {
        connect();
      }
      onUseWalletClick();
    } catch (error) {
      console.log("Error connecting to the wallet: ", (error as any).message);
    }
  };

  return (
    <button
      className="btn btn-primary btn-lg"
      onClick={handleWalletClick}
      disabled={connecting}
    >
      {publicKey ? <div>Use Wallet Address</div> : <div>Connect Wallet</div>}
    </button>
  );

};

export default SelectAndConnectWalletButton;