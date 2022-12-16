import { SearchIcon } from "@chakra-ui/icons";
import React, { useMemo } from "react";
import {Box, Input, VStack, InputRightAddon, Spinner, Text, InputRightElement, InputGroup, Flex, Icon, Center, Button, Stack, Spacer, AspectRatio } from "@chakra-ui/react";
import { useState } from "react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { HiLocationMarker } from "react-icons/hi";
import GoogleMapReact from 'google-map-react';
import { FormInputData } from "../utils/dataInterfaces";

const ApiKey:string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export const DebounceSearch:React.FC<{data:FormInputData,handleData:(type:string,value:any)=>void}> = ({data,handleData}) => {
  const {
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = (ApiKey!=='')?
  useGoogle({
    apiKey: ApiKey,
  }) :
  {placePredictions:[],getPlacePredictions:()=>{},isPlacePredictionsLoading:false}
  const [value, setValue] = useState("");
  const [hidden, setHidden] = useState(false);
  const handleClick = (description:string) => {
    setValue(description);
    setHidden(true);
    handleData("Location",value)
  }
  return (
    <Flex>
    <VStack w='100%'>
      <InputGroup>
        <Input
          style={{ color: "black" }}
          value={value}
          placeholder="Search location"
          onChange={(evt) => {
            getPlacePredictions({ input: evt.target.value });
            setValue(evt.target.value);
            setHidden(false);
          }}
          isInvalid={value==''}
        />
        <InputRightElement>{
          isPlacePredictionsLoading?
          <Spinner/>:
          <Button>
            <SearchIcon/>
          </Button>
        }
        </InputRightElement>
      </InputGroup>
      
      <Box w='100%'>
        {value==''?
        <Text color='red'>Event Location is required</Text> :
        !isPlacePredictionsLoading && !hidden &&
            placePredictions.map((item,key)=>
              <Box 
                borderWidth='2px' 
                overflow='hidden'
                padding='5px'
                key={key}
                cursor='pointer'
                onClick={()=>handleClick(item.description)}
              >{item.description}
              </Box >
            )
        }
      </Box>
    </VStack>

    <Spacer w='20px' bg='blue'/>

    <Stack w='100%'>
    {value&&
    <AspectRatio>
    <iframe 
      src={`https://www.google.com/maps/embed/v1/place?key=${ApiKey}&q=${value.replace(/\s/g, "+")}`}
    />
    </AspectRatio>
    }
    </Stack>
    </Flex>
  );
};

 const Marker = (props:any) => {
  const {text} = props;
  return (
    <HiLocationMarker size={20}/>
  )
}