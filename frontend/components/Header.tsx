import { Button, Flex, HStack, Image, Modal, ModalBody, ModalContent, ModalOverlay, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { SolanaWalletMulti } from "./SolanaWalletMulti";
import ToggleModeButton from "./ToggleModeButton";
import { TorusWallet } from "./TorusWallet";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"; 

const WalletModal = (props: {isPaymentOpen: boolean, onPaymentClose: ()=>void}) => {
  const {isPaymentOpen,onPaymentClose} = props;
  return (
    <Modal isOpen={isPaymentOpen} onClose={onPaymentClose} isCentered>
      <ModalOverlay 
        bg='whiteAlpha.300'
        backdropFilter='blur(10px)'
      />
      <ModalContent>
        <ModalBody>
          <VStack>
            <TorusWallet />
            <SolanaWalletMulti onPaymentClose={onPaymentClose}/>
            {/* fiat currency payment*/}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const Header = () => {  
  const { isOpen:isPaymentOpen, onOpen:onPaymentOpen, onClose:onPaymentClose } = useDisclosure()
  const router = useRouter();
  const { publicKey } = useWallet();
  return (
    <Flex
      position='fixed'
      top='0' 
      w='100%' 
      h='80px' 
      className="blur"
      zIndex={4}
      padding='20px 50px'
    >
      <Image cursor='pointer' onClick={()=>router.push('/')} src='/logo.png'/>
      <Spacer/>
      <HStack spacing='20px'>
        <Button onClick={()=>router.push("/create")}>Create Events</Button>
        {publicKey ? (
          <WalletMultiButton style={{height:'40px',borderRadius:'7px', backgroundColor:'#7B2CBF'}}/>
        ) : (
            <Button onClick={onPaymentOpen} >Sign Up</Button>
        )
        }
        <WalletModal isPaymentOpen={isPaymentOpen} onPaymentClose={onPaymentClose}/>
        <ToggleModeButton/>
      </HStack>
    </Flex>
  )
}
export default Header