import NextLink from "next/link";
import Image from "next/image";
import {
  Box,
  Text,
  LinkBox,
  LinkOverlay,
  Image as ImageChakra,
  Stack,
  Badge,
  Flex,
  IconButton,
  Heading,
  AspectRatio,
  Button,
  Spacer,
  Center,
  IdProvider,
  SimpleGrid,
  Link,
  HStack
} from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { AddIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { Store } from "../lib/Store";
import axios from "axios";

export const ProductGridItem = ({
  children,
  id,
  name,
  price,
  badges,
  thumbnail,
}) => {
  const { dispatch } = useContext(Store);

  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: "CART_ADD_ITEM", payload: { ...data, quantity: 1 } });
  };

  return (
    <Stack
      w="100%"
      h="100%"
      boxShadow="lg"
      borderWidth="1px"
      borderRadius="lg"
      p={2}
    >
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <ImageChakra
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            boxSize="100px"
            display="inline-block"
            borderRadius="md"
            src={thumbnail}
            alt="Logo Image"
          />
        </AspectRatio>
      </Box>

      <Stack>
        <NextLink href={`/products/${id}`}>
          <LinkBox cursor="pointer">
            <LinkOverlay href={`/products/${id}`}>
              <Stack>
                <Text mt={2} fontWeight="medium" fontSize={16}>
                  {name}
                </Text>
              </Stack>
              <Stack direction="row" mt={2}>
                {badges ? (
                  badges.map((badge) => (
                    <Badge variant="outline" colorScheme="green">
                      {badge}
                    </Badge>
                  ))
                ) : (
                  <></>
                )}
              </Stack>
            </LinkOverlay>
          </LinkBox>
        </NextLink>
      </Stack>
      <Spacer />
      <Stack justifyContent="center" direction="row">
        <Flex>
          <Center>
            <Text mt={1} fontSize={12}>
              {price.toString().includes(".") ? `$${price}` : `$${price}.00`}
            </Text>
          </Center>
        </Flex>
        <Button
          size="sm"
          colorScheme="green"
          onClick={addToCartHandler}
          isFullWidth
        >
          Add to cart
        </Button>
      </Stack>
    </Stack>
  );
};

export const StoreGridItem = ({
  children,
  id,
  name,
  details,
  badges,
  thumbnail,
}) => (
  <Flex
    align="center"
    w="100%"
    boxShadow="lg"
    borderWidth="1px"
    borderRadius="lg"
    p={4}
  >
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

    <Box p={6}>
      <NextLink href={`/stores/${id}`}>
        <LinkBox cursor="pointer">
          <LinkOverlay href={`/stores/${id}`}>
            <Text mt={2} fontWeight="bold" fontSize={16}>
              {name}
            </Text>
            <Text mt={1} fontWeight="bold" fontSize={10}>
              {details}
            </Text>
            <Stack direction="row" mt={2}>
              {badges ? (
                badges.map((badge) => (
                  <Badge variant="outline" colorScheme="green">
                    {badge}
                  </Badge>
                ))
              ) : (
                <></>
              )}
            </Stack>
          </LinkOverlay>
        </LinkBox>
      </NextLink>
    </Box>
  </Flex>
);

export const FoodBankGridItem = ({ name, link, location, directions, color }) => (
  <Flex
    align="center"
    w="100%"
    boxShadow="lg"
    borderWidth="1px"
    borderRadius="lg"
    p={2}
  >
    <Box p={2}>
      <Link color={color} href={link} target="_blank" >{name}</Link>
      <Text>{location}</Text>
      <Link color={color} href={directions} target="_blank" >Get Directions</Link>
    </Box>
  </Flex>
);

export const SharingGridItem = ({ thumbnail, name, condition, zipcode}) => (
  <Flex
    align="center"
    w="100%"
    boxShadow="lg"
    borderWidth="1px"
    borderRadius="lg"
    p={4}
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
        <Text as="em">{name}</Text>
        <Text>{condition}</Text>
        <Text>{zipcode}</Text>
      </Box>
    </HStack>
  </Flex>
);

export const GridItemStyle = () => (
  <Global
    styles={`
  .grid-item-thumbnail {
    border-radius: 12px;
  }`}
  />
);
