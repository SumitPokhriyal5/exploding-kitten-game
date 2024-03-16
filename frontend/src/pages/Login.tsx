import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  InputRightElement,
  InputGroup,
  Center,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import '../styles/auth.css';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import logo from "/exploding-kitten-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { signinApi } from "../store/auth.api";
import { IUserLogin } from "../types/auth.types";

const Login = () => {
  const { loading } = useSelector((store : RootState) => store.authManager);
  const dispatch = useDispatch<ThunkDispatch<any, null, AnyAction>>()
  const navigate = useNavigate();



  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handleLogin: () => Promise<void> = async () => {
    const userData : IUserLogin = {
      email,
      password: pwd
 }

 dispatch(signinApi(userData , navigate))
  };

  const signInWithGoogle = () => {
    // setLoad(true);
  };

  return (
        <Box className="container">
          <Box className="left_col">
            <Box display={"flex"} flexDirection="column" gap={"10px"}>
              <Heading>Login</Heading>
              <Text color={"#d7d8dc"} fontWeight="500">
                Get access to a wealth of resources, personalized support, and a
                strong community to help you on your entrepreneurial journey.
              </Text>
            </Box>
            <Box display="grid" alignItems={"end"} justifyContent={"center"}>
              <Image src={logo} />
            </Box>
          </Box>

          {/* right side */}
          <Box className="right_col">
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent="space-between"
              gap="20px"
              p={"20px 40px"}
            >
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Box
                  mt="10px"
                  color={"blue.500"}
                  cursor="pointer"
                >
                  <Text _hover={{ textDecoration: "underline" }}>
                    Forgot your Password?
                  </Text>
                </Box>
              </FormControl>
              <Stack spacing={6}>
                <Box>
                  <Button
                    w={"100%"}
                    onClick={handleLogin}
                    isLoading={loading}
                    loadingText="Logging in..."
                    colorScheme={"green"}
                    variant={"solid"}
                  >
                    Login
                  </Button>
                </Box>
              </Stack>
              <Center>or</Center>
              <Center>
                <Button
                  w={"full"}
                  maxW={"md"}
                  variant={"outline"}
                  leftIcon={<FcGoogle />}
                  onClick={signInWithGoogle}
                >
                  <Center>
                    <Text>Sign in with Google</Text>
                  </Center>
                </Button>
              </Center>
              <Box
                mt={"60px"}
                color={"blue.500"}
                display={["grid", "grid", "flex"]}
                gap={1}
                justifyContent="center"
              >
                <Text color={"black"}>New to Exploding Kittens?</Text>
                <Text
                  _hover={{ textDecoration: "underline" }}
                  cursor={'pointer'}
                >
                  Create an account
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
  );
};

export default Login;