import { Container, Box, Heading, SimpleGrid, Divider } from "@chakra-ui/react";
import Section from "../../components/Section";
import { StoreGridItem } from "../../components/GridItem";
import Layout from "../../components/layouts/Article";
import { useState } from "react";
import dbConnect from "../../lib/dbConnect";
import Store from "../../models/Store";

const Stores = ({ stores }) => {
  const [cartItems, setCartItems] = useState([]);
  return (
    <Layout>
      <Container maxW="100%">
        <Heading as="h3" fontSize={20} mt={4} mb={8}>
          Grocery Delivery & Pickup
        </Heading>
        <SimpleGrid columns={[1, 1, 1]} gap={6}>
          {stores.map((store) => (
            <Section>
              <StoreGridItem
                id={store.slug}
                key={store._id}
                name={store.name}
                details={store.details}
                badges={store.badges}
                thumbnail={`/images/stores/` + store.thumbnail}
              />
            </Section>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Store.find({});
  const store = result.map((doc) => {
    const store = doc.toObject();
    store._id = store._id.toString();
    return store;
  });

  return { props: { stores: store } };
}

export default Stores;
