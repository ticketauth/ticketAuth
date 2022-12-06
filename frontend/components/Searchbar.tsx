import { Button, Input, InputGroup, InputLeftElement, InputRightElement, Text } from '@chakra-ui/react'
import { CalendarIcon,SearchIcon } from '@chakra-ui/icons'

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
			<InputGroup>
				<InputLeftElement
					h='100%'
					pointerEvents='none'
					children={<CalendarIcon color='gray.200' />}
				/>
				<Input variant='unstyled' placeholder='Pick a Date' />
			</InputGroup>
			<InputGroup>
				<InputLeftElement
					h='100%'
					pointerEvents='none'
					children={<Text>$</Text>}
				/>
				<Input variant='unstyled' placeholder='Price range' />
			</InputGroup>
			<InputRightElement alignItems={'flex-end'} h='100%' w='150px'>
				<Button 
					leftIcon={<SearchIcon/>}
					h='100%'
					w='100%'
					bg='green.700'
					borderRadius='40px'
					color='white'
					// onClick={handleClick}
				>
					Search
				</Button>
			</InputRightElement>
		</InputGroup>
	)
}