import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { CreateEventFormData } from '../utils/dataInterfaces/eventInterfaces';
import { ImageInput } from './ImageInput';
import { DebounceSearch } from './Maps';

export const Tab1: React.FC<{
  data: CreateEventFormData;
  handleData: (type: string, value: string | number) => void;
}> = ({ data, handleData }) => {
  return (
    <VStack spacing={4} w="100%">
      <FormControl w="100%" isInvalid={data.EventName == ''}>
        <FormLabel>Event Name</FormLabel>
        <Input
          variant="flushed"
          placeholder="Event Name"
          type="text"
          value={data.EventName}
          onChange={(e) => handleData('EventName', e.currentTarget.value)}
          w="100%"
        />
        {data.EventName == '' && (
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

      <FormControl w="100%" isInvalid={data.StartEventDatetime == ''}>
        <FormLabel>Start Event Date & Time</FormLabel>
        <Input
          variant="flushed"
          type="datetime-local"
          value={data.StartEventDatetime}
          onChange={(e) => handleData('StartEventDatetime', e.currentTarget.value)}
        />
        {data.StartEventDatetime == '' && (
          <FormErrorMessage>Date is required.</FormErrorMessage>
        )}
      </FormControl>

      <FormControl w="100%" isInvalid={data.EndEventDatetime == ''}>
        <FormLabel>End Event Date & Time</FormLabel>
        <Input
          variant="flushed"
          type="datetime-local"
          value={data.EndEventDatetime}
          onChange={(e) => handleData('EndEventDatetime', e.currentTarget.value)}
        />
        {data.EndEventDatetime == '' && <FormErrorMessage>Date is required.</FormErrorMessage>}
      </FormControl>
    </VStack>
  );
};
export const Tab2: React.FC<{
  data: CreateEventFormData;
  handleData: (type: string, value: string | number) => void;
}> = ({ data, handleData }) => {
  return (
    <VStack w="100%">
      <FormControl w="100%" isInvalid={data.StartSaleDatetime == ''}>
        <FormLabel>Start Sale Date & Time</FormLabel>
        <Input
          variant="flushed"
          type="datetime-local"
          value={data.StartSaleDatetime}
          onChange={(e) => handleData('StartSaleDatetime', e.currentTarget.value)}
        />
        {data.StartSaleDatetime == '' && (
          <FormErrorMessage>Date is required.</FormErrorMessage>
        )}
      </FormControl>

      <FormControl w="100%" isInvalid={data.EndSaleDatetime == ''}>
        <FormLabel>End Sale Date & Time</FormLabel>
        <Input
          variant="flushed"
          type="datetime-local"
          value={data.EndSaleDatetime}
          onChange={(e) => handleData('EndSaleDatetime', e.currentTarget.value)}
        />
        {data.EndSaleDatetime == '' && <FormErrorMessage>Date is required.</FormErrorMessage>}
      </FormControl>

      <HStack w="100%" gap="20px">
        <FormControl w="100%" isInvalid={data.TicketPrice.toString() == ''}>
          <FormLabel>Ticket Price</FormLabel>
          <Input
            variant="flushed"
            placeholder="Ticket Price"
            type="number"
            value={data.TicketPrice}
            onChange={(e) => handleData('TicketPrice', e.currentTarget.value)}
            w="100%"
          />
          {data.TicketPrice.toString() == '' && (
            <FormErrorMessage>Enter the price of the ticket.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl w="100%" isInvalid={data.EventCapacity.toString() == ''}>
          <FormLabel>Capacity</FormLabel>
          <Input
            variant="flushed"
            placeholder="Event Capacity"
            type="number"
            value={data.EventCapacity}
            onChange={(e) => handleData('EventCapacity', e.currentTarget.value)}
            w="100%"
          />
          {data.EventCapacity.toString() && (
            <FormErrorMessage>Enter the number of available tickets.</FormErrorMessage>
          )}
        </FormControl>
      </HStack>

      <FormControl w="100%" isInvalid={data.OrganizersEmail == ''}>
        <FormLabel>Organizers Email</FormLabel>
        <Input
          variant="flushed"
          placeholder="Organiser email"
          type="email"
          value={data.OrganizersEmail}
          onChange={(e) => handleData('OrganizersEmail', e.currentTarget.value)}
          w="100%"
        />
        {data.OrganizersEmail == '' && (
          <FormErrorMessage>Enter your email for contact purposes</FormErrorMessage>
        )}
      </FormControl>

      <FormControl w="100%" isInvalid={data.WalletAddress == ''}>
        <FormLabel>Wallet Address:</FormLabel>
        <Button disabled={true}>{data.WalletAddress?data.WalletAddress:"No wallet connected"}</Button>
        {data.WalletAddress == '' && (
          <FormErrorMessage>Connect your wallet to create event!</FormErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
};

export const Tab3: React.FC<{
  data: CreateEventFormData;
  handleData: (type: string, value: string) => void;
}> = ({ data, handleData }) => {
  return (
    <VStack w="100%" align="flex-start">
      <FormControl isInvalid={data.EventDescription == ''}>
        <FormLabel>Event Description</FormLabel>
        <Textarea
          h="200px"
          value={data.EventDescription}
          onChange={(e) => handleData('EventDescription', e.currentTarget.value)}
          w="100%"
        />
        {data.EventDescription == '' && (
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

export const Tab4: React.FC<{
  data: CreateEventFormData;
  handleData: (type: string, value: string) => void;
  setTicketFile: (File) => void;
}> = ({ data, handleData, setTicketFile }) => {
  useEffect(() => {
    console.log('Ran');
  }, []);
  return (
    <SimpleGrid columns={2} w="100%" gap="10px">
      <GridItem colSpan={[2, 1]}>
        <VStack h="100%" w="100%" align="flex-start">
          <Heading size="md">Event Banner Image</Heading>
          <ImageInput
            data={data}
            setTicketFile={setTicketFile}
            handleData={handleData}
            imgtype="BackgroundImage"
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
            imgtype="TicketImage"
          />
        </VStack>
      </GridItem>

    </SimpleGrid>
  );
};
