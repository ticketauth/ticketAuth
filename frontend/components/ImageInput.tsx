import { Box, Flex, Image, Input, useMultiStyleConfig, VStack } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { FormInputData } from "../utils/dataInterfaces";

const FileToUrl = (file:File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result?.toString() || '');
  reader.onerror = error => reject(error);
});

export const ImageInput:React.FC<{data:FormInputData,handleData:(type:string,value:string)=>void,imgtype:string}> = ({data,handleData,imgtype}) => {
  const styles = useMultiStyleConfig("Button", { variant: "outline" });
  const [previewImage, setPreviewImage] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    if (e.target.files){
      setPreviewImage(URL.createObjectURL(e.target.files[0]))
      FileToUrl(e.target.files[0])
      .then(fileurl=>fileurl.replace(/(\r\n|\n|\r)/gm, ""))
      .then(fileurl=>handleData(imgtype,fileurl))
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
      {previewImage!==""&&<Image fit='contain' src={previewImage}/>}
    </Flex>
    </VStack>
  );
};