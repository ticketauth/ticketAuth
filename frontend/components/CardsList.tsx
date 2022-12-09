import { Card, CardBody, Heading, Wrap, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { EventData } from "../utils/dataInterfaces";
import getEvents from "../utils/getEvents";


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
      events.map(event=>
        <Card 
					maxW='sm'
					boxShadow='1px 5px 10px rgba(30,30,30,0.5)'
          onClick={()=>router.push(`/event/${event.EventId}`)}
				>
          <CardBody>
						<Image
							src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
							alt='Green double couch with wooden legs'
							borderRadius='lg'
						/>
            <Heading>{event["Name of event"]}</Heading>
						Closing soon??
          </CardBody>
        </Card>
      )
    }
    </Wrap>
  )
}
export default CardsList;