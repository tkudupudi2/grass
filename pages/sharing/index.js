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
} from "@chakra-ui/react";import Section from "../../components/Section";
import { FoodBankGridItem, SharingGridItem } from "../../components/GridItem";
import Layout from "../../components/layouts/Article";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Store } from "../../lib/Store";
import Offer from "../../models/Offer";
import dbConnect from "../../lib/dbConnect";


const Sharing = ({ sharing, localOffers }) => {
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const activeColor = useColorModeValue("green.500", "green.200");
  useEffect(() => {
    if (!userInfo) {
      router.push(redirect || '/login');
    }
  }, []);
  return (
    <Layout>
      <Container maxW="100%">
        <SimpleGrid columns={2}>
          <Heading as="h3" fontSize={20} mt={4} mb={8}>
            Grocery Sharing
          </Heading>
          <Heading as="h4" fontSize={20} mt={4} mb={8} align="right">
            ZIP Code: 95112
          </Heading>
        </SimpleGrid>
        <SimpleGrid columns={[1, 1, 1]} gap={4}>
          <Section> 
            <Stack spacing={4}>
              <Text fontSize="lg">Local Food Banks</Text>
              <SimpleGrid columns={[1,null,2]} spacing="20px">
                <FoodBankGridItem 
                  name="Spartan Food Pantry"
                  link="http://www.sjsu.edu/spartanfoodpantry"
                  location="211 S 9th St, San Jose, CA 95112"
                  directions="https://goo.gl/maps/SqHu382RPxLSGo5VA"
                  color={activeColor}
                />
                <FoodBankGridItem 
                  name="Second Harvest of Silicon Valley"
                  link="http://www.shfb.org/"
                  location="4001 N 1st St, San Jose, CA 95134"
                  directions="https://goo.gl/maps/edLy4VLCb9QDtVHy7"
                  color={activeColor}
                />
                <FoodBankGridItem 
                  name="Second Harvest of Silicon Valley"
                  link="http://www.shfb.org/"
                  location="750 Curtner Ave, San Jose, CA 95125"
                  directions="https://goo.gl/maps/Tj6LYS56ZVn3Nga59"
                  color={activeColor}
                />
                <FoodBankGridItem 
                  name="South Valley FISH Food Pantry"
                  link="http://svfish.org/"
                  location="5100 Camden Ave, San Jose, CA 95124"
                  directions="https://goo.gl/maps/XtvY9SRQrKMDKVbj6"
                  color={activeColor}
                />
              </SimpleGrid>
            </Stack>
          </Section>
          <Divider/>
          <Section>
            <Stack spacing={4}>
              <Text fontSize="lg">Offer Food Items</Text>
              <Input placeHolder="Food Item" />
              <Input placeHolder="Comment" />
              <SimpleGrid columns={2} spacing="10px">
                <Select placeholder="(Select Condition)">
                  <option value="option1">Perfect</option>
                  <option value="option2">Nearing Expiry</option>
                  <option value="option3">About to Expire</option>
                  <option value="option4">Non Perishable</option>
                </Select>
                <Button backgroundColor={activeColor} color="black" size="md">Send</Button>
               </SimpleGrid> 
            </Stack>
          </Section>
          <Divider />
          <Section>
            <Stack>
              <SimpleGrid columns={2} >
                <Text fontSize="lg">Local Food Offers</Text>
                <Link color={activeColor} href="../offers" align="right">View More</Link>
              </SimpleGrid>
              <SimpleGrid columns={[1,null,2]} spacing="20px">
                {localOffers.map((offer) => (
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
            </Stack>
          </Section>
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

  return { props: { localOffers: offer } };
}

export default Sharing;


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