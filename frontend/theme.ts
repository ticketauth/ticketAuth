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

const styles = {
  global: {
    ".blur": {
      backgroundColor: 'RGBA(255, 255, 255, 0.16)',
      backdropFilter: 'blur(10px)'
    },
    ".backdrop": {
      background: 'radial-gradient(circle, rgba(123,44,191,1) 14%, rgba(0,180,216,1) 37%, rgba(1,95,157,1) 48%, rgba(3,4,94,1) 60%)',
      backgroundSize: '400% 400%',
      animation: 'gradient 5s ease infinite'
    },
    "Text": {
      fontFamily: 'Fantasy'
    }
  }
}

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ styles, colors, config })

export default theme