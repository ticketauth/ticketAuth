import { Card, CardBody, Heading, Wrap, Image, Text, HStack, SimpleGrid, GridItem, VStack, useFormControlStyles, Center, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { EventData } from "../utils/dataInterfaces";
import getEvents from "../utils/getEvents";
import DateCard from "./DateCard";


const CardsList = ()=>{
	const [events, setEvents] = useState<Array<EventData>>()
  const router = useRouter()
	useEffect(()=>{
		getEvents().then(data=>setEvents(data));
	},[])
  

  return (
    events==undefined?
    <>Skeleton</>:
    <Wrap w='100%' h='100%' padding="20px">
    {
      events.map((event,key)=>{
        return (
        <Card 
					maxW='md'
					className='shadow'
          onClick={()=>router.push(`/event/${event.EventId}`)}
          key={key}
				>
          <CardBody>
						<Image
							src={event["Background Image"]}
							alt='Image'
							borderRadius='lg'
						/>
            <SimpleGrid columns={5} padding='20px 0px' spacing='10px'>
              <GridItem colSpan={2} padding='0px 20px'>
                <Center h='100%' w='100%'>
                  <DateCard/>
                </Center>
              </GridItem>

              <GridItem colSpan={3}>
                <Heading fontSize='2xl'>{event["Name of event"]}</Heading>
                <Text>by {event.Organizer}</Text>
                <Text size='sm'>@ {event.Location}</Text>
              </GridItem>
            </SimpleGrid>
          </CardBody>
        </Card>
        )
        })
    }
    </Wrap>
  )
}
export default CardsList;