# Exploding Kitten Game

## Overview
This is an online single-player card game built using React and Vite. The game consists of 4 different types of cards:

- Cat card 😼
- Defuse card 🙅‍♂️
- Shuffle card 🔀
- Exploding kitten card 💣

The objective of the game is for the player to draw all 5 cards from the deck without drawing an exploding kitten card. 

## How to Play
1. Once the game starts, a deck of 5 cards is generated randomly.
2. Click on the deck to draw a card.
3. If the card drawn is a cat card, it is removed from the deck.
4. If the card drawn is an exploding kitten card, the player loses the game.
5. If the card drawn is a defuse card, it is removed from the deck and can be used to defuse one bomb that may come in subsequent cards.
6. If the card drawn is a shuffle card, the game is restarted, and the deck is filled with 5 cards again.
7. Continue drawing cards until all 5 cards are drawn from the deck or an exploding kitten card is drawn.

## Rules
- Cat card 😼: Removed from the deck.
- Exploding kitten card 💣: Player loses the game.
- Defuse card 🙅‍♂️: Removed from the deck and can be used to defuse one bomb.
- Shuffle card 🔀: Restarts the game and refills the deck with 5 cards.

## Frontend Dependencies

### Dependencies

- **@chakra-ui/icons** (^2.1.1) - Icon library for Chakra UI.
- **@chakra-ui/react** (^2.8.2) - Component library for React applications with Chakra UI.
- **@emotion/react** (^11.11.4) - Emotion library for React components.
- **@emotion/styled** (^11.11.0) - Emotion library for styled components.
- **@reduxjs/toolkit** (^2.2.1) - Redux toolkit for efficient Redux development.
- **framer-motion** (^11.0.14) - Library for creating animations in React applications.
- **react** (^18.2.0) - JavaScript library for building user interfaces.
- **react-dom** (^18.2.0) - React package for working with the DOM.
- **react-icons** (^5.0.1) - Library for popular icon packs as React components.
- **react-redux** (^9.1.0) - Official React bindings for Redux.
- **react-router-dom** (^6.22.3) - React router library for navigation in React applications.
- **react-toastify** (^10.0.5) - Notification library for React applications.
- **redux** (^5.0.1) - State management library for JavaScript applications.
- **redux-thunk** (^3.1.0) - Thunk middleware for Redux.

### Development Dependencies

- **@types/react** (^18.2.64) - Type definitions for React.
- **@types/react-dom** (^18.2.21) - Type definitions for React DOM.
- **@typescript-eslint/eslint-plugin** (^7.1.1) - ESLint plugin for TypeScript.
- **@typescript-eslint/parser** (^7.1.1) - ESLint parser for TypeScript.
- **@vitejs/plugin-react** (^4.2.1) - Vite plugin for React support.
- **eslint** (^8.57.0) - JavaScript and TypeScript linter.
- **eslint-plugin-react-hooks** (^4.6.0) - ESLint plugin for React hooks.
- **eslint-plugin-react-refresh** (^0.4.5) - ESLint plugin for React Refresh.
- **typescript** (^5.2.2) - Typed superset of JavaScript.
- **vite** (^5.1.6) - Next-generation front-end tooling.

## Backend Dependencies

### Dependencies

- **bcrypt** (^5.1.1) - Library for hashing passwords securely.
- **cors** (^2.8.5) - Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js.
- **dotenv** (^16.4.5) - Module for loading environment variables from a .env file.
- **express** (^4.18.3) - Web framework for Node.js used for building APIs.
- **jsonwebtoken** (^9.0.2) - Library for generating and verifying JSON Web Tokens (JWT) for authentication.
- **mongoose** (^8.2.2) - MongoDB object modeling library for Node.js.
- **nodemon** (^3.1.0) - Utility that automatically restarts the Node.js server when files change.

## How to Run
1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the development server.

## API Routes

The following table lists the available user-related API routes and their descriptions:

| Route             | Method | Description                                          |
|-------------------|--------|------------------------------------------------------|
| /                 | GET    | Retrieves information about all users                |
| /register         | POST   | Registers a new user                                 |
| /login            | POST   | Authenticates and logs in a user                     |
| /updatePoints     | PUT    | Updates the points of a user (authentication required)|

## Screenshots
### Login Page
![login](https://github.com/SumitPokhriyal5/exploding-kitten-game/assets/112632728/474da5ea-f3f7-43f0-91e9-0e805b4b8498)

### Signup Page
![signup](https://github.com/SumitPokhriyal5/exploding-kitten-game/assets/112632728/ae87c8de-ffb8-4f83-b8e0-d9dc4c9d9ab3)

### Home Page
![home](https://github.com/SumitPokhriyal5/exploding-kitten-game/assets/112632728/61c6c558-3f68-40b3-bf36-5b10e1ceea4e)

### Game Page
![game-win](https://github.com/SumitPokhriyal5/exploding-kitten-game/assets/112632728/fcb2ab7f-9aff-4f38-a6c2-e8844a1840c6)
![game-all-drawn](https://github.com/SumitPokhriyal5/exploding-kitten-game/assets/112632728/92a1ac06-06b4-4b05-989c-5c9101bc9a5e)
![game-all-not-drawn](https://github.com/SumitPokhriyal5/exploding-kitten-game/assets/112632728/c8ec3101-2827-4702-a15d-72e0fbfa3ec6)
![game-bomb-drawn](https://github.com/SumitPokhriyal5/exploding-kitten-game/assets/112632728/482e7966-2f55-429c-b267-e6c8abf6b767)

### Leaderboard Page
![leaderboard](https://github.com/SumitPokhriyal5/exploding-kitten-game/assets/112632728/a2c1b70c-54cb-4f92-922d-ba39df9e3026)


