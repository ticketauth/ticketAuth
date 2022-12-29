import { Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Heading, HStack, Image, Input, SimpleGrid, Spacer, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { DebounceSearch } from "../components/Maps";
import { ImageInput } from "../components/ImageInput";
import { EventData, FormInputData } from "../utils/dataInterfaces";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import useScript from "../hooks/useScript";
import { useRouter } from "next/router";
import createCandyMachine from "../utils/createCandyMachine";
import { createNewEvent } from "../utils/controller/event";
import { createNft } from "../utils/controller/nft"

const CreateEvent: React.FC = () => {

	let wallet = useWallet();
	const router = useRouter();
	const [ticketFile, setTicketFile] = useState();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<FormInputData>(
		{
			'Name of event': '',
			'Category': '',
			'Event Description': '',
			'walletAddress': '',
			'Start Datetime': '',
			'End Datetime': '',
			'Location': '',
			'Organizers Email': '',
			'Organizer': '',
			'Event Capacity': 1,
			'Ticket price': 0,
			'Ticket Image': '',
			'Background Image': ''
		}
	);

	const handleData = (type: string, value: any) => {
		setData(prev => ({
			...prev,
			[type]: value,
		}))
	}

	const createEvent = async () => {
		// console.log("DATATO BE SENT",data)
		setLoading(true)
		createCandyMachine(
			data["Name of event"],
			data["Event Description"],
			data["Start Datetime"],
			data["End Datetime"],
			data["Event Capacity"],
			data["Ticket price"],
			ticketFile,
			wallet
		).then(
			([collectionAddress,candyMachineID])=>{
				createNewEvent({...data,candyMachineId:candyMachineID,collectionId:collectionAddress})
				router.push('/')
			}
		)
	}
	const [tabIndex, setTabIndex] = useState(0);
	return (
		<>
			<Header />
			<VStack spacing={-8}>
				<Grid h='250px' w='100%' justifyContent='center' alignItems='center' className="backdrop">
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
							<Tab borderStyle='solid' borderWidth='2px' borderRadius='100%' _selected={{ bg: 'brand.1' }}>1</Tab>
							<Tab borderStyle='solid' borderWidth='2px' borderRadius='100%' _selected={{ bg: 'brand.2' }}>2</Tab>
							<Tab borderStyle='solid' borderWidth='2px' borderRadius='100%' _selected={{ bg: 'brand.3' }}>3</Tab>
						</HStack>
					</TabList>


					<TabPanels>
						<TabPanel>
							<HStack>
								<VStack spacing='10px' w='45%'>
									<Tab1 data={data} handleData={handleData} />
									<Flex w='100%' justifyContent='flex-end'>
										<Button rightIcon={<ChevronRightIcon />} onClick={e => setTabIndex(1)}>Next Step</Button>
									</Flex>
								</VStack>

								<Spacer />

								<Center h='100%' w='45%'>
									<VStack align='flex-start'>
										<Text>Ticket Example:</Text>
										<Image h='100%' w='100%' src='/tickets/Card 2.jpg' />
									</VStack>
								</Center>
							</HStack>
						</TabPanel>

						<TabPanel>
							<VStack spacing='10px' w='100%'>
								<Tab2 data={data} handleData={handleData} />
								<Flex w='100%' justifyContent='flex-end'>
									<Button rightIcon={<ChevronRightIcon />} onClick={e => setTabIndex(2)}>Next Step</Button>
								</Flex>
							</VStack>
						</TabPanel>

						<TabPanel>
							<VStack spacing='10px' w='100%'>
								<Tab3 data={data} setTicketFile={setTicketFile} handleData={handleData} />
								<Flex w='100%' justifyContent='flex-end'>
									<Button rightIcon={loading ? <Spinner /> : <ChevronRightIcon />} onClick={() => createEvent()} bg='brand.3' color='white'>Create Your Event</Button>
								</Flex>
							</VStack>
						</TabPanel>
					</TabPanels>

				</Tabs>
			</VStack>
		</>
	)
}


const Tab1: React.FC<{ data: FormInputData, handleData: (type: string, value: string | number) => void }> = ({ data, handleData }) => {
	return (
		<SimpleGrid columns={6} spacing={4} w='100%'>
			<GridItem colSpan={4}>
				<FormControl w='100%' isInvalid={data['Name of event'] == ''}>
					<FormLabel>Event Name</FormLabel>
					<Input variant='flushed' placeholder="Event Name" type='text' value={data['Name of event']}
						onChange={(e) => handleData("Name of event", e.currentTarget.value)} w='100%' />
					{data['Name of event'] == '' &&
						(
							<FormErrorMessage>Event name is required.</FormErrorMessage>
						)}
				</FormControl>
			</GridItem>
			<GridItem colSpan={2}>
				<FormControl w='100%' isInvalid={data.Category == ''}>
					<FormLabel>Event Category</FormLabel>
					{/* <Select placeholder='Select option'>
							<option value='option1'>Option 1</option>
						</Select> */}
					<Input variant='flushed' placeholder="Category" type='text' value={data.Category}
						onChange={(e) => handleData("Category", e.currentTarget.value)} w='100%' />
					{data.Category == '' && <FormErrorMessage>Enter the event category.</FormErrorMessage>}
				</FormControl>
			</GridItem>

			<GridItem colSpan={3}>
				<FormControl w='100%' isInvalid={data["Start Datetime"] == ''}>
					<FormLabel>Start Date & Time</FormLabel>
					<Input variant='flushed' placeholder="Start Date" type="datetime-local" value={data["Start Datetime"]} onChange={(e) => handleData("Start Datetime", e.currentTarget.value)} />
					{data["Start Datetime"] == '' && <FormErrorMessage>Date is required.</FormErrorMessage>}
				</FormControl>
			</GridItem>
			<GridItem colSpan={3}>
				<FormControl w='100%' isInvalid={data["End Datetime"] == ''}>
					<FormLabel>End Date & Time</FormLabel>
					<Input variant='flushed' placeholder="End Date" type="datetime-local" value={data["End Datetime"]} onChange={(e) => handleData("End Datetime", e.currentTarget.value)} />
					{data["End Datetime"] == '' && <FormErrorMessage>Date is required.</FormErrorMessage>}
				</FormControl>
			</GridItem>

			<GridItem colSpan={1}>
				<FormControl w='100%' isInvalid={data['Ticket price'].toString() == ''}>
					<FormLabel>Ticket Price</FormLabel>
					<Input variant='flushed' placeholder="Ticket Price" type='number' value={data['Ticket price']} onChange={(e) => handleData("Ticket price", e.currentTarget.value)} w='100%' />
					{data['Ticket price'].toString() == '' && <FormErrorMessage>Enter the price of the ticket.</FormErrorMessage>}
				</FormControl>
			</GridItem>
			<GridItem colSpan={1}>
				<FormControl w='100%' isInvalid={data['Event Capacity'].toString() == ''}>
					<FormLabel>Capacity</FormLabel>
					<Input variant='flushed' placeholder="Event Capacity" type='number' value={data['Event Capacity']} onChange={(e) => handleData("Event Capacity", e.currentTarget.value)} w='100%' />
					{data['Event Capacity'].toString() && <FormErrorMessage>Enter the number of available tickets.</FormErrorMessage>}
				</FormControl>
			</GridItem>
			<GridItem colSpan={2}>
				<FormControl w='100%' isInvalid={data.Organizer == ''}>
					<FormLabel>Organizer Name</FormLabel>
					<Input variant='flushed' placeholder="Organizer" type='text' value={data.Organizer} onChange={(e) => handleData("Organizer", e.currentTarget.value)} w='100%' />
					{data.Organizer == '' && <FormErrorMessage>Enter your Organizer name</FormErrorMessage>}
				</FormControl>
			</GridItem>
			<GridItem colSpan={2}>
				<FormControl w='100%' isInvalid={data['Organizers Email'] == ''}>
					<FormLabel>Organizers Email</FormLabel>
					<Input variant='flushed' placeholder="Organiser email" type='email' value={data['Organizers Email']} onChange={(e) => handleData("Organizers Email", e.currentTarget.value)} w='100%' />
					{data['Organizers Email'] == '' && <FormErrorMessage>Enter your email for contact purposes</FormErrorMessage>}
				</FormControl>
			</GridItem>
		</SimpleGrid >
	)
}

const Tab2: React.FC<{ data: FormInputData, handleData: (type: string, value: string) => void }> = ({ data, handleData }) => {
	return (
		<VStack w='100%' align='flex-start'>
			<FormControl isInvalid={data["Event Description"] == ''}>
				<FormLabel>Event Description</FormLabel>
				<Textarea h='200px' value={data["Event Description"]} onChange={(e) => handleData("Event Description", e.currentTarget.value)} w='100%' />
				{data["Event Description"] == '' && <FormErrorMessage>Description is required.</FormErrorMessage>}
			</FormControl>
			<FormControl>
				<FormLabel>Event Location</FormLabel>
				<DebounceSearch data={data} handleData={handleData} />
			</FormControl>
		</VStack>
	)
}

const Tab3: React.FC<{ data: FormInputData, handleData: (type: string, value: string) => void, setTicketFile: (File) => void }> = ({ data, handleData, setTicketFile }) => {
	return (
		<HStack w='100%' h='400px' gap='10px'>
			<VStack h='100%' w='100%' align='flex-start'>
				<Heading size='md'>Event Banner Image</Heading>
				<ImageInput data={data} setTicketFile={setTicketFile} handleData={handleData} imgtype="Background Image" />
			</VStack>
			<VStack h='100%' w='100%' align='flex-start'>
				<Heading size='md'>Ticket Image</Heading>
				<ImageInput data={data} setTicketFile={setTicketFile} handleData={handleData} imgtype="Ticket Image" />
			</VStack>
		</HStack>
	)
}

export default CreateEvent;