import { Button, HStack, Input, InputGroup, InputLeftElement, InputRightAddon, InputRightElement, Spacer, Text } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export default function Searchbar(){
	return (
		<InputGroup
			h='64px'
			w='80%'
			bg='white'
			zIndex={3}
			padding='0 40px'
			borderRadius='40px'
			boxShadow='1px 5px 10px rgba(30,30,30,0.5)' 
		>
			<Input w='700px' variant='unstyled' placeholder='Search for your events..' />
			
			<HStack gap='10px'>
			<Text>From:</Text>
			<Input variant='unstyled' type="datetime-local" />
			<Text>to</Text>
			<Input variant='unstyled' type="datetime-local" />
			</HStack>

			<InputGroup>
				<InputLeftElement
					h='100%'
					pointerEvents='none'
				>
				<Text>$</Text>
				</InputLeftElement>
				<Input variant='unstyled' type='number' placeholder='Highest Price' />
			</InputGroup>
			
			<InputRightElement alignItems={'flex-end'} h='100%' w='150px'>
				<Button
					h='100%'
					w='100%'
					bg='green.700'
					borderRadius='40px'
					color='white'
					leftIcon={<SearchIcon/>}
					// onClick={handleClick}
				>					
					<Text>Search</Text>
				</Button>
			</InputRightElement>
		</InputGroup>
	)
}