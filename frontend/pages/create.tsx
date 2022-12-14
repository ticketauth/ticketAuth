import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Heading, HStack, Image, Input, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Header from "../components/Header";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {  DebounceSearch } from "../components/Maps";
import { ImageInput } from "../components/ImageInput";
import { EventData } from "../utils/dataInterfaces";

const CreateEvent:React.FC = () => {

	const initialValues = {
		'Name of Event': String,
		'Event Description': String,
		'walletAddress': String,
		'Start Datetime': String,
		'End Datetime': String,
		'Location': String,
		'Coordinates': String,
		'Organizers Email': String,
		'Capacity': 0,
		'price': String,
		
	}

	const [tabIndex, setTabIndex] = useState(0);
  return (
		<>
			<Header/>
			<VStack spacing={-8}>
				<Grid h='250px' w='100%' justifyContent='center' alignItems='center' bgGradient="linear(to-t, green.200, teal.500)">
					<VStack>
						<Text fontSize={'60px'} fontFamily={'monoton'} color='white'> Create Event</Text>
					</VStack>
				</Grid>

				<Tabs variant='unstyled' index={tabIndex} onChange={(tabIndex) => setTabIndex(tabIndex)} w='80%'>
					
					<TabList justifyContent='center'>
						<HStack 
							h='64px'
							gap='10px'
							bg='white'
							zIndex={3}
							padding='0 20px'
							borderRadius='40px'
							boxShadow='1px 5px 10px rgba(30,30,30,0.5)'
							align='center'
						>
							<Tab borderStyle='solid' borderWidth='2px' borderRadius='100%' _selected={{ color: 'white', bg: 'blue.500' }}>1</Tab>
							<Tab borderStyle='solid' borderWidth='2px' borderRadius='100%' _selected={{ color: 'white', bg: 'green.400' }}>2</Tab>
							<Tab borderStyle='solid' borderWidth='2px' borderRadius='100%' _selected={{ color: 'white', bg: 'green.400' }}>3</Tab>
						</HStack>
					</TabList>


					<TabPanels>
						<TabPanel>
							<VStack spacing='10px' w='100%'>
							<Tab1/>
							<Flex w='100%' justifyContent='flex-end'>
								<Button rightIcon={<ChevronRightIcon/>} onClick={e=>setTabIndex(1)}>Next Step</Button>
							</Flex>
							</VStack>
						</TabPanel>

						<TabPanel>
							<VStack spacing='10px' w='100%'>
							<Tab2/>
							<Flex w='100%' justifyContent='flex-end'>
								<Button rightIcon={<ChevronRightIcon/>} onClick={e=>setTabIndex(1)}>Next Step</Button>
							</Flex>
							</VStack>
						</TabPanel>

						<TabPanel>
							<VStack spacing='10px' w='100%'>
							<Tab3/>
							<Flex w='100%' justifyContent='flex-end'>
								<Button rightIcon={<ChevronRightIcon/>} onClick={e=>setTabIndex(1)} bg='brand.3' color='white'>Create Your Event</Button>
							</Flex>
							</VStack>
						</TabPanel>
					</TabPanels>
						
				</Tabs>
			</VStack>
		</>
	)
}


const Tab1 = () => {
	const [input, setInput] = useState('')

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>):void => setInput(e.currentTarget.value)

  const isError = input === ''
	return (
			<SimpleGrid columns={6} spacing={4} w='100%'>
				<GridItem colSpan={4}>
				<FormControl w='100%' isInvalid={isError}>
					<Input placeholder="Event Name" type='text' value={input} onChange={handleInputChange} w='100%'/>
					{isError &&
					(
						<FormErrorMessage>Event name is required.</FormErrorMessage>
					)}
				</FormControl>
				</GridItem>
				<GridItem colSpan={2}>
					<FormControl w='100%' isInvalid={isError}>
						<Input placeholder="Category" type='search' value={input} onChange={handleInputChange} w='100%'/>
						{isError&&<FormErrorMessage>Enter the event category.</FormErrorMessage>}
					</FormControl>
				</GridItem>

				<GridItem colSpan={3}>
					<FormControl w='100%' isInvalid={isError}>
						<Input placeholder="Start Date" type="datetime-local" />
						{isError&&<FormErrorMessage>Date is required.</FormErrorMessage>}
					</FormControl>
				</GridItem>
				<GridItem colSpan={3}>
					<FormControl w='100%' isInvalid={isError}>
						<Input placeholder="End Date" type="datetime-local" />
						{isError&&<FormErrorMessage>Date is required.</FormErrorMessage>}
					</FormControl>
				</GridItem>

				<GridItem colSpan={2}>
					<FormControl w='100%' isInvalid={isError}>
						<Input placeholder="Ticket Price" type='email' value={input} onChange={handleInputChange} w='100%'/>
						{isError&&<FormErrorMessage>Enter the price of the ticket.</FormErrorMessage>}
					</FormControl>
				</GridItem>
				<GridItem colSpan={2}>
					<FormControl w='100%' isInvalid={isError}>
						<Input placeholder="Event Capacity" type='email' value={input} onChange={handleInputChange} w='100%'/>
						{isError&&<FormErrorMessage>Enter the number of available tickets.</FormErrorMessage>}
					</FormControl>
				</GridItem>
				<GridItem colSpan={2}>
					<FormControl w='100%' isInvalid={isError}>
						<Input placeholder="Organiser email" type='email' value={input} onChange={handleInputChange} w='100%'/>
						{isError&&<FormErrorMessage>Enter your email for contact purposes</FormErrorMessage>}
					</FormControl>
				</GridItem>
			</SimpleGrid >
	)
}

const Tab2 = () => {
	const [input, setInput] = useState('')

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>):void => setInput(e.currentTarget.value)

  const isError = input === ''
	return (
		<VStack w='100%' align='flex-start'>
			<FormControl isInvalid={isError}>
			<FormLabel>Short Description</FormLabel>
			<Input type='text' value={input} onChange={handleInputChange} w='100%'/>
			{isError&&<FormErrorMessage>Description is required.</FormErrorMessage>}
			</FormControl>
			<FormControl>
				<FormLabel>Event Location</FormLabel>
				<DebounceSearch/>
			</FormControl>
		</VStack>
	)
}

const Tab3 = () => {
	return (
		<HStack w='100%' h='400px' gap='10px'>
			<VStack h='100%' w='100%' align='flex-start'>
			<Heading size='md'>Event Banner Image</Heading>
			<ImageInput/>
			</VStack>
			<VStack h='100%' w='100%' align='flex-start'>
			<Heading size='md'>Ticket Image</Heading>
			<ImageInput/>
			</VStack>
		</HStack>
)
}

export default CreateEvent;