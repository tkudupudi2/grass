import {
  Box,
  Grid,
  Heading,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Badge,
  Button,
  Select,
  HStack,
  AltertDialog,
  Flex,
} from "@chakra-ui/react";
import Layout from "../../components/layouts/Article";
import Section from "../../components/Section";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../lib/Store";
import axios from "axios";

const ShoppingCart = () => {
  const { state, dispatch } = useContext(Store);
  const [checkedOut, setCheckedOut] = useState(false);
  const {
    userInfo: { email },
    cart: { cartItems },
  } = state;
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const { userInfo } = state;
  useEffect(() => {
    if (!userInfo) {
      router.push(redirect || "/login");
    }
  }, []);

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const updateCartHandler = (item, quantity) => {
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const checkoutHandler = async () => {
    setCheckedOut(true);
    const { data } = await axios.post("/api/pantry", { email, cartItems });
  };

  return (
    <Layout title="Cart">
      <Section>
        <Heading as="h3" fontSize={20} mt={4} mb={8}>
          Shopping Cart
        </Heading>
        <Flex direction="row">
          {cartItems.length === 0 ? (
            <Box w="100%">
              Shopping Cart is empty. <NextLink href="/">Go back</NextLink>
            </Box>
          ) : (
            <Table variant="simple" w="100%">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Price</Th>
                  <Th>Quantity</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartItems.map((item) => (
                  <Tr>
                    <Td>{item.name}</Td>
                    <Td>{item.price}</Td>
                    <Td>
                      <Select
                        variant="flushed"
                        placeholder={1}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[1, 2, 3, 4, 5].map((option) => (
                          <option value={option}>{option}</option>
                        ))}
                      </Select>
                    </Td>
                    <Td isNumeric>
                      <Button onClick={() => removeItemHandler(item)}>x</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
          <Flex
            direction="column"
            ml={4}
            p={8}
            w="100%"
            borderWidth="1px"
            borderRadius="lg"
          >
            <Box h="100%">
              Subtotal (
              {cartItems.reduce((a, c) => a + parseInt(c.quantity), 0)} items) :
              $
              {cartItems.reduce(
                (a, c) => +(a + c.quantity * c.price).toFixed(2),
                0
              )}
            </Box>
            <Button colorScheme="green" onClick={checkoutHandler} isFullWidth>
              Add to cart
            </Button>
            {checkedOut ? (
              <Badge
                mt={2}
                textAlign="center"
                variant="outline"
                colorScheme="green"
                isFullWidth
              >
                Checked Out
              </Badge>
            ) : (
              <></>
            )}
            <Flex direction="column"></Flex>
          </Flex>
        </Flex>
      </Section>
    </Layout>
  );
};

export default ShoppingCart;
