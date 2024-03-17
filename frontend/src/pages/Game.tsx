import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { updatePointsApi } from "../store/auth.api";

const Game = () => {
  const dispatch = useDispatch<ThunkDispatch<any, null, AnyAction>>();
  const [deck, setDeck] = useState<any[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [remainingCards, setRemainingCards] = useState<number>(5);
  const [defuseKit, setDefuseKit] = useState<number>(0);
  const [shuffleModalOpen, setShuffleModalOpen] = useState<boolean>(false);
  const [gameOverModalOpen, setGameOverModalOpen] = useState<boolean>(false);
  const [winner, setWinner] = useState<boolean>(false);
  const [userPoints, setUserPoints] = useState(0);
  useEffect(() => {
    if (!gameStarted) {
      startGame();
    }
  }, [gameStarted]);
  useEffect(() => {
    const points = localStorage.getItem("userPoints");
    const parsedPoints = points ? JSON.parse(points) : "";
    setUserPoints(Number(parsedPoints));
  }, []);
  const startGame = () => {
    const cardTypes = ["cat", "shuffle", "bomb", "defuse"];
    const initialDeck = Array.from({ length: 5 }, (_, index) => {
      const randomType =
        cardTypes[Math.floor(Math.random() * cardTypes.length)];
      return { id: index, type: randomType, drawn: false };
    });
    shuffleDeck(initialDeck);
    setDeck(initialDeck);
    setGameStarted(true);
    setGameOver(false);
    setRemainingCards(initialDeck.length);
  };

  const shuffleDeck = (deck: any[]) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  };
  console.log(userPoints);
  const drawCard = (index: number) => {
    if (!gameStarted || gameOver || deck[index].drawn) return;
    const updatedDeck = [...deck];
    const drawnCard = updatedDeck[index];
    drawnCard.drawn = true;
    updatedDeck[index] = drawnCard;
    let newPoints = userPoints;
    switch (drawnCard.type) {
      case "cat":
        break;
      case "shuffle":
        setShuffleModalOpen(true);
        return;
      case "bomb":
        if (defuseKit === 0) {
          setWinner(false);
          setGameOverModalOpen(true);
        } else setDefuseKit(defuseKit - 1);
        break;
      case "defuse":
        setDefuseKit(defuseKit + 1);
        break;
      default:
        break;
    }
    setDeck(updatedDeck);
    setRemainingCards((prevCount) => prevCount - 1);
    if (remainingCards === 1) {
      newPoints += 1;

      localStorage.setItem("userPoints", JSON.stringify(newPoints));

      setUserPoints(newPoints);

      dispatch(updatePointsApi(newPoints));
      setWinner(true);
      setGameOverModalOpen(true);
    }
  };

  const handleRestart = () => {
    setDefuseKit(0);
    closeModal();
    startGame();
  };

  const getCardImage = (type: string) => {
    switch (type) {
      case "cat":
        return "/cat-card.jpeg";
      case "shuffle":
        return "/shuffle-card.jpeg";
      case "bomb":
        return "/bomb-card.jpeg";
      case "defuse":
        return "/defuse-card.jpeg";
      default:
        return "";
    }
  };

  //   about card
  const getCardName = (type: string) => {
    switch (type) {
      case "cat":
        return "Cat Card";
      case "shuffle":
        return "Shuffle Card";
      case "bomb":
        return "Exploding Kitten";
      case "defuse":
        return "Defuse Card";
      default:
        return "";
    }
  };

  const getCardEmoji = (type: string) => {
    switch (type) {
      case "cat":
        return "😺";
      case "shuffle":
        return "🔀";
      case "bomb":
        return "💣";
      case "defuse":
        return "🙅‍♂️";
      default:
        return "";
    }
  };

  const getCardDescription = (type: string) => {
    switch (type) {
      case "cat":
        return "Harmless card.";
      case "shuffle":
        return "Reshuffle the deck.";
      case "bomb":
        return "Ends the game if not defused.";
      case "defuse":
        return "Defuse an Exploding Kitten.";
      default:
        return "";
    }
  };

  const closeModal = () => {
    setShuffleModalOpen(false);
    setGameOverModalOpen(false);
  };

  const renderCard = (card: any, index: number) => {
    return (
      <Box
        w={"18%"}
        key={index}
        rounded={"20px"}
        border={"1px solid"}
        m={2}
        onClick={() => drawCard(index)}
        cursor="pointer"
      >
        {card.drawn ? (
          <Box
            backgroundImage={`url(${getCardImage(card.type)})`}
            backgroundSize="cover"
            backgroundPosition="center"
            w={"18vw"}
            h={"50vh"}
            display={"flex"}
            flexDirection={"column"}
            rounded={"20px"}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              rounded={"20px 20px 0 0"}
              h={"50px"}
              backgroundColor={"white"}
            >
              <Text fontSize="lg">{getCardName(card.type)}</Text>{" "}
              <span role="img" aria-label="Emoji">
                {getCardEmoji(card.type)}{" "}
              </span>
            </Box>

            <Box
              rounded={"0 0 20px 20px"}
              h={"50px"}
              backgroundColor={"white"}
              marginTop={"auto"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text fontSize="md" textAlign={"center"}>
                {getCardDescription(card.type)}{" "}
              </Text>
            </Box>
          </Box>
        ) : (
          <Box
            backgroundImage="url('/back-card.jpeg')"
            backgroundSize="cover"
            backgroundPosition="center"
            w={"18.5vw"}
            h={"50vh"}
            display={"flex"}
            flexDirection={"column"}
            rounded={"20px"}
          ></Box>
        )}
      </Box>
    );
  };

  const restartGame = () => {
    setDefuseKit(0);
    startGame();
  };

  return (
    <Box
      backgroundImage="url('/game-bg.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      h="89.5vh"
      display="flex"
    >
      <Box>
        <Flex direction="column" alignItems="center" justify="center">
          <VStack spacing={4}>
            <Box display={"flex"} w={"100%"} justifyContent="space-between">
              {deck.map((card, index) => renderCard(card, index))}
            </Box>
            <Button
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
              onClick={restartGame}
              disabled={!gameOver}
            >
              Restart Game
            </Button>
            <Modal isOpen={shuffleModalOpen} onClose={closeModal}>
              <ModalOverlay />
              <ModalContent bg="white" borderRadius="xl" p={4}>
                <ModalHeader textAlign="center">Shuffle Card🔀</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                  textAlign="center"
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text fontSize="lg" mb={4}>
                    The deck has been reshuffled. Good luck!
                  </Text>
                  <Image src="/shuffle-icon.png" alt="Shuffle icon" w={"50%"} />
                  <Button
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
                    onClick={handleRestart}
                  >
                    Continue
                  </Button>
                </ModalBody>
              </ModalContent>
            </Modal>

            <Modal isOpen={gameOverModalOpen} onClose={closeModal}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader textAlign={"center"}>
                  {winner ? "Congratulations!" : "Game Over!"}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  {winner ? (
                    <>
                      <Text>You've successfully completed the game!</Text>
                      <Image src="/winning-icon.jpg" alt="Winner" />
                    </>
                  ) : (
                    <>
                      <Text>You hit an Exploding Kitten!</Text>
                      <Image src="/exploding-icon.png" alt="Loser" />
                    </>
                  )}
                  <Button
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
                    onClick={handleRestart}
                  >
                    Restart Game
                  </Button>
                </ModalBody>
              </ModalContent>
            </Modal>
            {gameOver && (
              <Text color="red">Game Over! You hit an Exploding Kitten!</Text>
            )}
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Game;
