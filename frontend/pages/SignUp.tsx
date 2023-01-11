import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Show,
  VStack,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import '@fontsource/monoton';
import { useRouter } from 'next/router';
import { getUser, signUp } from '../utils/controller/user';

const SignUp: React.FC = () => {
  const { publicKey } = useWallet();
  const [data, setData] = useState({
    'First Name': '',
    'Last Name': '',
    'Email Address': '',
    'Wallet Address': publicKey?.toString(),
  });
  const router = useRouter();

  const handleData = (type: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [type]: value,
    }));
  };
  console.log(publicKey);

  return (
    <Flex w="100%" h="100%" gap="10px">
      <VStack w="100%" padding="100px 10%">
        <VStack w="100%" align="flex-start">
          <Image
            alt="Ticket Auth"
            src="./full-logo.png"
            onClick={() => router.push('/')}
            cursor="pointer"
          />
          <Heading fontSize={['4xl']} fontFamily="Monoton">
            Sign Up
          </Heading>
        </VStack>
        <FormControl isInvalid={data['First Name'] == ''}>
          <FormLabel>First Name</FormLabel>
          <Input
            placeholder="First Name"
            type="text"
            value={data['First Name']}
            onChange={(e) => handleData('First Name', e.currentTarget.value)}
          />
          {data['First Name'] == '' && <FormErrorMessage>First name is required.</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={data['Last Name'] == ''}>
          <FormLabel>Last Name</FormLabel>
          <Input
            placeholder="Last Name"
            type="text"
            value={data['Last Name']}
            onChange={(e) => handleData('Last Name', e.currentTarget.value)}
          />
          {data['Last Name'] == '' && <FormErrorMessage>Last name is required.</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={data['Email Address'] == ''}>
          <FormLabel>Email Address</FormLabel>
          <Input
            placeholder="Email Address"
            type="text"
            value={data['Email Address']}
            onChange={(e) => handleData('Email Address', e.currentTarget.value)}
          />
          {data['Email Address'] == '' && (
            <FormErrorMessage>Email Address is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!publicKey}>
          <FormLabel>Connected Wallet:</FormLabel>
          {publicKey ? (
            <WalletMultiButton
              style={{ height: '40px', borderRadius: '7px', backgroundColor: '#7B2CBF' }}
            />
          ) : (
            <FormErrorMessage>Payment method is required.</FormErrorMessage>
          )}
        </FormControl>
        <Button
          w="100%"
          bg="brand.3"
          color="white"
          onClick={() =>
            signUp(data).then(() => {
              router.push('/');
            })
          }
        >
          Sign Up
        </Button>
      </VStack>
      <Show above="sm">
        <VStack w="100%" h="100vh" bg="red">
          <Image h="100%" w="100%" alt="ticketauth" src="/party.jpg" objectFit="cover" />
        </VStack>
      </Show>
    </Flex>
  );
};

export default SignUp;
