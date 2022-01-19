import Image from "next/image";
import {
  Container,
  Heading,
  SimpleGrid,
  Divider,
  Text,
  Stack,
  Button,
  Input,
  Link,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image as ImageChakra,
  Box,
  ChakraProvider,
  Flex,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Spinner,
} from "@chakra-ui/react";
import Section from "../../components/Section";
//import { PantryCategoryGridItem, PantryFoodGridItem } from "../../components/GridItem";
import PantryModalGridItem from "../../components/GridItem";
import Layout from "../../components/layouts/Article";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../lib/Store";
import axios from "axios";
import Cookies from "js-cookie";

const Pantry = ({ pantry }) => {
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [isSeeded, setSeeded] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [userPantry, setPantry] = useState([]);
  const [filteredPantry, setFiltered] = useState([]);
  useEffect(() => {
    if (!userInfo) {
      router.push(redirect || "/login");
      return;
    }
    async function fetchUserPantry() {
      const { data } = await axios.get(`/api/pantry`, {
        params: { email: userInfo.email },
      });
      console.log(data);
      if (data) {
        setPantry(data.items.reverse());
      }
    }
    async function filterItems() {
      setFiltered({
        categories: [
          {
            name: "Meat",
            items: userPantry?.filter((item) => item.foodgroup === "meat"),
          },
          {
            name: "Fruits",
            items: userPantry?.filter((item) => item.foodgroup === "fruits"),
          },
          {
            name: "Dairy",
            items: userPantry?.filter((item) => item.foodgroup === "dairy"),
          },
          {
            name: "Fats & Oils",
            items: userPantry?.filter((item) => item.foodgroup === "fats_oils"),
          },
          {
            name: "Grains",
            items: userPantry?.filter((item) => item.foodgroup === "grains"),
          },
          {
            name: "Beverages",
            items: userPantry?.filter((item) => item.foodgroup === "beverages"),
          },
          {
            name: "Desserts",
            items: userPantry?.filter((item) => item.foodgroup === "desserts"),
          },
          {
            name: "Other",
            items: userPantry?.filter((item) => item.foodgroup === "other"),
          },
        ],
      });
      setLoading(false);
    }

    fetchUserPantry();
    filterItems();
    setSeeded(true);
  }, [isSeeded]);

  return (
    <Layout>
      <Container maxW="100%">
        <Heading as="h3" fontSize={20} mt={4} mb={8}>
          Grocery Pantry
        </Heading>
        {isLoading ? (
          <Spinner />
        ) : (
          <SimpleGrid columns={[1, 1, 1]} gap={4}>
            <Section>
              <Stack>
                <Text fontSize="lg">New Items</Text>
                <SimpleGrid columns={[3, null, 6]} spacingY="20px">
                  {userPantry?.map((item) => (
                    <PantryItem
                      name={item.name}
                      thumbnail={item.thumbnail}
                      quantity={item.quantity}
                    />
                  ))}
                </SimpleGrid>
              </Stack>
            </Section>
            <Divider />
            <Section>
              <Text fontSize="lg" paddingY="5px">
                Categories
              </Text>
              <Stack align="center">
                <SimpleGrid columns={(1, null, 2)} spacing={4} minW="100%">
                  {filteredPantry.categories.map((category) => {
                    //if (category.items) {
                    return (
                      <PantryCategoryGridItem
                        foodgroup={category.name}
                        items={category.items}
                      />
                    );
                    //}
                  })}
                </SimpleGrid>
              </Stack>
            </Section>
          </SimpleGrid>
        )}
      </Container>
    </Layout>
  );
};

export default Pantry;

export const PantryCategoryGridItem = ({ foodgroup, items }) => (
  <Flex
    align="center"
    w="100%"
    boxShadow="lg"
    borderWidth="1px"
    borderRadius="lg"
    p={4}
  >
    <VStack h="100%" w="100%" align="center">
      <Text fontSize="lg">{foodgroup}</Text>
      <SimpleGrid h="100%" columns={[2, 2, 2]} spacing="10px">
        {items ? (
          items.map((item) => (
            <PantryItem
              name={item.name}
              thumbnail={item.thumbnail}
              quantity={item.quantity}
            />
          ))
        ) : (
          <> </>
        )}
      </SimpleGrid>
    </VStack>
  </Flex>
);

function PantryItem({ name, thumbnail, quantity, condition }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState(0);
  const handleChange = (value) => setValue(value);

  return (
    <Box onClick={onOpen}>
      <ImageChakra
        borderColor="black"
        borderWidth={2}
        borderStyle="solid"
        boxSize="100px"
        borderRadius="full"
        src={`/images/products/` + thumbnail}
        alt="Logo Image"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Condition: Fresh</Text>
            <Flex>
              <NumberInput
                maxW="100px"
                mr="2rem"
                value={quantity}
                onChange={handleChange}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Slider
                flex="1"
                focusThumbOnChange={false}
                value={quantity}
                max={25}
                onChange={handleChange}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb fontSize="sm" boxSize="32px" children={value} />
              </Slider>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose} align="left">
              Save Changes
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Delete All
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
//Meat, Dairy
//Fruit, Vegetables
//Grains, Beverages
//Desserts, Oils/Fats
//Other

//todo
//change border color based on condition
