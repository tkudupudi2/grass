import {
  Container,
  Heading,
  Stack,
  Text,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import Layout from "../../components/layouts/Article";
import Store from "../../models/Store";
import Product from "../../models/Product";
import dbConnect from "../../lib/dbConnect";
import { ProductGridItem, StoreGridItem } from "../../components/GridItem";
import Section from "../../components/Section";
import Image from "next/image";

const Storefront = ({ store, products }) => {
  return (
    <Layout title={store.name}>
      <Container maxW="100%">
        <StoreGridItem
          id={store.slug}
          key={store._id}
          name={store.name}
          thumbnail={`/images/stores/` + store.thumbnail}
        />

        <Text mt={4} fontWeight="bold" fontSize={10}>
          {store.details}
        </Text>
        <Stack direction="row" mt={2} mb={4}>
          {store.badges ? (
            store.badges.map((badge) => (
              <Badge variant="outline" colorScheme="green">
                {badge}
              </Badge>
            ))
          ) : (
            <></>
          )}
        </Stack>
        <SimpleGrid columns={[2, 3, 3]} gap={4}>
          {products ? (
            products.map((product) => (
              <Section>
                <ProductGridItem
                  id={product.slug}
                  key={product._id}
                  name={product.name}
                  price={product.price}
                  badges={product.badges}
                  thumbnail={`/images/products/` + product.thumbnail}
                />
              </Section>
            ))
          ) : (
            <></>
          )}
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const store = await Store.findOne({ slug: params.id }).lean();
  store._id = store._id.toString();
  const result = await Product.find({ storeName: store.name }).lean();
  const products = result.map((product) => {
    product._id = product._id.toString();
    return product;
  });
  return { props: { store, products } };
}

export default Storefront;
