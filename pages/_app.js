import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layouts/Main";
import Fonts from "../components/Fonts";
import theme from "../lib/theme";
import { AnimatePresence } from "framer-motion";
import { StoreProvider } from "../lib/Store";
function App({ Component, pageProps, router }) {
  return (
    <StoreProvider>
      <ChakraProvider theme={theme}>
        <Fonts />
        <Layout router={router}>
          <AnimatePresence exitBeforeEnter initial={true}>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
      </ChakraProvider>
    </StoreProvider>
  );
}

export default App;
