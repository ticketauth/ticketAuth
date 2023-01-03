import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import { WalletContextProvider } from '../contexts/ClientWalletProvider';
import { rpcHost, network } from '../config';
import { useMemo } from 'react';
import { ConnectionProvider } from '@solana/wallet-adapter-react';

export default function App({ Component, pageProps }: AppProps) {
  const endpoint = useMemo(() => rpcHost, []);

  return (
    <ChakraProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletContextProvider>
          <Component {...pageProps} />
        </WalletContextProvider>
      </ConnectionProvider>
    </ChakraProvider>
  );
}
