import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";
import NavBar from "../NavBar";
import { useState } from "react";
import Footer from "../Footer";

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Grass - Grocery Assistant</title>
      </Head>
      <NavBar path={router.asPath} />
      <Container maxW="3xl" pt={14}>
        {children}
      </Container>
    </Box>
  );
};

export default Main;
