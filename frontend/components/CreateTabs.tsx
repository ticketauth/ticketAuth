import {
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
import { FormInputData } from '../utils/dataInterfaces';
import { ImageInput } from './ImageInput';
import { DebounceSearch } from './Maps';

export const Tab1: React.FC<{
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
export const Tab2: React.FC<{
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

      <HStack w="100%" gap="20px">
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

export const Tab3: React.FC<{
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

export const Tab4: React.FC<{
  data: FormInputData;
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
