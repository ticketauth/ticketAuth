// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    1: '#00B4D8',
    2: '#03045E',
    3: '#FF9100',
    4: '#7B2CBF',
  },
  
}

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

const theme = extendTheme({ colors, config })

export default theme