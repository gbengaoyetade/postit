import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();
const secret = process.env.TOKEN_SECRET;
const authenticate = (req, res, next) => {
  const userToken = req.headers['x-access-token'];
  if (userToken) {
    jwt.verify(userToken, secret, (err) => {
      if (err) {
        res.status(401).json({ message: 'Token authentication failure' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = authenticate;
