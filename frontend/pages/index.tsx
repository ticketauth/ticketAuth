import { Grid, Heading, Text, VStack, Wrap } from '@chakra-ui/react';
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
<<<<<<< Updated upstream
} from "../utils/controller/event";
import { EventData } from "../utils/dataInterfaces";
import { Backdrop } from "../components/Backdrop";

require("typeface-monoton");

=======
  getTemporaryEventId,
} from '../utils/controller/event';
import { EventData } from '../utils/dataInterfaces';
import { Backdrop } from '../components/Backdrop';
import '@fontsource/monoton';
import { getUser } from '../utils/controller/user';
import { ticketConfirmation } from "../utils/controller/email"
>>>>>>> Stashed changes

const Explore = () => {
  const [events, setEvents] = useState<Array<EventData>>();
  useEffect(() => {
    getAllEvents().then((data) => setEvents(data));
<<<<<<< Updated upstream
=======

    (async function () {

      let result = await ticketConfirmation("packirisamykaran@gmail.com");
      // console.log(result)

    })()

>>>>>>> Stashed changes
  }, []);

  return (
    <Grid w="100%">
      <Header />
      <VStack spacing={-8} w='100%'>
        <Backdrop>
          <Text fontSize={["5xl", "6xl"]} fontFamily={"monoton"} color="white">
            {" "}
            TicketAuth
          </Text>
          <Text fontSize={["20px", "25px"]} color="white">

            Buy or sell NFT tickets to anything!
          </Text>
        </Backdrop>

        <Searchbar />

<<<<<<< Updated upstream
]
=======

>>>>>>> Stashed changes
        <VStack w="100%" padding={["15% 10%", "5% 10%"]} align="flex-start">

          <Heading>Featured Events</Heading>
          {events == undefined ? (
            <>Skeleton</>
          ) : (
            <Wrap w="100%" h="100%" padding="20px">
              {events?.map((event, key) => (
                <EventCard
                  key={key}
                  EventId={event.EventId}
                  Location={event.Location}
                  Organizer={event.Organizer}

                  EventName={event["Name of event"]}
                  Bgimg={event["Background Image"]}

                />
              ))}
            </Wrap>
          )}
        </VStack>
      </VStack>
    </Grid>
  );
};
export default Explore;
