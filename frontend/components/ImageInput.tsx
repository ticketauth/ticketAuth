import { Box, Flex, Image, Input, useMultiStyleConfig, VStack } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { FormInputData } from '../utils/dataInterfaces';

const FileToUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = (error) => reject(error);
  });

export const ImageInput: React.FC<{
  data: FormInputData;
  handleData: (type: string, value: string) => void;
  imgtype: string;
  setTicketFile: (File) => void;
}> = ({ data, handleData, imgtype, setTicketFile }) => {
  const styles = useMultiStyleConfig('Button', { variant: 'outline' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      imgtype == 'Ticket Image' && setTicketFile(e.target.files[0]);
      FileToUrl(e.target.files[0]).then((fileurl) => handleData(imgtype, fileurl));
    }
  };

  return (
    <VStack w="100%" h="100%" justifyContent="flex-start" border="4px dotted rgba(0,180,216,0.96)">
      <Input
        w="100%"
        h="10%"
        border=""
        accept=".jpg, .jpeg, .png"
        type="file"
        sx={{
          '::file-selector-button': {
            ...styles,
          },
        }}
        onChange={handleChange}
      />
      <Flex w="100%" h="300px">
        {data[imgtype] !== '' && <Image fit="contain" src={data[imgtype]} />}
      </Flex>
    </VStack>
  );
};
