import { Button, Flex, HStack, Image, Modal, ModalBody, ModalContent, ModalOverlay, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { SolanaWalletMulti } from "./SolanaWalletMulti";
import ToggleModeButton from "./ToggleModeButton";

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
            <Button bg='white' w='100%' h='150px'>Torus Wallet</Button>
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

  return (
    <Flex
      position='fixed'
      top='0' 
      w='100%' 
      h='80px' 
      className="blur"
      boxShadow='1px 1px 3px rgba(30,30,30,0.2)'
      zIndex={4}
      padding='20px'
    >
      <Text onClick={e=>router.push("/")}>LOGO PLACEHOLDER</Text>
      <Spacer/>
      <HStack spacing='10px'>
        <Button onClick={()=>router.push("/create")}>Create Events</Button>
        <Button onClick={onPaymentOpen} >Sign Up</Button>
        <WalletModal isPaymentOpen={isPaymentOpen} onPaymentClose={onPaymentClose}/>
        <ToggleModeButton/>
      </HStack>
    </Flex>
  )
}
export default Header