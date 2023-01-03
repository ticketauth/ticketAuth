import { useWalletModal, WalletIcon } from '@solana/wallet-adapter-react-ui';
import { FC } from 'react';
import { Box, Button, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';

require('@solana/wallet-adapter-react-ui/styles.css');
export const SolanaWalletMulti: FC<{ onPaymentClose: () => void }> = ({ onPaymentClose }) => {
  const { setVisible } = useWalletModal();
  const { wallets } = useWallet();

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
      <VStack spacing="15px">
        <Text fontSize="2xl">Connect Wallet</Text>
        <HStack h="20px" w="150px">
          {wallets.map((wallet, key) => {
            return (
              <Box key={key} h="100%" w="100%">
                <WalletIcon wallet={wallet} />
              </Box>
            );
          })}
        </HStack>
      </VStack>
    </Button>
  );
};
