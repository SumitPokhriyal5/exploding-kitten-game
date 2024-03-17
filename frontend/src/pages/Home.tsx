import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box
      backgroundImage="url('/home-bg.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      h="89.5vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box mt={"50vh"}>
        <Link to={'/game'}><Button
          px={6}
          fontSize={"lg"}
          rounded={"full"}
          bg={"blue.400"}
          color={"white"}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: "blue.500",
          }}
          _focus={{
            bg: "blue.500",
          }}
        >
          Start Game
        </Button></Link>
      </Box>
    </Box>
  );
};

export default Home;
