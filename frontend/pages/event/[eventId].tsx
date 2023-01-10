import {
  AspectRatio,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Show,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from '../../components/Header';
import type { EventData } from '../../utils/dataInterfaces';
import { HiOutlineTicket } from 'react-icons/hi';
import { MultiMintButton } from '../../components/NftBuyButton';
import useCandyMachineV3 from '../../hooks/useCandyMachineV3';
import { GatewayProvider } from '@civic/solana-gateway-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import {
  CustomCandyGuardMintSettings,
  NftPaymentMintSettings,
  ParsedPricesForUI,
} from '../../hooks/type';
import { guardToLimitUtil } from '../../hooks/utils';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Nft } from '@metaplex-foundation/js';
import { AlertState } from '../../alertUtils';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '../../styles/Event.module.css';
import DateCard from '../../components/DateCard';
import { dateConvertr } from '../../utils/dateConvertr';
import { getEventById } from '../../utils/controller/event';
import { CrossmintPayButton } from '@crossmint/client-sdk-react-ui';
import { network } from '../../config';

const Event = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [eventDets, setEvent] = useState<EventData>();
  const [imgSelected, setImgSelected] = useState('Ticket Image');
  const [eventstartdate, setStartDate] = useState<{ day; date; month; year; time }>();
  const [eventendate, setEndDate] = useState<{ day; date; month; year; time }>();
  const [salestartdate, setSaleStartDate] = useState<{ day; date; month; year; time }>();
  const [saleenddate, setSaleEndDate] = useState<{ day; date; month; year; time }>();

  const { connection } = useConnection();
  const wallet = useWallet();

  useEffect(() => {
    if (!eventId) return;
    getEventById(eventId).then((event: EventData) => {
      setEvent(event);
      setStartDate(dateConvertr(event['Start Event Datetime']));
      setEndDate(dateConvertr(event['End Event Datetime']));
    });
  }, [eventId]);

  const candyMachineV3 = useCandyMachineV3(eventDets?.candyMachineId || '');

  const [balance, setBalance] = useState<number>();
  const [mintedItems, setMintedItems] = useState<Nft[]>();

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: '',
    severity: undefined,
  });

  const { guards, guardStates, prices } = useMemo(() => {
    return {
      guards: candyMachineV3.guards.default || {},
      guardStates: candyMachineV3.guardStates.default || {
        isStarted: true,
        isEnded: false,
        isLimitReached: false,
        canPayFor: 10,
        messages: [],
        isWalletWhitelisted: true,
        hasGatekeeper: false,
      },
      prices: candyMachineV3.prices.default || {
        payment: [],
        burn: [],
        gate: [],
      },
    };
  }, [candyMachineV3.guards, candyMachineV3.guardStates, candyMachineV3.prices]);

  useEffect(() => {
    (async () => {
      if (wallet?.publicKey) {
        const balance = await connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, connection]);

  const totalPrice = prices.payment
    .filter(({ kind }) => kind === 'sol')
    .reduce((a, { price }) => a + price, 0);

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
            gate: guards
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
            severity: 'error',
          }),
        );
    },
    [candyMachineV3.mint, guards],
  );

  const CrossMint = () => {
    return (
      <CrossmintPayButton
        style={{ height: '40px' }}
        clientId="53789912-6a27-4034-8329-d0acb95e23da"
        mintConfig={{ type: 'candy-machine' }}
      />
    );
  };
  const BuyTicketButton = () => {
    return (
      <>
        {!guardStates.isStarted ? (
          <h1>
            You are not allowed to purchase ticket yet. Come back on <>{guards.startTime}</>
          </h1>
        ) : !wallet?.publicKey ? (
          <WalletMultiButton> Connect Wallet </WalletMultiButton>
        ) : (
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
                cluster={process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet"}
                options={{ autoShowModal: false }}
              >
                <MintButton gatekeeperNetwork={guards.gatekeeperNetwork} />
              </GatewayProvider>
            ) : (
              <MintButton />
            )}
          </>
        )}
      </>
    );
  };

  const MintButton = ({ gatekeeperNetwork }: { gatekeeperNetwork?: PublicKey }) => (
    <MultiMintButton
      candyMachine={candyMachineV3.candyMachine}
      gatekeeperNetwork={gatekeeperNetwork}
      isMinting={candyMachineV3.status.minting}
      setIsMinting={() => { }}
      isActive={!!candyMachineV3.items.remaining}
      isEnded={guardStates.isEnded}
      isSoldOut={!candyMachineV3.items.remaining}
      guardStates={guardStates}
      onMint={startMint}
      prices={prices}
    />
  );

  return eventDets == undefined ? (
    <>Skeleton</>
  ) : (
    <>
      <Header />
      <SimpleGrid columns={6} w="100%" padding="100px 15%" spacing="10px">
        <GridItem colSpan={6}>
          <HStack>
            <VStack w="75%" align="flex-start">
              <Heading size="lg">Event: {eventDets['Name of event']}</Heading>
              <Text color="blue">by {eventDets.Organizer}</Text>
              {eventstartdate && eventendate && (
                <Text>
                  {eventstartdate.day}, {eventstartdate.date} {eventstartdate.month}{' '}
                  {eventstartdate.year}, {eventstartdate.time} to {eventendate.day},{' '}
                  {eventendate.date} {eventendate.month} {eventendate.year}, {eventendate.time}
                </Text>
              )}
            </VStack>
            <Spacer />
            <Button
              bg="red"
              color="white"
              disabled={wallet?.publicKey?.toString() === eventDets.walletAddress}
              onClick={() => { }}
            >
              Delete
            </Button>
          </HStack>
        </GridItem>

        <GridItem colSpan={[6, 4]}>
          <Card direction="row" w="100%" boxShadow="1px 1px 24px rgba(30,30,30,0.1)">
            <CardBody>
              <Grid h="300px" templateColumns="repeat(4, 1fr)">
                <GridItem colSpan={3} h="100%" w="100%" overflow="hidden">
                  <Center h="100%">
                    <Image
                      alt="ticket"
                      alignSelf="center"
                      objectFit="cover"
                      src={eventDets[imgSelected]}
                    />
                  </Center>
                </GridItem>

                <Show above="sm">
                  <GridItem colSpan={1}>
                    <VStack h="100%" justifyContent="center">
                      <Center
                        w="120px"
                        h="120px"
                        onClick={() => setImgSelected('Ticket Image')}
                        border={
                          imgSelected == 'Ticket Image' ? '4px solid rgba(0,180,216,0.96)' : ''
                        }
                      >
                        <Image
                          alt="ticket"
                          boxSize="100px"
                          objectFit="contain"
                          src={eventDets['Ticket Image']}
                        />
                      </Center>
                      <Center
                        w="120px"
                        h="120px"
                        onClick={() => setImgSelected('Background Image')}
                        border={
                          imgSelected == 'Background Image' ? '4px solid rgba(0,180,216,0.96)' : ''
                        }
                      >
                        <Image alt="ticket" boxSize="100px" src={eventDets['Background Image']} />
                      </Center>
                    </VStack>
                  </GridItem>
                </Show>
              </Grid>
            </CardBody>
          </Card>

          <Card direction="row" w="100%" h="200px" boxShadow="1px 1px 24px rgba(30,30,30,0.1)">
            <CardBody>
              <VStack spacing="5px" align="flex-start">
                <Heading size="sm" textDecoration="underline">
                  Event Description
                </Heading>
                <Text>{eventDets['Event Description']}</Text>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem colSpan={[6, 2]}>
          <SimpleGrid columns={2} spacing="10px">
            <GridItem colSpan={1}>
              <Card minHeight="120px" w="100%" h="100%" boxShadow="1px 1px 24px rgba(30,30,30,0.1)">
                <VStack spacing="5px" w="100%" h="100%" justifyContent="center">
                  <Heading size="sm">Ticket Price</Heading>
                  <Divider />
                  <Flex h="20px">
                    <Image alt="ticket" fit="contain" src="/solana-sol-logo.png" />
                  </Flex>
                  <Text>{totalPrice > 0 ? totalPrice + ' sol' : 'FREE'}</Text>
                </VStack>
              </Card>
            </GridItem>

            <Show above="sm">
              <GridItem colSpan={1}>
                <Card
                  minHeight="120px"
                  padding="10%"
                  w="100%"
                  h="100%"
                  boxShadow="1px 1px 24px rgba(30,30,30,0.1)"
                >
                  <Center w="100%" h="100%">
                    <DateCard datestr={eventDets['Start Datetime']} fontsize="xs" />
                  </Center>
                </Card>
              </GridItem>
            </Show>

            <GridItem colSpan={[1, 2]}>
              <Card direction="row" w="100%" boxShadow="1px 1px 24px rgba(30,30,30,0.1)">
                <CardBody>
                  <VStack spacing="5px">
                    <Heading size="sm">Tickets Sold</Heading>
                    <Divider />
                    <HStack>
                      <HiOutlineTicket />
                      <Text>{`${candyMachineV3.items.redeemed}/${candyMachineV3.items.available}`}</Text>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem colSpan={2}>
              <Card direction="row" w="100%" boxShadow="1px 1px 24px rgba(30,30,30,0.1)">
                <CardBody>
                  <VStack spacing="5px" w="100%" h="100%">
                    <Text fontSize="xs">Get your ticket to the event!</Text>
                    <BuyTicketButton />
                    <Text fontSize="xs">or </Text>
                    <CrossMint />
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem colSpan={2}>
              <Card
                direction="row"
                w="100%"
                minHeight="250px"
                boxShadow="1px 1px 24px rgba(30,30,30,0.1)"
              >
                <CardBody>
                  <VStack spacing="5px" align="flex-start" h="100%">
                    <Heading size="sm">Location</Heading>
                    <Text fontSize="sm">{eventDets.Location}</Text>
                    <AspectRatio w="100%">
                      <iframe
                        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                          }&q=${eventDets.Location.replace(/\s/g, '+')}`}
                      />
                    </AspectRatio>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem colSpan={2}>
              <Card direction="row" w="100%" boxShadow="1px 1px 24px rgba(30,30,30,0.1)">
                <CardBody>
                  <VStack spacing="5px" align="flex-start">
                    <Heading fontSize="sm">Organisers Email</Heading>
                    <Text fontSize="sm">{eventDets['Organizers Email']}</Text>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
          </SimpleGrid>
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default Event;
