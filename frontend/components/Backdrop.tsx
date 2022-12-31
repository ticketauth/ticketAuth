import { Center, VStack } from '@chakra-ui/react';
import { css, keyframes } from '@emotion/react'
import React from 'react';

const waveBackground = keyframes`
0%{
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
`

const wavy = css({
  background: 'linear-gradient(-45deg, #00B4D8,#03045E,  #7B2CBF, #bf2c97)',
  backgroundSize: '400% 100%',
  animation: `${waveBackground} 10s ease infinite`,
})

export const Backdrop: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <Center
      w='100%'
    >
    <VStack 
      bg='blue' 
      h='350px' 
      w='100%' 
      justifyContent='center' 
      align='center' 
      css={wavy}
    >
      {children}
    </VStack>
    </Center>
  )
}

