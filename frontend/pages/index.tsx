import { Grid, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import Searchbar from '../components/Searchbar';
import EventCard from '../components/EventCard';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import {
  getUserEventsList,
  getEventById,
  getAllEvents,
  createNewEvent,
  getEventByWalletAddress,
} from '../utils/controller/event';
import { EventData } from '../utils/dataInterfaces';
import { Backdrop } from '../components/Backdrop';
import '@fontsource/monoton';
import { getUser } from '../utils/controller/user';

const Explore = () => {
  const [events, setEvents] = useState<Array<EventData>>();
  useEffect(() => {
    getAllEvents().then((data) => setEvents(data));
  }, []);

  return (
    <Grid w="100%">
      <Header />
      <VStack spacing={-8} w="100%">
        <Backdrop>
          <Text fontSize={['5xl', '6xl']} fontFamily="Monoton" color="white">
            {' '}
            TicketAuth
          </Text>
          <Text fontSize={['20px', '25px']} color="white">
            Buy or sell NFT tickets to anything!
          </Text>
        </Backdrop>
        <Searchbar />
        <VStack w="100%" padding={['15% 10%', '5% 10%']} align="flex-start">
          <Heading>Featured Events</Heading>
          {events == undefined ? (
            <>Skeleton</>
          ) : (
            <SimpleGrid w="100%" h="100%" padding="20px" columns={3} spacing="20px">
              {events?.map((event, key) => (
                <EventCard
                  key={key}
                  EventId={event.EventId}
                  Location={event.Location}
                  Organizer={event.Organizer}
                  EventName={event['Name of event']}
                  Bgimg={event['Background Image']}
                  datestr={event['Start Event Datetime']}
                />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </VStack>
    </Grid>
  );
};
export default Explore;
