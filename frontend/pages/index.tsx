import { Grid, Heading, Text, VStack, Wrap } from '@chakra-ui/react'
import Searchbar from "../components/Searchbar";
import Header from '../components/Header';
import CardsList from '../components/CardsList';

require('typeface-monoton')

const Explore = () => {
  return (
    <>
      <Header/>
      <VStack spacing={-8}>
        <Grid h='350px' w='100%' justifyContent='center' alignItems='center' bgGradient="linear(to-t, green.200, teal.500)">
          <VStack>
            <Text fontSize={'60px'} fontFamily={'monoton'} color='white'> TicketAuth</Text>
            <Text fontSize={'25px'} color='white'>Buy or sell NFT tickets to anything!</Text>
          </VStack>
        </Grid>

        <Searchbar/>

        <VStack w='100%' padding='5% 10%' align='flex-start'>
          <Heading>Featured Events</Heading>
          <CardsList/>
        </VStack>
      </VStack>
    </>
  )
}

export default Explore