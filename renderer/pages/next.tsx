import React from 'react'
import Head from 'next/head'
import { Button, Link as ChakraLink } from '@chakra-ui/react'

import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'

export default function NextPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Next - Nextron (with-chakra-ui)</title>
      </Head>
      <Container minHeight="100vh">
        <DarkModeSwitch />
        <Hero title={`⚡ Nextron ⚡`} />
        <Footer>
          <Button
            as={ChakraLink}
            href="/home"
            variant="outline"
            colorScheme="teal"
            rounded="button"
            width="full"
          >
            Go to home page
          </Button>
        </Footer>
      </Container>
    </React.Fragment>
  )
}
