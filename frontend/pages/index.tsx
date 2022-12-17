import { Grid, Heading, Text, VStack, Wrap } from '@chakra-ui/react'
import Searchbar from "../components/Searchbar";
import EventCard from '../components/EventCard';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { getUserEventsList, createUser, getEventById, getAllEvents, createNewEvent, getEventByWalletAddress } from "../utils/eventController"
import { EventData } from '../utils/dataInterfaces';



require('typeface-monoton')

const Explore = () => {
  const [events, setEvents] = useState<Array<EventData>>()
	useEffect(()=>{
		getAllEvents().then(data=>setEvents(data));
	},[])

  return (
    <>
      <Header />
      <VStack spacing={-8}>
        <Grid h='350px' w='100%' justifyContent='center' alignItems='center' bgGradient="linear(to-t, green.200, teal.500)">
          <VStack>
            <Text fontSize={'60px'} fontFamily={'monoton'} color='white'> TicketAuth</Text>
            <Text fontSize={'25px'} color='white'>Buy or sell NFT tickets to anything!</Text>
          </VStack>
        </Grid>

        <Searchbar />

        <VStack w='100%' padding='5% 10%' align='flex-start'>
          <Heading>Featured Events</Heading>
          events==undefined?
          <>Skeleton</>:
          <Wrap w='100%' h='100%' padding="20px">
          {
            events?.map((event,key)=>
            <EventCard 
              key={key}
              EventId={event.EventId}
              Location={event.Location}
              Organizer={event.Organizer}
              EventName={event['Name of event']}
            />)
          }
          </Wrap>
        </VStack>
      </VStack>
    </>
  )
}

export default Explore