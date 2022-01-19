import Logo from "./Logo";
import NextLink from "next/link";
import {
  chakra,
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue,
  Badge,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import ThemeToggleButton from "./ThemeToggleButton";
import { AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import { Store } from "../lib/Store";
import { useContext } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const LinkItem = ({ href, path, children }) => {
  const active = path === href;
  const inactiveColor = useColorModeValue("gray200", "whiteAlpha");
  const activeColor = useColorModeValue("green.500", "green.200");
  return (
    <NextLink href={href}>
      <Link p={2} color={active ? activeColor : inactiveColor}>
        {children}
      </Link>
    </NextLink>
  );
};

const NavBar = (props) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { path } = props;
  const { userInfo } = state;
  const router = useRouter();
  const logoutHandler = () => {
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    router.push("/");
  };

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue("#ffffff40", "#1a202c80")}
      style={{ backdropFilter: "blur(10px)" }}
      zIndex={1}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Logo />
        </Flex>
        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems={"center"}
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/stores" path={path}>
            Stores
          </LinkItem>
          <LinkItem href="/sharing" path={path}>
            Sharing
          </LinkItem>
          <LinkItem href="/pantry" path={path}>
            Pantry
          </LinkItem>
        </Stack>
        <Box flex={2} align="right">
          {cart.cartItems.length > 0 ? (
            <>
              <NextLink href="/cart" passHref>
                <IconButton
                  isRound
                  variant="ghost"
                  size="md"
                  icon={<AiOutlineShoppingCart />}
                />
              </NextLink>
              <Badge>{cart.cartItems.length}</Badge>
            </>
          ) : (
            <NextLink href="/cart" passHref>
              <IconButton
                isRound
                variant="ghost"
                size="md"
                icon={<AiOutlineShoppingCart />}
              />
            </NextLink>
          )}

          <IconButton
            size="md"
            isRound
            variant="ghost"
            ml={2}
            icon={<AiOutlineMessage />}
          />
          {userInfo ? (
            <>
              <Button onClick={logoutHandler} ml={2} mr={2}>
                logout
              </Button>
            </>
          ) : (
            <LinkItem href="/login" path={path}>
              login
            </LinkItem>
          )}
          <ThemeToggleButton />
          <Box ml={2} display={{ base: "inline-block", md: "none" }}>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <NextLink href="/stores" passHref>
                  <MenuItem as={Link}>Stores</MenuItem>
                </NextLink>
                <NextLink href="/reccomender" passHref>
                  <MenuItem as={Link}>AI Reccomender</MenuItem>
                </NextLink>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NavBar;
