import { Button, Flex, HStack, Image, Modal, ModalBody, ModalContent, ModalOverlay, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react"
import ToggleModeButton from "./ToggleModeButton";

const WalletModal = (props: {isOpen: boolean, onClose: ()=>void}) => {
  const {isOpen,onClose} = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay 
        bg='whiteAlpha.300'
        backdropFilter='blur(10px)'
      />
      <ModalContent>
        <ModalBody>
          <VStack>
            <Button bg='white' w='100%' h='150px'>fasgf</Button>
            <Button bg='white' w='100%' h='150px'>
              <VStack>
              <Text>Connect Crypto Wallets</Text>
              <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT57neehMfp0s4VqsX8iGb1oB8fBzj3HjrbwUoz9wiUwA&s"/>
              </VStack>
            </Button>
          </VStack>        
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const Header = () => {  
  const { isOpen, onOpen, onClose } = useDisclosure()
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
      ICON PLACEHOLDER
      <Spacer/>
      <HStack spacing='10px'>
        <Button>Create Events</Button>
        <Button onClick={onOpen} >Sign Up</Button>
        <WalletModal isOpen={isOpen} onClose={onClose}/>
        <ToggleModeButton/>
      </HStack>
    </Flex>
  )
}
export default Header