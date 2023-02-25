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
import { Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';

const CreateEvent: React.FC = () => {
  const { publicKey, sendTransaction} = useWallet();
  const router = useRouter();
  const payer = Keypair.generate();
  const wallet = useWallet();
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
  const lamports = 0.1;
  useEffect(() => {
    console.log(publicKey?.toString())
    if (!publicKey) return;
    connection.getBalance(publicKey).then((bal) => {
      if(bal <= lamports){
        alert("You do not have enough balance to create an event");
        router.push("/");
      }
    })
    getUser(publicKey?.toString()).then(res => {
      setData({
        ...data,
        WalletAddress: publicKey?.toString(),
        OrganizersEmail: res.Email,
        Organizer: res.FirstName + " " + res.LastName
      })
    })
  }, [publicKey])
  
  
  //Not sure how ticketFile is being set, so i just created an useEffect here. Ask Ryan what is going on with setTicketFile
  useEffect(() => {
    candyMachineData.TicketFile = ticketFile;
  }, [candyMachineData,ticketFile]);


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
    let lamportsI = LAMPORTS_PER_SOL * lamports;
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: payer.publicKey,
        lamports: lamportsI,
      })
    )
    
    const signature = await sendTransaction(transaction, connection);
    const latestBlockhash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      signature: signature
    });
    console.log(data)
    // createNewEvent({
    //   ...data,
    //   CandyMachineId: "12",
    //   CollectionId: "12",
    //   Active: true
    // });
    setLoading(true);
    createCandyMachine(candyMachineData, payer).then(([collectionAddress, candyMachineID]) => {
      createNewEvent({
        ...data,
        CandyMachineId: candyMachineID,
        CollectionId: collectionAddress,
        Active: true
      });
      router.push('/');
    });
    // setLoading(true);
    // createCandyMachine(candyMachineData).then(([collectionAddress, candyMachineID]) => {
    //   createNewEvent({
    //     ...data,
    //     CandyMachineId: candyMachineID,
    //     CollectionId: collectionAddress,
    //     Active: true
    //   });
    //   router.push('/');
    // });
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
                    isDisabled={!data.WalletAddress}
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
