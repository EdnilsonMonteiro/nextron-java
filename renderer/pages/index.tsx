// pages/index.js
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Link as ChakraLink } from "@chakra-ui/react";

import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";

export default function HomePage() {

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-chakra-ui)</title>
      </Head>
      <Container minHeight="100vh">
        <DarkModeSwitch />
        <Hero title={`⚡Electron⚡ + Next.js + Chakra UI = 🔥`} />
        <Footer>
          <Button
            variant="solid"
            colorScheme="teal"
            rounded="button"
            width="full"
          >
            Capture Fingerprint
          </Button>
        </Footer>
      </Container>
    </React.Fragment>
  );
}
