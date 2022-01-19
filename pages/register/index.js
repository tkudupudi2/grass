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

export default function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
  if (userInfo) {
    router.push(redirect || '/');
  }
  }, []);

  const submitHandler = async ({ name, email, zipcode, password, confirmPassword }) => {
    var re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!re.test(email)) {
      alert("Invalid Email");
      return;
    }
    if (zipcode.length != 5) {
      alert("Invalid zipcode");
      return;
    }
    if (password != confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if ((password.length < 8) && (confirmPassword.length < 8)) {
      alert("Password must be at least 8 characters");
      return;
    }
    try {
      const { data } = await axios.post('/api/users/register', { name, email, zipcode, password });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
    } catch (err) {
      alert (err.response.data?err.response.data.message: err.message);
    }
  };

  return (
    <Layout title="Register">
      <form onSubmit={handleSubmit(submitHandler)}>
        <Heading as="h3" fontSize={20} mt={4} mb={8}>
          Register
        </Heading>
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  id="name"
                  placeholder="Name"
                  {...field}
                ></Input>
              )}
            ></Controller>
          </ListItem>
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
              name="zipcode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  id="zipcode"
                  placeholder="Zipcode"
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
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  {...field}
                ></Input>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button colorScheme="green" type="submit" isFullWidth>
              Register
            </Button>
          </ListItem>
          <ListItem>
            Already have an account? &nbsp;
            <NextLink href={`/login?redirect=${redirect || "/"}`} passHref>
              Login
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}