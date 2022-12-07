import { Button, Flex, HStack, Spacer } from "@chakra-ui/react"
import { WalletMulti } from "./WalletMulti"

const Header = () => {  

    return (
      <Flex
        position='fixed'
        top='0' 
        w='100%' 
        h='80px' 
        className="blur"
        boxShadow='1px 5px 10px rgba(30,30,30,0.5)'
        zIndex={4}
        padding='20px'
      >
        ICON PLACEHOLDER
        <Spacer/>
        <HStack spacing='10px'>
          <Button>Create Events</Button>
          <Button>Sign Up</Button>
          <WalletMulti />
        </HStack>
      </Flex>
    )
}
export default Header