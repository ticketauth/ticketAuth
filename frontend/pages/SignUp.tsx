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
import { updateUser } from '../utils/controller/user';

const SignUp: React.FC = () => {
  const { publicKey } = useWallet();
  const [ loading, setLoading ] = useState(false);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    walletAddress: publicKey?.toString(),
  });
  const router = useRouter();

  const handleData = (type: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

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
        <FormControl isInvalid={data['firstName'] == ''}>
          <FormLabel>First Name</FormLabel>
          <Input
            placeholder="First Name"
            type="text"
            value={data['firstName']}
            onChange={(e) => handleData('firstName', e.currentTarget.value)}
          />
          {data.firstName == '' && <FormErrorMessage>First name is required.</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={data['lastName'] == ''}>
          <FormLabel>Last Name</FormLabel>
          <Input
            placeholder="Last Name"
            type="text"
            value={data['lastName']}
            onChange={(e) => handleData('lastName', e.currentTarget.value)}
          />
          {data['lastName'] == '' && <FormErrorMessage>Last name is required.</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={data['email'] == ''}>
          <FormLabel>Email Address</FormLabel>
          <Input
            placeholder="Email Address"
            type="text"
            value={data['email']}
            onChange={(e) => handleData('email', e.currentTarget.value)}
          />
          {data['email'] == '' && <FormErrorMessage>email is required.</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={!publicKey}>
          <FormLabel color="green">Wallet Connected:</FormLabel>
          {publicKey ? (
            <Button>{publicKey.toString()}</Button>
          ) : (
            <FormErrorMessage>Payment method is required.</FormErrorMessage>
          )}
        </FormControl>
        <Button
          w="100%"
          bg="brand.3"
          color="white"
          onClick={() =>{
            setLoading(true);
            updateUser(data).then((res) => {
              console.log('response:', res);
              router.push('/');
              setLoading(false);
            })
          }}
          isLoading={loading}
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
