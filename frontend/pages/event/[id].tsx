import { Button, Card, CardBody, Center, Divider, Flex, Grid, GridItem, Heading, HStack, Image, Spacer, Stack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from '../../components/Header'
import getEventDets from '../../utils/getEventDets'
import type {EventData} from '../../utils/dataInterfaces'
import { HiOutlineTicket } from 'react-icons/hi'
import { SimpleMap } from '../../components/Maps'
import { QRcodeButton } from '../../components/QRcodeButton'
import { MultiMintButton } from '../../components/NftBuyButton'
import useCandyMachineV3 from "../../hooks/useCandyMachineV3";
import { GatewayProvider } from "@civic/solana-gateway-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {
  CustomCandyGuardMintSettings,
  NftPaymentMintSettings,
  ParsedPricesForUI,
} from "../../hooks/type";
import { guardToLimitUtil } from "../../hooks/utils";
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Nft } from '@metaplex-foundation/js';
import { AlertState } from '../../alertUtils'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'



const Event = () => {
  const router = useRouter()
  const { id } = router.query
  const [event, setEvent] = useState<EventData>()
  const [imgSelected, setImgSelected] = useState('ticket');

  const { connection } = useConnection();
  const wallet = useWallet();
  
  const candyMachineV3 = useCandyMachineV3(
    event?.candyMachineId ||  "",
  );

  const [balance, setBalance] = useState<number>();
  const [mintedItems, setMintedItems] = useState<Nft[]>();

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const {guards, guardStates, prices } = useMemo(() => {
    return {
      guards:
        candyMachineV3.guards.default ||
        {},
      guardStates: 
        candyMachineV3.guardStates.default || {
          isStarted: true,
          isEnded: false,
          isLimitReached: false,
          canPayFor: 10,
          messages: [],
          isWalletWhitelisted: true,
          hasGatekeeper: false,
        },
      prices: 
        candyMachineV3.prices.default || {
          payment: [],
          burn: [],
          gate: [],
        },
    };
  }, [
    candyMachineV3.guards,
    candyMachineV3.guardStates,
    candyMachineV3.prices,
  ]);

  useEffect(() => {
    (async () => {
      if (wallet?.publicKey) {
        const balance = await connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, connection]);

  const totalPrice = prices.payment
                    .filter(({ kind }) => kind === "sol")
                    .reduce((a, { price }) => a + price, 0)

  const startMint = useCallback(
    async (quantityString: number = 1) => {
      const nftGuards: NftPaymentMintSettings[] = Array(quantityString)
        .fill(undefined)
        .map((_, i) => {
          return {
            burn: guards.burn?.nfts?.length
              ? {
                  mint: guards.burn.nfts[i]?.mintAddress,
                }
              : undefined,  
            payment: guards.payment?.nfts?.length
              ? {
                  mint: guards.payment.nfts[i]?.mintAddress,
                }
              : undefined,
            gate: guards.gate?.nfts?.length
              ? {
                  mint: guards.gate.nfts[i]?.mintAddress,
                }
              : undefined,
          };
        });

      console.log({ nftGuards });
      // debugger;
      candyMachineV3
        .mint(quantityString, {
          nftGuards,
        })
        .then((items) => {
          setMintedItems(items as any);
        })
        .catch((e) =>
          setAlertState({
            open: true,
            message: e.message,
            severity: "error",
          })
        );
    },
    [candyMachineV3.mint, guards]
  );
  
  const MintButton = ({
      gatekeeperNetwork,
  }: {
      gatekeeperNetwork?: PublicKey;
  }) => (
    <MultiMintButton
      candyMachine={candyMachineV3.candyMachine}
      gatekeeperNetwork={gatekeeperNetwork}
      isMinting={candyMachineV3.status.minting}
      setIsMinting={() => {}}
      isActive={!!candyMachineV3.items.remaining}
      isEnded={guardStates.isEnded}
      isSoldOut={!candyMachineV3.items.remaining}
      guardStates={guardStates}
      onMint={startMint}
      prices={prices}
    />
  );

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
        {/* <QRcodeButton/> */}
        {!guardStates.isStarted ? (
          <h1>You are not allowed to purchase ticket yet. Come back on <>{guards.startTime}</></h1>
        ) : !wallet?.publicKey ? (
          <WalletMultiButton> Connect Wallet </WalletMultiButton>
        ) : (
          <>
            <>
              {!!candyMachineV3.items.remaining &&
              guardStates.hasGatekeeper &&
              wallet.publicKey &&
              wallet.signTransaction ? (
                <GatewayProvider
                  wallet={{
                    publicKey: wallet.publicKey,
                    //@ts-ignore
                    signTransaction: wallet.signTransaction,
                  }}
                  gatekeeperNetwork={guards.gatekeeperNetwork}
                  connection={connection}
                  cluster={
                    process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet"
                  }
                  options={{ autoShowModal: false }}
                >
                  <MintButton
                    gatekeeperNetwork={guards.gatekeeperNetwork}
                  />
                </GatewayProvider>
              ) : (
                <MintButton />
              )}
            </>
          </>
        )}
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
                <Text>{totalPrice > 0 ? totalPrice +' sol' : 'FREE'}</Text>
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
                <Text>{`${candyMachineV3.items.redeemed}/${candyMachineV3.items.available}`}</Text>
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
