import Torus from '@toruslabs/torus-embed';
import { Button, Image, Text, VStack } from '@chakra-ui/react';

export const TorusWallet = () => {
  const torus = new Torus();

  const onClick = () => {
    async () => {
      await torus.init({
        buildEnv: 'testing',
        enableLogging: true,
        showTorusButton: true,
      });

      await torus.login();
    };
  };

  return (
    <Button bg="white" w="100%" h="150px" onClick={onClick}>
      <VStack>
        <Text fontSize="2xl">Torus Wallet</Text>
        <Image alt="torus" boxSize="35px" objectFit="contain" src="/torus.png" />
      </VStack>
    </Button>
  );
};
