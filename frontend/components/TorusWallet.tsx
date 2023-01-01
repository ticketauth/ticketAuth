import { useEffect, useState } from 'react';
import Torus from '@toruslabs/torus-embed';
import { Button } from '@chakra-ui/react';

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
    <div>
      <Button bg="white" w="100%" h="150px" onClick={onClick}>
        Torus Wallet
      </Button>
    </div>
  );
};
