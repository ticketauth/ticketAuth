import {
<<<<<<< HEAD
	Button,
	Center,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	GridItem,
	Heading,
	Hide,
	HStack,
	Image,
	Input,
	Show,
	SimpleGrid,
	Spacer,
	Spinner,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { DebounceSearch } from "../components/Maps";
import { ImageInput } from "../components/ImageInput";
import { CandyMachineData, FormInputData } from "../utils/dataInterfaces";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import createCandyMachine from "../utils/createCandyMachine";
import { createNewEvent } from "../utils/controller/event";
import { Backdrop } from "../components/Backdrop";

const CreateEvent: React.FC = () => {
	const wallet = useWallet();
	const router = useRouter();
	const [ticketFile, setTicketFile] = useState<File>();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<FormInputData>({
		"Name of event": "",
		Category: "",
		"Event Description": "",
		walletAddress: "",
		"Start Event Datetime": "",
		"End Event Datetime": "",
		"Start Sale Datetime": "",
		"End Sale Datetime": "",
		Location: "",
		"Organizers Email": "",
		Organizer: "",
		"Event Capacity": 1,
		"Ticket price": 0,
		"Ticket Image": "",
		"Background Image": "",
	});

	const [candyMachineData, setCandyMachineData] = useState<CandyMachineData>({
		"Name of event" : "",
		"Event Description" : "",
		"Start Event Datetime" : "",
		"End Event Datetime" : "",
		"Start Sale Datetime" : "",
		"End Sale Datetime" :  "",
		"Event Capacity" : 0,
		"Ticket price" : 0,
		ticketFile : null,
		wallet : wallet,
	})
	
	//Not sure how ticketFile is being set, so i just created an useEffect here. Ask Ryan what is going on with setTicketFile
	useEffect(() => {
	  candyMachineData.ticketFile = ticketFile;
	}, [ticketFile])
	

	const handleData = (type: string, value: any) => {
		setData((prev) => ({
			...prev,
			[type]: value,
		}));
		setCandyMachineData((prev) => ({
			...prev,
			[type]: value,
		}));
		data.walletAddress = wallet.publicKey.toString();
	};

	const createEvent = async () => {
		setLoading(true);
		createCandyMachine(candyMachineData)
		.then(([collectionAddress, candyMachineID]) => {
			createNewEvent({
				...data,
				candyMachineId: candyMachineID,
				collectionId: collectionAddress,
			});
			router.push("/");
		});
	};
	const [tabIndex, setTabIndex] = useState(0);
	return (
		<Grid w="100%">
			<Header />
			<VStack spacing={-8}>
				<Backdrop>
					<Text fontSize={["5xl", "6xl"]} fontFamily={"monoton"} color="white">
						Create Event
					</Text>
				</Backdrop>
=======
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  Show,
  SimpleGrid,
  Spacer,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { DebounceSearch } from '../components/Maps';
import { ImageInput } from '../components/ImageInput';
import { FormInputData } from '../utils/dataInterfaces';
import { useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import createCandyMachine from '../utils/createCandyMachine';
import { createNewEvent } from '../utils/controller/event';
import { Backdrop } from '../components/Backdrop';
import '@fontsource/monoton';

const CreateEvent: React.FC = () => {
  let wallet = useWallet();
  const router = useRouter();
  const [ticketFile, setTicketFile] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FormInputData>({
    'Name of event': '',
    Category: '',
    'Event Description': '',
    walletAddress: '',
    'Start Event Datetime': '',
    'End Event Datetime': '',
    'Start Sale Datetime': '',
    'End Sale Datetime': '',
    Location: '',
    'Organizers Email': '',
    Organizer: '',
    'Event Capacity': 1,
    'Ticket price': 0,
    'Ticket Image': '',
    'Background Image': '',
  });

  const handleData = (type: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const createEvent = async () => {
    setLoading(true);
    createCandyMachine(
      data['Name of event'],
      data['Event Description'],
      data['Start Event Datetime'],
      // data["End Event Datetime"],
      // data["Start Sale Datetime"],
      data['End Sale Datetime'],
      data['Event Capacity'],
      data['Ticket price'],
      ticketFile,
      wallet,
    )
      .then(([collectionAddress, candyMachineID]) => {
        createNewEvent({
          ...data,
          walletAddress: wallet.publicKey?.toString(),
          candyMachineId: candyMachineID,
          collectionId: collectionAddress,
        });
        router.push('/');
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Grid w="100%">
      <Header />
      <VStack spacing={-8}>
        <Backdrop>
          <Text fontSize={['5xl', '6xl']} fontFamily={'Monoton'} color="white">
            Create Event
          </Text>
        </Backdrop>
>>>>>>> main

        <Tabs
          variant="unstyled"
          index={tabIndex}
          onChange={(tabIndex) => setTabIndex(tabIndex)}
          w="80%"
        >
          <TabList justifyContent="center">
            <HStack
              h="64px"
              gap="10px"
              bg="white"
              zIndex={3}
              padding="0 20px"
              borderRadius="40px"
              boxShadow="1px 5px 10px rgba(30,30,30,0.5)"
              align="center"
            >
              <Tab
                borderStyle="solid"
                borderColor="cyan"
                borderWidth="2px"
                color="black"
                borderRadius="100%"
                _selected={{ bg: 'brand.1', color: 'white' }}
              >
                1
              </Tab>
              <Tab
                borderStyle="solid"
                borderColor="cyan"
                borderWidth="2px"
                color="black"
                borderRadius="100%"
                _selected={{ bg: 'brand.2', color: 'white' }}
              >
                2
              </Tab>
              <Tab
                borderStyle="solid"
                borderColor="cyan"
                borderWidth="2px"
                color="black"
                borderRadius="100%"
                _selected={{ bg: 'brand.3', color: 'white' }}
              >
                3
              </Tab>
              <Tab
                borderStyle="solid"
                borderColor="cyan"
                borderWidth="2px"
                color="black"
                borderRadius="100%"
                _selected={{ bg: 'brand.4', color: 'white' }}
              >
                4
              </Tab>
            </HStack>
          </TabList>

          <TabPanels>
            <TabPanel>
              <HStack>
                <VStack spacing="10px" w={['100%', '45%']}>
                  <Tab1 data={data} handleData={handleData} />
                  <Flex w="100%" justifyContent="flex-end">
                    <Button rightIcon={<ChevronRightIcon />} onClick={(e) => setTabIndex(1)}>
                      Next Step
                    </Button>
                  </Flex>
                </VStack>

                <Show above="sm">
                  <Spacer />

                  <Center h="100%" w="45%">
                    <VStack align="flex-start">
                      <Text>Ticket Example:</Text>
                      <Image h="100%" w="100%" alt="ticket" src="/tickets/Card 2.jpg" />
                    </VStack>
                  </Center>
                </Show>
              </HStack>
            </TabPanel>

            <TabPanel>
              <HStack>
                <VStack spacing="10px" w={['100%', '45%']}>
                  <Tab2 data={data} handleData={handleData} />
                  <Flex w="100%" justifyContent="flex-end">
                    <Button rightIcon={<ChevronRightIcon />} onClick={(e) => setTabIndex(1)}>
                      Next Step
                    </Button>
                  </Flex>
                </VStack>

                <Show above="sm">
                  <Spacer />

                  <Center h="100%" w="45%">
                    <VStack align="flex-start">
                      <Text>Ticket Example:</Text>
                      <Image h="100%" w="100%" alt="ticket" src="/tickets/Card 2.jpg" />
                    </VStack>
                  </Center>
                </Show>
              </HStack>
            </TabPanel>

            <TabPanel>
              <VStack scrollBehavior={true} spacing="10px" w="100%">
                <Tab3 data={data} handleData={handleData} />
                <Flex w="100%" justifyContent="flex-end">
                  <Button rightIcon={<ChevronRightIcon />} onClick={(e) => setTabIndex(2)}>
                    Next Step
                  </Button>
                </Flex>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack spacing="10px" w="100%">
                <Tab4 data={data} setTicketFile={setTicketFile} handleData={handleData} />
                <Flex w="100%" justifyContent="flex-end">
                  <Button
                    rightIcon={loading ? <Spinner /> : <ChevronRightIcon />}
                    onClick={() => createEvent()}
                    bg="brand.3"
                    color="white"
                  >
                    Create Your Event
                  </Button>
                </Flex>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Grid>
  );
};

const Tab1: React.FC<{
  data: FormInputData;
  handleData: (type: string, value: string | number) => void;
}> = ({ data, handleData }) => {
  return (
    <VStack spacing={4} w="100%">
      <FormControl w="100%" isInvalid={data['Name of event'] == ''}>
        <FormLabel>Event Name</FormLabel>
        <Input
          variant="flushed"
          placeholder="Event Name"
          type="text"
          value={data['Name of event']}
          onChange={(e) => handleData('Name of event', e.currentTarget.value)}
          w="100%"
        />
        {data['Name of event'] == '' && (
          <FormErrorMessage>Event name is required.</FormErrorMessage>
        )}
      </FormControl>

      <FormControl w="100%" isInvalid={data.Category == ''}>
        <FormLabel>Event Category</FormLabel>
        {/* <Select placeholder='Select option'>
						// 	<option value='option1'>Option 1</option>
						// </Select> */}
        <Input
          variant="flushed"
          placeholder="Category"
          type="text"
          value={data.Category}
          onChange={(e) => handleData('Category', e.currentTarget.value)}
          w="100%"
        />
        {data.Category == '' && <FormErrorMessage>Enter the event category.</FormErrorMessage>}
      </FormControl>

      <FormControl w="100%" isInvalid={data['Start Event Datetime'] == ''}>
        <FormLabel>Start Event Date & Time</FormLabel>
        <Input
          variant="flushed"
          type="datetime-local"
          value={data['Start Event Datetime']}
          onChange={(e) => handleData('Start Event Datetime', e.currentTarget.value)}
        />
        {data['Start Event Datetime'] == '' && (
          <FormErrorMessage>Date is required.</FormErrorMessage>
        )}
      </FormControl>

      <FormControl w="100%" isInvalid={data['End Event Datetime'] == ''}>
        <FormLabel>End Event Date & Time</FormLabel>
        <Input
          variant="flushed"
          type="datetime-local"
          value={data['End Event Datetime']}
          onChange={(e) => handleData('End Event Datetime', e.currentTarget.value)}
        />
        {data['End Event Datetime'] == '' && <FormErrorMessage>Date is required.</FormErrorMessage>}
      </FormControl>
    </VStack>
  );
};
const Tab2: React.FC<{
  data: FormInputData;
  handleData: (type: string, value: string | number) => void;
}> = ({ data, handleData }) => {
  return (
    <VStack w="100%">
      <FormControl w="100%" isInvalid={data['Start Sale Datetime'] == ''}>
        <FormLabel>Start Sale Date & Time</FormLabel>
        <Input
          variant="flushed"
          type="datetime-local"
          value={data['Start Sale Datetime']}
          onChange={(e) => handleData('Start Sale Datetime', e.currentTarget.value)}
        />
        {data['Start Sale Datetime'] == '' && (
          <FormErrorMessage>Date is required.</FormErrorMessage>
        )}
      </FormControl>

      <FormControl w="100%" isInvalid={data['End Sale Datetime'] == ''}>
        <FormLabel>End Sale Date & Time</FormLabel>
        <Input
          variant="flushed"
          type="datetime-local"
          value={data['End Sale Datetime']}
          onChange={(e) => handleData('End Sale Datetime', e.currentTarget.value)}
        />
        {data['End Sale Datetime'] == '' && <FormErrorMessage>Date is required.</FormErrorMessage>}
      </FormControl>

      <HStack>
        <FormControl w="100%" isInvalid={data['Ticket price'].toString() == ''}>
          <FormLabel>Ticket Price</FormLabel>
          <Input
            variant="flushed"
            placeholder="Ticket Price"
            type="number"
            value={data['Ticket price']}
            onChange={(e) => handleData('Ticket price', e.currentTarget.value)}
            w="100%"
          />
          {data['Ticket price'].toString() == '' && (
            <FormErrorMessage>Enter the price of the ticket.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl w="100%" isInvalid={data['Event Capacity'].toString() == ''}>
          <FormLabel>Capacity</FormLabel>
          <Input
            variant="flushed"
            placeholder="Event Capacity"
            type="number"
            value={data['Event Capacity']}
            onChange={(e) => handleData('Event Capacity', e.currentTarget.value)}
            w="100%"
          />
          {data['Event Capacity'].toString() && (
            <FormErrorMessage>Enter the number of available tickets.</FormErrorMessage>
          )}
        </FormControl>
      </HStack>

      <FormControl w="100%" isInvalid={data['Organizers Email'] == ''}>
        <FormLabel>Organizers Email</FormLabel>
        <Input
          variant="flushed"
          placeholder="Organiser email"
          type="email"
          value={data['Organizers Email']}
          onChange={(e) => handleData('Organizers Email', e.currentTarget.value)}
          w="100%"
        />
        {data['Organizers Email'] == '' && (
          <FormErrorMessage>Enter your email for contact purposes</FormErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
};

const Tab3: React.FC<{
  data: FormInputData;
  handleData: (type: string, value: string) => void;
}> = ({ data, handleData }) => {
  return (
    <VStack w="100%" align="flex-start">
      <FormControl isInvalid={data['Event Description'] == ''}>
        <FormLabel>Event Description</FormLabel>
        <Textarea
          h="200px"
          value={data['Event Description']}
          onChange={(e) => handleData('Event Description', e.currentTarget.value)}
          w="100%"
        />
        {data['Event Description'] == '' && (
          <FormErrorMessage>Description is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl>
        <FormLabel>Event Location</FormLabel>
        <DebounceSearch data={data} handleData={handleData} />
      </FormControl>
    </VStack>
  );
};

const Tab4: React.FC<{
  data: FormInputData;
  handleData: (type: string, value: string) => void;
  setTicketFile: (File) => void;
}> = ({ data, handleData, setTicketFile }) => {
  return (
    <SimpleGrid columns={2} w="100%" gap="10px">
      <GridItem colSpan={[2, 1]}>
        <VStack h="100%" w="100%" align="flex-start">
          <Heading size="md">Event Banner Image</Heading>
          <ImageInput
            data={data}
            setTicketFile={setTicketFile}
            handleData={handleData}
            imgtype="Background Image"
          />
        </VStack>
      </GridItem>

      <GridItem colSpan={[2, 1]}>
        <VStack h="100%" w="100%" align="flex-start">
          <Heading size="md">Ticket Image</Heading>
          <ImageInput
            data={data}
            setTicketFile={setTicketFile}
            handleData={handleData}
            imgtype="Ticket Image"
          />
        </VStack>
      </GridItem>
    </SimpleGrid>
  );
};

export default CreateEvent;
