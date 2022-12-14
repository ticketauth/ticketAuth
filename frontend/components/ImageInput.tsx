import { Box, Flex, Image, Input, InputProps, useMultiStyleConfig, VStack } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

const FileToUrl = (file:File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result?.toString() || '');
  reader.onerror = error => reject(error);
});

export const ImageInput = (props: InputProps) => {
  const styles = useMultiStyleConfig("Button", { variant: "outline" });
  const [imageurl,setImageUrl] = useState<string>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    if (e.target.files){
      FileToUrl(e.target.files[0])
      .then(fileurl=>fileurl.replace(/(\r\n|\n|\r)/gm, ""))
      .then(fileurl=>setImageUrl(fileurl))
    }
  }
  return (
    <VStack w='100%' h='100%' justifyContent='flex-start' border='4px dotted rgba(0,180,216,0.96)'>
    <Input
      w='100%'
      h='10%'
      border=''
      accept=".jpg, .jpeg, .png"
      type="file"
      sx={{
        "::file-selector-button": {
          ...styles,
        },
      }}
      onChange={handleChange}
    />
    <Flex w='100%' h='90%'>
      {imageurl&&<Image fit='contain' src={imageurl}/>}
    </Flex>
    </VStack>
  );
};