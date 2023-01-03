import { useWalletModal, WalletIcon } from '@solana/wallet-adapter-react-ui';
import { FC } from 'react';
import { Button, Heading, Image } from '@chakra-ui/react';

require('@solana/wallet-adapter-react-ui/styles.css');
export const SolanaWalletMulti: FC<{ onPaymentClose: () => void }> = ({ onPaymentClose }) => {
  const { setVisible } = useWalletModal();

  return (
    <Button
      bg="white"
      w="100%"
      h="150px"
      onClick={() => {
        setVisible(true);
        onPaymentClose();
      }}
    >
      <Heading>Connect wallet</Heading>
      {/* <WalletIcon/> */}
    </Button>
  );
};
