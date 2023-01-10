import { AspectRatio, Box, IconButton, Text, useColorMode, VStack } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { dateConvertr } from '../utils/dateConvertr';

const DateCard = ({ datestr = '2022-12-16T12:57', fontsize = '' }) => {
  const curdate = dateConvertr(datestr);
  return (
    <AspectRatio w="100%" ratio={1}>
      <VStack borderRadius="100%" border="3px solid #00B4D8">
        <Text fontSize={fontsize}>{curdate.month}</Text>
        <Text fontSize={fontsize}>{curdate.date}</Text>
      </VStack>
    </AspectRatio>
  );
};
export default DateCard;
