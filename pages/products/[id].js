import {
  Container,
  Heading,
  Stack,
  Text,
  Badge,
  SimpleGrid,
  Box,
  AspectRatio,
  Button,
  Image as ImageChakra,
} from "@chakra-ui/react";
import Layout from "../../components/layouts/Article";
import Product from "../../models/Product";
import dbConnect from "../../lib/dbConnect";
import { ProductGridItem, StoreGridItem } from "../../components/GridItem";
import Section from "../../components/Section";
import Image from "next/image";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../../lib/Store";
import { useRouter } from "next/router";

const ProductPage = ({ product }) => {
  const { dispatch } = useContext(Store);
  const router = useRouter();

  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product.slug}`);
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: 1 } });
    router.push("/cart");
  };

  return (
    <Layout title={product.name}>
      <Section>
        <Stack direction="row">
          <Box w="100%" position="relative">
            <AspectRatio ratio={1 / 1}>
              <ImageChakra
                borderColor="whiteAlpha.800"
                borderWidth={2}
                borderStyle="solid"
                boxSize="400px"
                display="inline-block"
                borderRadius="md"
                src={`/images/products/` + product.thumbnail}
                alt="Logo Image"
              />
            </AspectRatio>
          </Box>
          <Box w="100%" p={6}>
            <Stack spacing={14}>
              <Box>
                <Text mt={2} fontWeight="medium" fontSize={20}>
                  {product.name}
                </Text>
                <Text mt={2} fontWeight="medium" fontSize={14}>
                  Price: ${product.price}
                </Text>
                <Text mt={2} fontWeight="medium" fontSize={14}>
                  Rating: 0 out of 5 stars
                </Text>
                <Text mt={2} fontWeight="medium" fontSize={14}>
                  Description: A simple item.
                </Text>
              </Box>
              <Box w="100%" ml={10}>
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={addToCartHandler}
                  isFullWidth
                >
                  Add to cart
                </Button>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Section>
    </Layout>
  );
};

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps({ params }) {
  await dbConnect();
  const product = await Product.findOne({ slug: params.id }).lean();
  product._id = product._id.toString();
  return { props: { product } };
}

export default ProductPage;
