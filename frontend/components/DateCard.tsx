import { AspectRatio, Box, IconButton, Text, useColorMode, VStack } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const DateCard = ({datestr='2022-12-16T12:57',fontsize=''}) => {
  const curdate = new Date(datestr+'Z')
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return (
    <AspectRatio w='100%' ratio={1}>
    <VStack borderRadius='100%' border='3px solid #00B4D8'>
      <Text fontSize={fontsize}>{months[curdate.getMonth()]}</Text>
      <Text fontSize={fontsize}>{curdate.getDate()}</Text>
    </VStack>
    </AspectRatio>
  )
}
export default DateCard;