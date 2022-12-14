import { SearchIcon } from "@chakra-ui/icons";
import React, { useMemo } from "react";
import {Box, Input, VStack, InputRightAddon, Spinner, Text, InputRightElement, InputGroup, Flex, Icon, Center, Button } from "@chakra-ui/react";
import { useState } from "react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { HiLocationMarker } from "react-icons/hi";
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";

const ApiKey:string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export const DebounceSearch = () => {
  const {
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = useGoogle({
    apiKey: ApiKey,
  });
  const [value, setValue] = useState("");
  const [hidden, setHidden] = useState(false);
  const [location, setLocation] = useState<{lat:Number,lng:Number}>()
  const handleClick = (description:string) => {
    setValue(description);
    setHidden(true);
    Geocode.setApiKey(ApiKey);
    Geocode.fromAddress(description).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLocation({lat:lat,lng:lng})
        console.log(location)
      },
      (error) => {
        console.error(error);
      }
    );
  }
  return (
    <Flex>
    <VStack w='100%' spacing='0'>
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
        />
        <InputRightElement>{
          isPlacePredictionsLoading?
          <Spinner/>:
          <Button onClick={()=>window.open(location&&`/previewlocation?lat=${location.lat}&lng=${location.lng}`,'_blank')}><SearchIcon/></Button>
        }
        </InputRightElement>
      </InputGroup>
      
      <Box w='100%'>
        {!isPlacePredictionsLoading && !hidden &&
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
    </Flex>
  );
};

 const Marker = (props:any) => {
  const {text} = props;
  return (
    <HiLocationMarker size={20}/>
  )
}

const defaultMap =
  { 
    lat: 1.3542343864869617, 
    lng: 103.81999172489604 
  }

interface Coords 
{
  lat: number,
  lng: number
}

export const SimpleMap = ({lat,lng}:Coords) => {
  const MapInfo = useMemo(() => lat||lng?{lat,lng}:defaultMap, [lat,lng])
  return (
    // Important! Always set the container height explicitly
    <Box h='100%' w='100%'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: ApiKey }}
        center = {MapInfo}
        defaultZoom={14}
      >
        <Marker
          lat={MapInfo.lat}
          lng={MapInfo.lng}
          text="Event Location"
        />
      </GoogleMapReact>
    </Box>
  );
}
SimpleMap.defaultProps = defaultMap;