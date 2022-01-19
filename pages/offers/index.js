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
  HStack,
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
  useColorModeValue
} from "@chakra-ui/react";
import Section from "../../components/Section";
import { SharingGridItem } from "../../components/GridItem";
import Layout from "../../components/layouts/Article";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Offer from "../../models/Offer";
import dbConnect from "../../lib/dbConnect";

const Offers = ({ offers }) => {
  const [cartItems, setCartItems] = useState([]);
  const activeColor = useColorModeValue("green.500", "green.200");

  return (
    <Layout>
      <Container maxW="100%">
        <SimpleGrid columns={2}>
          <Heading as="h3" fontSize={20} mt={4} mb={8}>
            Food Offers
          </Heading>
        </SimpleGrid>
        <SimpleGrid columns={[1,null,2]} spacing="20px">
          {offers.map((offer) => (
            <OfferItem
              name={offer.name}
              quantity={offer.quantity}
              condition={offer.condition}
              offerzip={offer.offerzip}
              comment={offer.comment}
              thumbnail={`/images/products/` + offer.thumbnail}
              />
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Offer.find({});
  const offer = result.map((doc) => {
    const offer = doc.toObject();
    offer._id = offer._id.toString();
    return offer;
  });

  return { props: { offers: offer } };
}

export default Offers;

function OfferItem({ name, thumbnail, quantity, condition, offerzip, comment}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState(quantity);
  const handleChange = (value) => setValue(value);
  const activeColor = useColorModeValue("green.500", "green.200");

  return (
    <Flex
      align="center"
      w="100%"
      boxShadow="lg"
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      onClick={onOpen}
    >
      <HStack spacing="20px">
        <ImageChakra
          borderColor="whiteAlpha.800"
          borderWidth={2}
          borderStyle="solid"
          boxSize="100px"
          display="inline-block"
          borderRadius="full"
          src={thumbnail}
          alt="Logo Image"
        />
        <Box p={2}>
          <Text as="em">{name}, {condition}</Text>
          <Text>Quantity: {quantity}</Text>
          <Text>{offerzip}</Text>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{name}</ModalHeader>
            <ModalBody>
              <Text>Comment: {comment}</Text>
              <br />
              <Flex>
                <NumberInput
                  maxW="100px"
                  mr="2rem"
                  value={value}
                  onChange={handleChange}
                >
                  <NumberInputField />
                  
                </NumberInput>
                <Slider
                  flex="1"
                  focusThumbOnChange={false}
                  value={value}
                  max={quantity}
                  onChange={handleChange}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb color="black" fontSize="sm" boxSize="32px" children={value} />
                </Slider>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button backgroundColor={activeColor} color="black" mr={3} onClick={onClose} align="left">
                Accept
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack>
    </Flex>
  );
}
