// pages/index.js
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button, Link as ChakraLink } from "@chakra-ui/react";

import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";

export default function HomePage() {
  const [fingerprint, setFingerprint] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.api.onFingerprintCaptured((data) => {
      setFingerprint(data);
    });
    window.api.onFingerprintError((error) => {
      setError(error);
    });
  }, []);

  const captureFingerprint = () => {
    window.api.captureFingerprint();
  };

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-chakra-ui)</title>
      </Head>
      <Container minHeight="100vh">
        <DarkModeSwitch />
        <Image
          src="/images/logo.png"
          alt="Logo image"
          width={200}
          height={200}
        />
        <Hero title={`⚡Electron⚡ + Next.js + Chakra UI = 🔥`} />
        <Footer>
          <Button
            onClick={captureFingerprint}
            variant="solid"
            colorScheme="teal"
            rounded="button"
            width="full"
          >
            Capture Fingerprint
          </Button>
          {fingerprint && <pre>{JSON.stringify(fingerprint, null, 2)}</pre>}
          {error && <pre>Error: {error}</pre>}
        </Footer>
      </Container>
    </React.Fragment>
  );
}
