import React from "react";
import { SimpleMap } from "../components/Maps";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";


export default function map(){
  const router = useRouter()
  const {lat,lng} = router.query;
  return (
    <Box h='100vh'>
    <SimpleMap lat={Number(lat)} lng={Number(lng)}/>
    </Box>
  );
}