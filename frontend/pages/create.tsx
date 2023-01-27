import {
  Button,
  Center,
  Flex,
  Grid,
  HStack,
  Image,
  Show,
  Spacer,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { CandyMachineData } from '../utils/dataInterfaces/candyMachineInterfaces';
import { CreateEventFormData } from '../utils/dataInterfaces/eventInterfaces';
import { UserData } from '../utils/dataInterfaces/userInterfaces';
import { useConnection, useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import createCandyMachine from '../utils/createCandyMachine';
import { createNewEvent } from '../utils/controller/event';
import { Backdrop } from '../components/Backdrop';
import '@fontsource/monoton';
import { Tab1, Tab2, Tab3, Tab4 } from '../components/CreateTabs';
import { getUser } from '../utils/controller/user';

const CreateEvent: React.FC = () => {
  const wallet = useWallet();
  const router = useRouter();
  const { connection } = useConnection();
  const [ticketFile, setTicketFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>()
  const [data, setData] = useState<CreateEventFormData>({
    EventId: "",
    EventName: '',
    Category: '',
    EventDescription: '',
    WalletAddress: '',
    StartEventDatetime: '',
    EndEventDatetime: '',
    StartSaleDatetime: '',
    EndSaleDatetime: '',
    Location: '',
    OrganizersEmail: '',
    Organizer: '',
    EventCapacity: 1,
    TicketPrice: 0,
    TicketImage: '',
    BackgroundImage: '',
  });

  const [candyMachineData, setCandyMachineData] = useState<CandyMachineData>({
    EventName: '',
    EventDescription: '',
    StartEventDatetime: '',
    EndEventDatetime: '',
    StartSaleDatetime: '',
    EndSaleDatetime: '',
    EventCapacity: 0,
    TicketPrice: 0,
    TicketFile: null,
    Wallet: wallet,
    Connection: connection,
  });

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (!wallet.publicKey) return;
    getUser(wallet.publicKey?.toString()).then(res => {
      setData({
        ...data,
        WalletAddress: wallet.publicKey?.toString(),
        OrganizersEmail: res.Email,
        Organizer: res.FirstName + " " + res.LastName
      })
    })
  }, [])
  //Not sure how ticketFile is being set, so i just created an useEffect here. Ask Ryan what is going on with setTicketFile
  useEffect(() => {
    candyMachineData.TicketFile = ticketFile;
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
  };

  const createEvent = async () => {
    setLoading(true);
    createCandyMachine(candyMachineData).then(([collectionAddress, candyMachineID]) => {
      createNewEvent({
        ...data,
        CandyMachineId: candyMachineID,
        CollectionId: collectionAddress,
        Active: true
      });
      router.push('/');
    });
  };

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
                    <Button rightIcon={<ChevronRightIcon />} onClick={() => setTabIndex(1)}>
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
