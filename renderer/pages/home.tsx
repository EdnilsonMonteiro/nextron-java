import { ipcRenderer } from "electron";
import React, { useState } from "react";
import Head from "next/head";
import {
  Button,
  Input,
  VStack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";

export default function HomePage() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [sum, setSum] = useState<number | null>(null);

  const handleGetGreeting = async () => {
    const response = await window.ipc.invoke("sayHello", name);
    console.log("clicado");
    if (response.error) {
      console.error(response.error);
    } else {
      setGreeting(response.result);
    }
  };

  const handleAdd = async () => {
    const response = await window.ipc.invoke("sum", a, b);
    if (response.error) {
      console.error(response.error);
    } else {
      setSum(parseInt(response.result, 10));
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-chakra-ui)</title>
      </Head>
      <Container minHeight="100vh">
        <DarkModeSwitch />
        <Hero title={`⚡Electron⚡ + Next.js + Chakra UI = 🔥`} />
        <VStack spacing={4}>
          <Input
            placeholder="Enter your name, please"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button colorScheme="teal" onClick={handleGetGreeting}>
            Get Greeting
          </Button>
          {greeting && <Text>{greeting}</Text>}
          <Input
            placeholder="Enter first number, please"
            type="number"
            value={a !== null ? a : ''}
            onChange={(e) => setA(parseInt(e.target.value, 10))}
          />
          <Input
            placeholder="Enter second number, please"
            type="number"
            value={b !== null ? b : ''}
            onChange={(e) => setB(parseInt(e.target.value, 10))}
          />
          <Button colorScheme="teal" onClick={handleAdd}>
            Add Numbers
          </Button>
          {sum !== null && <Text>Sum: {sum}</Text>}
        </VStack>
        <Footer>
          <Button
            as={ChakraLink}
            href="/next"
            variant="solid"
            colorScheme="teal"
            rounded="button"
            width="full"
          >
            Go to next page
          </Button>
        </Footer>
      </Container>
    </React.Fragment>
  );
}
