import {
  Modal,
  ModalOverlay,
  Image,
  ModalContent,
  ModalBody,
  Flex,
  Text,
  Circle,
  Fade,
  SlideFade,
  Divider,
} from '@chakra-ui/react';
import React from 'react';

interface WalletSignUpModalprops {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  handleEmail: () => void;
  onWalletOpen: () => void;
}

export default function WalletSignUpModal({
    isOpen,
    onClose,
    onOpen,
    handleEmail,
    onWalletOpen,
}: WalletSignUpModalprops) {
    const items = [
        {
            title: 'Sign In with Email',
            description: 'Sign in with Email or Google',
            connector: async () => {
                await handleEmail();
            },
        },
        {
            title: 'Connect Wallet',
            description: 'Connect your web3 wallet',
            connector: () => {
                onClose();
                onWalletOpen();
            }
        }
    ];

    return (
        <SlideFade in={isOpen}>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                rounded='xl'
                mx={{ base: '1rem', md: 'auto' }}
                mt={{ base: '60%', md: '10%' }}
                >
                <ModalBody m={2} p={4}>
                    {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <Flex
                        w='full'
                        flexDirection='column'
                        alignItems='center'
                        borderRadius='md'
                        as='button'
                        rounded='xl'
                        _hover={{ bg: 'gray.100' }}
                        onClick={item.connector}
                        minH='11rem'
                        >
                        <Flex
                            justify='space-between'
                            alignItems='center'
                            px='4'
                            // py="4"
                            mt='4'
                        >
                            <Text fontSize='lg' fontWeight='medium'>
                            {item.title}
                            </Text>
                        </Flex>
                        <Flex
                            justify='space-between'
                            alignItems='center'
                            px='4'
                            // py="4"
                        >
                            <Text fontSize='md' fontWeight='normal' color='gray.400'>
                            {item.description}
                            </Text>
                        </Flex>
                        </Flex>
                        {index !== items.length - 1 && <Divider />}
                    </React.Fragment>
                    ))}
                </ModalBody>
                </ModalContent>
            </Modal>
        </SlideFade>
    )

}