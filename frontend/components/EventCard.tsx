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
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DateCard from './DateCard';

const EventCard = ({ key, EventId, Location, Organizer, EventName, Bgimg }) => {
  const router = useRouter();

  return (
    <Card maxW="md" className="shadow" onClick={() => router.push(`/event/${EventId}`)} key={key}>
      <CardBody>
        <Center h="300px">
          <Image src={Bgimg} alt="Image" objectFit="contain" borderRadius="lg" />
        </Center>
        <SimpleGrid columns={5} padding="20px 0px" spacing="10px">
          <GridItem colSpan={2} padding="0px 20px">
            <Center h="100%" w="100%">
              <DateCard />
            </Center>
          </GridItem>

          <GridItem colSpan={3}>
            <Heading fontSize="2xl">{EventName}</Heading>
            <Text>by {Organizer}</Text>
            <Text size="sm">@ {Location}</Text>
          </GridItem>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};
export default EventCard;
