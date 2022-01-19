import { Container, useColorModeValue } from "@chakra-ui/react";
import { Box, Heading, Image, Button } from "@chakra-ui/react";
import Section from "../components/Section";
import Layout from "../components/layouts/Article";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import NoSsr from "../components/NoSsr";
import VoxelFood from "../components/VoxelFood";

const Page = () => {
  return (
    <Layout>
      <NoSsr>
        <VoxelFood />
      </NoSsr>
      <Container>
        <Box
          borderRadius="lg"
          bg={useColorModeValue("blackAlpha.100", "#2c313d20")}
          p={3}
          mb={6}
          align="center"
        >
          Welcome to Grass, the AIO grocery assistant.
        </Box>

        <Box display={{ md: "flex" }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Introduction
            </Heading>
          </Box>
        </Box>
        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            About us
          </Heading>
          <p>
            Grass is all in one platform for nutritional awareness, food
            delivery, and hunger-relief. The application aims to help reduce
            food insecurity and waste.
          </p>
          <Box align="center" my={4}>
            <NextLink href="/stores">
              <Button
                colorScheme="green"
                mr={4}
                rightIcon={<ChevronRightIcon />}
              >
                Order Now
              </Button>
            </NextLink>
            <NextLink href="/stores">
              <Button colorScheme="green">Learn More</Button>
            </NextLink>
          </Box>
        </Section>
      </Container>
    </Layout>
  );
};

export default Page;
