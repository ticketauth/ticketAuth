import { Button, Card, CardBody, Center, Divider, Flex, Grid, GridItem, Heading, HStack, Image, Spacer, Stack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import getEventDets from '../../utils/getEventDets'
import type {EventData} from '../../utils/dataInterfaces'
import { HiOutlineTicket } from 'react-icons/hi'
import { SimpleMap } from '../../components/Maps'
import { QRcodeButton } from '../../components/QRcodeButton'

const Event = () => {
  const router = useRouter()
  const { id } = router.query
  const [event, setEvent] = useState<EventData>()
  const [imgSelected, setImgSelected] = useState('ticket');

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
        {/* <QRcodeButton/> */}
      </HStack>

      <HStack w='100%' align='flex-start'>
        <VStack align='flex-start' w='75%' padding='10px'>
          <Card 
            direction='row'
            w='100%'
            boxShadow='1px 1px 10px rgba(30,30,30,0.2)'
          >
            <CardBody>
              <Grid h='300px' templateColumns='repeat(4, 1fr)'>
                <GridItem colSpan={3} h='100%' w='100%'>
                  <Center h='100%'>
                  <Image alignSelf='center' objectFit='cover' src={imgSelected==='ticket'?event['Ticket Image']:event['Background Image']}/>
                  </Center>
                </GridItem>
                <GridItem colSpan={1}>
                <VStack h='100%' justifyContent='center'>
                  <Center  w='120px' h='120px' 
                    onClick={()=>setImgSelected('ticket')} 
                    border={
                      imgSelected=='ticket'?
                      '4px solid rgba(0,180,216,0.96)':''}
                      >
                    <Image objectFit='cover' src={event['Ticket Image']}/>
                  </Center>
                  <Center  w='120px' h='120px' 
                    onClick={()=>setImgSelected('bg')} 
                    border={
                      imgSelected=='bg'?
                      '4px solid rgba(0,180,216,0.96)':''}
                      >
                    <Image boxSize='100px' src={event['Background Image']}/>
                  </Center>
                </VStack>
                </GridItem>
              </Grid>
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
                <Text>{`${event.attendees.length}/${event['Event Capacity']}`}</Text>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          <Card 
              direction='row'
              w='100%'
              h='250px'
              boxShadow='1px 1px 10px rgba(30,30,30,0.2)'
            >
            <CardBody>
              <VStack spacing='5px' align='flex-start' h='100%'>
                <Heading size='sm'>Location</Heading>
                <Text fontSize='sm' color='blue'>{event.Location}</Text>
                <SimpleMap lat={event.Coordinates.lat} lng={event.Coordinates.lng}/>
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