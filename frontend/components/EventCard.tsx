import {
  Card,
  CardBody,
  Heading,
  Wrap,
  Image,
  Text,
  HStack,
  SimpleGrid,
  GridItem,
  VStack,
  useFormControlStyles,
  Center,
  Spacer,
  Box,
  Divider,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DateCard from './DateCard';

const EventCard = ({ key, EventId, Location, Organizer, EventName, Bgimg }) => {
  const router = useRouter();

  return (
    <GridItem colSpan={[3, 1]}>
      <Card
        height="450px"
        className="shadow"
        onClick={() => router.push(`/event/${EventId}`)}
        key={key}
      >
        <Center h="300px" w="100%">
          <Image src={Bgimg} alt="Image" h="100%" w="100%" objectFit="contain" borderRadius="lg" />
        </Center>
        <Divider orientation="horizontal" />
        <SimpleGrid columns={5} padding="20px" spacing="10px">
          <GridItem colSpan={2} padding="0px 20px">
            <Center h="100%" w="100%">
              <DateCard />
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
