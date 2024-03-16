const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.secretKey);

      if (decoded) {
        const userID = decoded.userID;
        req.body.userID = userID;
        next();
      } else {
        res.send('Please Login First');
      }
    } catch (error) {
      res.send('Please Login First');
    }
  } else {
    res.send('Please Login First');
  }
};

module.exports = { authenticate };
