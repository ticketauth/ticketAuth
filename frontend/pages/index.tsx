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
  useEffect(() => {
    // createNewEvent({
    //   "Name of event": "Metacamp AfterParty",
    //   "Event Description": "Welcome to the afterparty @Metacamp hosted by TicketAuth to celebrate our first release!",
    //   "walletAddress": "222",
    //   "Start Datetime": "2022-12-16T21:00",
    //   "End Datetime": "2022-12-16T23:59",
    //   "Location": "Pagoda Street, Metacamp, Singapore",
    //   "Organizers Email": "ticketauthxyz@gmail.com",
    //   "Organizer": "TicketAuth",
    //   "Event Capacity": 888,
    //   "Ticket price": 0,
    //   "Ticket Image": "https://uploads-ssl.webflow.com/628b99344f25667e77da83cf/62c3a95fc598e35cf796a1f2_Asset%209%403x.png",
    //   "Background Image": "https://cdn.techinasia.com/cloudinary/transformations/wp-content/uploads/2022/11/1668586039_e9b93a7d4095b7a38fc85af8a4f749aa_v1668586039_xlarge.webp",

    //   "candyMachineId": "AS4oGz1D1CXuhM2KjXbN3jfUA4KoCDseeb322Y2L2ds6",
    //   "collectionId": "BSsSkuHGnB2e4PXpeaWUBQWsv2rYNo9211Jo8ntrSUMF"
    // }).then((data) => {
    //   console.log(data)
    // })
    getAllEvents().then(data => setEvents(data));
  }, [])

  return (
    <>
      <Header />
      <VStack spacing={-8}>
        <Grid h='350px' w='100%' justifyContent='center' alignItems='center' className='backdrop'>
          <VStack>
            <Text fontSize={'60px'} fontFamily={'monoton'} color='white'> TicketAuth</Text>
            <Text fontSize={'25px'} color='white'>Buy or sell NFT tickets to anything!</Text>
          </VStack>
        </Grid>

        <Searchbar />

        <VStack w='100%' padding='5% 10%' align='flex-start'>
          <Heading>Featured Events</Heading>
          {
            events == undefined ?
              <>Skeleton</> :
              <Wrap w='100%' h='100%' padding="20px">
                {
                  events?.map((event, key) =>
                    <EventCard
                      key={key}
                      EventId={event.EventId}
                      Location={event.Location}
                      Organizer={event.Organizer}
                      EventName={event['Name of event']}
                      Bgimg={event['Background Image']}
                    />)
                }
              </Wrap>
          }
        </VStack>
      </VStack>
    </>
  )
}

export default Explore