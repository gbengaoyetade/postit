import jwt from 'jsonwebtoken';
import db from '../models/index';
import dotenv from 'dotenv';

dotenv.load()

const invalidToken = db.invalidToken;
const secret = process.env.TOKEN_SECRET;
const authenticate = (req, res, next) => {
  const userToken = req.headers['x-access-token'];
  if (userToken) {
    jwt.verify(userToken, secret, (err) => {
      if (err) {
        res.status(401).json({ message: 'Token authentication failure' });
      } else {
        invalidToken.findOne({
          where: { token: userToken } })
        .then((token) => {
          if (token) {
            res.send({ message: 'You are not logged in' });
          } else {
            next();
          }
        })
        .catch((error) => {
          res.send(error);
        });
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = authenticate;
