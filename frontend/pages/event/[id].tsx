import { Button, Card, CardBody, Center, Divider, Flex, Heading, HStack, Image, Spacer, Stack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import getEventDets from '../../utils/getEventDets'
import type {EventData} from '../../utils/dataInterfaces'
import { HiOutlineTicket } from 'react-icons/hi'

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
      <VStack w='100%' padding='100px 15%' spacing='5px'>
      <HStack w='100%'>
        <VStack w='75%' align='flex-start'>
          <Heading size='lg'>Event: {event['Name of event']}</Heading>
          <Text>{event['Start Datetime']}</Text>
        </VStack>
        <Spacer/>
        <Button variant='outline' bg='red' color='white'>Register</Button>
      </HStack>

      <HStack w='100%' align='flex-start'>
        <VStack align='flex-start' w='75%' padding='10px'>
          <Card 
            direction='row'
            w='100%'
            boxShadow='1px 1px 10px rgba(30,30,30,0.2)'
          >
            <CardBody>
              <HStack h='300px'>
                <Center w='80%'>
                  <Image boxSize='300px' src={event['Ticket Image']}/>
                </Center>
                <Divider orientation='vertical'/>
                <VStack align='flex-end'>
                  <Image boxSize='100px' src={event['Ticket Image']}/>
                  <Image boxSize='100px' src={event['Ticket Image']}/>
                </VStack>
              </HStack>
            </CardBody>
          </Card>

          <Card 
            direction='row'
            w='100%'
            h='200px'
            boxShadow='1px 1px 10px rgba(30,30,30,0.2)'
          >
            <CardBody>
              <VStack spacing='5px' align='flex-start'>
                <Heading size='sm' textDecoration='underline'>Event Descripton</Heading>
                <Text>{event['Event Description']}</Text>
              </VStack>
            </CardBody>
          </Card>
        </VStack>

        
        <VStack w='25%' padding='10px'>
          <HStack w='100%'>
          <Card 
              w='100%'
              h='120px'
              boxShadow='1px 1px 10px rgba(30,30,30,0.2)'
            >
            <CardBody>
              <VStack spacing='5px'>
                <Text fontSize='xs'>Ticket Price</Text>
                <Divider/>
                <Flex  h='20px'>
                  <Image fit='contain' src="/solana-sol-logo.png" alt="Sol"/>
                </Flex>
                <Text>{event['Ticket price']>0?event['Ticket price']+' sol':'FREE'}</Text>
              </VStack>
            </CardBody>
          </Card>

          <Card 
              direction='row'
              h='120px'
              w='100%'
              boxShadow='1px 1px 10px rgba(30,30,30,0.2)'
            >
            <CardBody>
              <VStack spacing='5px'>
                <Text fontSize='xs'>Event Date</Text>
                <Divider/>
                <Flex  h='20px'>
                  NOV
                </Flex>
                <Text>19</Text>
              </VStack>
            </CardBody>
          </Card>
          </HStack>

          <Card 
              direction='row'
              w='100%'
              boxShadow='1px 1px 10px rgba(30,30,30,0.2)'
            >
            <CardBody>
              <VStack spacing='5px'>
                <Text fontSize='lg'>Tickets Sold</Text>
                <Divider/>
                <HStack>
                <HiOutlineTicket/>
                <Text>{'19/'+event['Event Capacity']}</Text>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          <Card 
              direction='row'
              w='100%'
              h='200px'
              boxShadow='1px 1px 10px rgba(30,30,30,0.2)'
            >
            <CardBody>
              <VStack spacing='5px' align='flex-start'>
                <Text fontSize='lg'>Location</Text>
                <Text>{event['Location Description']}</Text>
              </VStack>
            </CardBody>
          </Card>
          
          <Card 
              direction='row'
              w='100%'
              boxShadow='1px 1px 10px rgba(30,30,30,0.2)'
            >
            <CardBody>
              <VStack spacing='5px' align='flex-start'>
                <Text fontSize='xs'>Organisers Email</Text>
                <Text>{event['Organizers Email']}</Text>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </HStack>
      </VStack>
    </>
  )
}

export default Event