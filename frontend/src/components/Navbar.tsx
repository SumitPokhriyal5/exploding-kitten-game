import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  Image,
  Avatar,
} from "@chakra-ui/react";
import image from "/exploding-kitten-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { logoutApi } from "../store/auth.api";
import { RootState } from "../store/store";

const Navbar: React.FC = () => {
    const { user, loading } = useSelector((store : RootState) => store.authManager);
    const [token, setToken] = useState<string | undefined>(user?.token);
    const [parsedName, setParsedName] = useState<string | undefined>(user?.name);
  
    const dispatch = useDispatch<ThunkDispatch<any, null, AnyAction>>();
  
    useEffect(() => {
      const storedToken = localStorage.getItem("userToken") || "";
      const storedName = localStorage.getItem("username") || "";
      setToken(storedToken ? JSON.parse(storedToken) : user.token);
      setParsedName(storedName ? JSON.parse(storedName) : user);
    }, [loading]);




  const handleLogout = () => {
    dispatch(logoutApi());
  };

  return (
    <Box
      boxSizing="border-box"
      background="transparent"
      maxW="98vw"
      m="auto"
    >
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH="60px"
        py={{ base: 2 }}
        pr={{ base: 4 }}
        borderBottom={2}
        borderStyle="solid"
        borderColor={useColorModeValue("gray.200", "gray.900")}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={"30px"}
      >
        <Flex justify={{ base: "center", md: "center" }}>
          <Image src={image} w="60px" borderRadius="50%" />
        </Flex>

        <Flex gap={'20px'}>
            <Link to={'/'}>Home</Link>
            <Link to={'/leaderboard'}>LeaderBoard</Link>
        </Flex>
        {/* Render logout button if token exists */}
        {token && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify="flex-end"
            direction="row"
            spacing={6}
          >
            <Avatar name={parsedName} src="https://bit.ly/tioluwani-kolawole" />
            <Button
              variant="outline"
              colorScheme="red"
              onClick={handleLogout}
              fontWeight="bold"
            >
              Logout
            </Button>
          </Stack>
        )}
        {/* Render sign-in button if token does not exist */}
        {!token && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify="flex-end"
            direction="row"
            spacing={6}
          >
            <Link to={"/login"}>
              <Button fontSize="sm" fontWeight={400} colorScheme="green">
                Sign In
              </Button>
            </Link>
          </Stack>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
