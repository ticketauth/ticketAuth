import {
  Card,
  Heading,
  Image,
  Text,
  SimpleGrid,
  GridItem,
  Center,
  Divider,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import DateCard from './DateCard';

const EventCard = ({ EventId, Location, Organizer, EventName, Bgimg, datestr }) => {
  const router = useRouter();

  return (
    <GridItem colSpan={[3, 1]}>
      <Card maxW="md" h="md" className="shadow" onClick={() => router.push(`/event/${EventId}`)}>
        <Center h="300px" w="100%">
          <Image src={Bgimg} alt="Image" h="100%" w="100%" objectFit="contain" borderRadius="lg" />
        </Center>
        <Divider orientation="horizontal" />
        <SimpleGrid columns={5} padding="20px" spacing="10px">
          <GridItem colSpan={2} padding="0px 20px">
            <Center h="100%" w="100%">
              <DateCard datestr={datestr} />
            </Center>
          </GridItem>

          <GridItem colSpan={3}>
            <Heading fontSize="2xl">{EventName}</Heading>
            <Text>by {Organizer}</Text>
            <Text size="sm" color="brand.1">
              @ {Location}
            </Text>
          </GridItem>
        </SimpleGrid>
      </Card>
    </GridItem>
  );
};
export default EventCard;
