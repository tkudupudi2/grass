import { List, ListItem } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useContext, useEffect } from "react";
import Layout from "../../components/layouts/Article";
import { Store } from "../../lib/Store";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { Heading, Input, Button } from "@chakra-ui/react";

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push(redirect || '/');
    }
  }, []);

  const submitHandler = async ({ email, password }) => {
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
    } catch (err) {
      alert (err.response.data?err.response.data.message: err.message);
    }
    
  };

  return (
    <Layout title="Login">
      <form onSubmit={handleSubmit(submitHandler)}>
        <Heading as="h3" fontSize={20} mt={4} mb={8}>
          Login
        </Heading>
        <List>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  id="email"
                  placeholder="Email"
                  {...field}
                ></Input>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  {...field}
                ></Input>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button colorScheme="green" type="submit" isFullWidth>
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don&apos;t have an account? &nbsp;
            <NextLink href={`/register?redirect=${redirect || "/"}`} passHref>
              Register
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
