import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Show,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export default function Searchbar() {
  return (
    <InputGroup
      h="64px"
      w="80%"
      bg="white"
      color="black"
      zIndex={3}
      padding="0 40px"
      borderRadius="40px"
      boxShadow="1px 5px 10px rgba(30,30,30,0.5)"
    >
      <Input
        w={['400px', '700px']}
        _placeholder={{ color: 'grey' }}
        variant="unstyled"
        placeholder="Search events..."
      />

      <Show above="lg">
        <InputGroup alignItems="center" gap="10px" w={'100%'}>
          <Text>From:</Text>
          <Input variant="unstyled" type="datetime-local" />
          <Text>to</Text>
          <Input variant="unstyled" type="datetime-local" />
        </InputGroup>
      </Show>

      <Show above="lg">
        <InputGroup w="100%">
          <InputLeftElement h="100%" pointerEvents="none">
            <Text>$</Text>
          </InputLeftElement>
          <Input
            _placeholder={{ color: 'grey' }}
            variant="unstyled"
            type="number"
            placeholder="Highest Price"
          />
        </InputGroup>
      </Show>

      <InputRightElement alignItems={'flex-end'} h="100%" w="150px">
        <Button
          h="100%"
          w="100%"
          bg="brand.4"
          borderRadius="40px"
          color="white"
          leftIcon={<SearchIcon />}
          // onClick={handleClick}
        >
          <Text>Search</Text>
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
