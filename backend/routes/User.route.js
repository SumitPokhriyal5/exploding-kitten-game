const express = require('express');
const { getUsers, loginUser, registerUser, updateUserPoints } = require('../controllers/User.controller.js');
const { authenticate } = require('../middlewares/auth.middleware.js');

const userRouter = express.Router();

// Get all users route
userRouter.get('/', getUsers);

// Register route
userRouter.post('/register', registerUser);

// Login route
userRouter.post('/login', loginUser);

// Update points route
userRouter.put('/updatePoints', authenticate, updateUserPoints);



module.exports = { userRouter };
