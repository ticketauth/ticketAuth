import {
  Button,
  Flex,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spacer,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { SolanaWalletMulti } from './SolanaWalletMulti';
import ToggleModeButton from './ToggleModeButton';
import { TorusWallet } from './TorusWallet';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { getUser } from '../utils/controller/user';
import { useState } from 'react';

const WalletModal = (props: { isPaymentOpen: boolean; onPaymentClose: () => void }) => {
  const { isPaymentOpen, onPaymentClose } = props;
  return (
    <Modal isOpen={isPaymentOpen} onClose={onPaymentClose} isCentered>
      <ModalOverlay h="100%" bg="whiteAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent>
        <VStack spacing="10px" w="100%">
          <TorusWallet />
          <SolanaWalletMulti onPaymentClose={onPaymentClose} />
          {/* fiat currency payment*/}
        </VStack>
      </ModalContent>
    </Modal>
  );
};

const Header = () => {
  const { isOpen: isPaymentOpen, onOpen: onPaymentOpen, onClose: onPaymentClose } = useDisclosure();
  const [ loading, setLoading ] = useState(false);
  const router = useRouter();
  const { publicKey } = useWallet();
  return (
    <Flex
      position="fixed"
      top="0"
      w="100%"
      h="80px"
      className="blur"
      zIndex={4}
      padding={['20px', '20px 50px']}
    >
      <Image alt="logo" cursor="pointer" onClick={() => router.push('/')} src="/logo.png" />
      <Spacer />
      <HStack spacing="20px">
        <Button
          onClick={() => {
            setLoading(true);
            if (!publicKey) {
              setLoading(false);
              return onPaymentOpen();
            }
            getUser(publicKey.toString()).then((res) => {
              if (res.email === '') router.push('/SignUp');
              else router.push('/create');
              setLoading(false);
            });
          }}
          isLoading={loading}
        >
          Create Event
        </Button>
        {publicKey && (
          <WalletMultiButton
            style={{ height: '40px', borderRadius: '7px', backgroundColor: '#7B2CBF' }}
          />
        )}
        <ToggleModeButton />
      </HStack>
      <WalletModal isPaymentOpen={isPaymentOpen} onPaymentClose={onPaymentClose} />
    </Flex>
  );
};
export default Header;
