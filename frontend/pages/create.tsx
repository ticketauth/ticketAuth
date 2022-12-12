import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, HStack, Image, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Header from "../components/Header";
import { ChevronRightIcon } from "@chakra-ui/icons";

const CreateEvent:React.FC = () => {
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
						</HStack>
					</TabList>
					<TabPanels>
						<TabPanel>
							<HStack>
								<VStack w='50%'>
									<Tab1/>
									<Flex w='100%' justifyContent='flex-end'>
										<Button rightIcon={<ChevronRightIcon/>} onClick={e=>setTabIndex(1)}>Next Step</Button>
									</Flex>
								</VStack>
								<TicketPreview/>
							</HStack>
						</TabPanel>
						<TabPanel>
						<HStack>
								<VStack w='50%'>
									<Tab2/>
									<Flex w='100%' justifyContent='flex-end'>
										<Button rightIcon={<ChevronRightIcon/>} onClick={e=>setTabIndex(1)}>Next Step</Button>
									</Flex>
								</VStack>
								<TicketPreview/>
							</HStack>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</VStack>
		</>
	)
}


const TicketPreview = () => {
	return(
		<VStack w='50%'>
			<Image 
				src='data:image/jpeg;base64,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'/>
		</VStack>
	)
}

const Tab1 = () => {
	const [input, setInput] = useState('')

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>):void => setInput(e.currentTarget.value)

  const isError = input === ''
	return (
			<Grid gap={4}>
				<GridItem colSpan={2}>
				<FormControl w='100%' isInvalid={isError}>
						<FormLabel>Event Name</FormLabel>
						<Input type='text' value={input} onChange={handleInputChange} w='100%'/>
						{isError &&
						(
							<FormErrorMessage>Event name is required.</FormErrorMessage>
						)}
				</FormControl>
				</GridItem>

				<GridItem colSpan={1}>
					<FormControl w='100%' isInvalid={isError}>
						<FormLabel>Date of Event</FormLabel>
						<Input type='email' value={input} onChange={handleInputChange} w='100%'/>
						{isError&&<FormErrorMessage>Date is required.</FormErrorMessage>}
					</FormControl>
				</GridItem>
				<GridItem colSpan={1}>
					<FormControl w='100%' isInvalid={isError}>
						<FormLabel>Event Category</FormLabel>
						<Input type='email' value={input} onChange={handleInputChange} w='100%'/>
						{isError&&<FormErrorMessage>Enter the event category.</FormErrorMessage>}
					</FormControl>
				</GridItem>

				<GridItem colSpan={1}>
					<FormControl w='100%' isInvalid={isError}>
						<FormLabel>Ticket Price</FormLabel>
						<Input type='email' value={input} onChange={handleInputChange} w='100%'/>
						{isError&&<FormErrorMessage>Enter the price of the ticket.</FormErrorMessage>}
					</FormControl>
				</GridItem>
				<GridItem colSpan={1}>
					<FormControl w='100%' isInvalid={isError}>
						<FormLabel>Number of Available Tickets</FormLabel>
						<Input type='email' value={input} onChange={handleInputChange} w='100%'/>
						{isError&&<FormErrorMessage>Enter the number of available tickets.</FormErrorMessage>}
					</FormControl>
				</GridItem>
			</Grid>
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
			<FormLabel>Long Description</FormLabel>
			<Textarea placeholder='Here is a sample placeholder' />
		</VStack>
	)
}


export default CreateEvent;