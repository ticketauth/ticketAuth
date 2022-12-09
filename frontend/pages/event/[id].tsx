import { Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import getEventDets from '../../utils/getEventDets'
import type {EventData} from '../../utils/dataInterfaces'

const Event = () => {
  const router = useRouter()
  const { id } = router.query
  const [event, setEvent] = useState<EventData>()

  useEffect(()=>{
    console.log(id,typeof(id))
    getEventDets("fake").then(event=>setEvent(event))
  },[])
  return (
    event==undefined?
    <>Skeleton</>
    :
    <>
      <Header/>
      <HStack spacing='5px' padding='100px 20%'>
        <VStack w='80%' bg='red'>
          <Heading>Event: {event['Name of event']}</Heading>
        </VStack>
        <VStack w='20%' bg='blue'>
          <Text>Sidebar</Text>
        </VStack>
      </HStack>
    </>
  )
}

export default Event