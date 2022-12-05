import { Box, Grid, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Searchbar from "../components/Searchbar";
require('typeface-monoton')

export default function Home() {
  return (
    <div className={styles.container}>
        <Box position={'sticky'} top={'0'}>
          
        </Box>
        <VStack spacing={-8}>
          <Grid h='350px' w='100%' justifyContent='center' alignItems='center' bgGradient="linear(to-t, green.200, teal.500)">
            <VStack>
              <Text fontSize={'60px'} fontFamily={'monoton'} color='white'> TicketAuth</Text>
              <Text fontSize={'25px'} color='white'>Buy or sell NFT tickets to anything!</Text>
            </VStack>
          </Grid>

          <Searchbar/>

          <Box h='300px' w='100%' bg='blue.200'/>
        </VStack>

        

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
