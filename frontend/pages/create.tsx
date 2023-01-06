import {
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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { DebounceSearch } from '../components/Maps';
import { ImageInput } from '../components/ImageInput';
import { CandyMachineData, FormInputData } from '../utils/dataInterfaces';
import { useConnection, useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import createCandyMachine from '../utils/createCandyMachine';
import { createNewEvent } from '../utils/controller/event';
import { Backdrop } from '../components/Backdrop';
import '@fontsource/monoton';
import { Tab1, Tab2, Tab3, Tab4 } from '../components/CreateTabs';

const CreateEvent: React.FC = () => {
  const wallet = useWallet();
  const router = useRouter();
  const { connection } = useConnection();
  const [ticketFile, setTicketFile] = useState<File>();
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

  const [candyMachineData, setCandyMachineData] = useState<CandyMachineData>({
    'Name of event': '',
    'Event Description': '',
    'Start Event Datetime': '',
    'End Event Datetime': '',
    'Start Sale Datetime': '',
    'End Sale Datetime': '',
    'Event Capacity': 0,
    'Ticket price': 0,
    ticketFile: null,
    wallet: wallet,
    connection: connection,
  });

  //Not sure how ticketFile is being set, so i just created an useEffect here. Ask Ryan what is going on with setTicketFile
  useEffect(() => {
    candyMachineData.ticketFile = ticketFile;
  }, [ticketFile]);

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
    createCandyMachine(candyMachineData).then(([collectionAddress, candyMachineID]) => {
      createNewEvent({
        ...data,
        candyMachineId: candyMachineID,
        collectionId: collectionAddress,
      });
      router.push('/');
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
                    <Button rightIcon={<ChevronRightIcon />} onClick={(e) => setTabIndex(2)}>
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
              <VStack spacing="10px" w="100%">
                <Tab3 data={data} handleData={handleData} />
                <Flex w="100%" justifyContent="flex-end">
                  <Button rightIcon={<ChevronRightIcon />} onClick={(e) => setTabIndex(3)}>
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

export default CreateEvent;
