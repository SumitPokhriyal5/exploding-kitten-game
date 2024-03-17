const UserModel = require('../models/User.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Get users controller
const getUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({message: "something went wrong",err});
  }
};

// Register user controller
const registerUser = async (req, res) => {
  const { name, email, password, points } = req.body;

  try {
    const alreadyUser = await UserModel.findOne({ email });

    if (alreadyUser) {
      res.status(400).send({message: 'User already exists, please login'});
    } else {
      bcrypt.hash(password, Number(process.env.saltRounds), async (err, hash) => {
        if (hash) {
          const user = new UserModel({
            name,
            email,
            password: hash,
            points,
          });

          await user.save();
          res.status(200).send({message: "Registered Successfully!", user});
        } else {
          res.status(500).send({message: "something went wrong",err});
        }
      });
    }
  } catch (err) {
    res.status(500).send({message: "something went wrong",err});
  }
};

// Login user controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are present in the request body
  if (!email || !password) {
    return res.status(400).send({message: 'Email and password are required'});
  }

  try {
    const user = await UserModel.findOne({ email });

    // Check if user exists in the database
    if (!user) {
      return res.status(404).send({message: 'User not found'});
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ userID: user._id }, process.env.secretKey);
        user.save();
        res.send({ message: 'Login Successful', user: {id: user._id, token: token, name: user.name, points: user.points }});
      } else {
        res.status(401).send({message: 'Incorrect password'});
      }
    });
  } catch (err) {
    res.status(500).send({message: "something went wrong",err});
  }
};

// Update user points controller
const updateUserPoints = async (req, res) => {
    const { userID } = req.body; 
    const { points } = req.body;
  
    try {
      const user = await UserModel.findById(userID);
  
      if (!user) {
        return res.status(404).send({message: 'User not found'});
      }
  
      user.points = points;
      await user.save();
  
      res.status(200).send({message: 'Points updated successfully', user});
    } catch (err) {
      res.status(500).send({message: "something went wrong",err});
    }
};

module.exports = { getUsers, registerUser, loginUser, updateUserPoints };
