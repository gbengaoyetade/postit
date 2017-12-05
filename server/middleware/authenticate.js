import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();
const secret = process.env.TOKEN_SECRET;

/**
 *
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void} -returns nothing
 */
const authenticate = (req, res, next) => {
  const userToken = req.query.token || req.headers['x-access-token'];
  if (userToken) {
    jwt.verify(userToken, secret, (err) => {
      if (err) {
        res.status(401).send({ error: 'Token authentication failure' });
      } else {
        next();
      }
    });
  } else {
    res.status(400).send({ error: 'No token provided' });
  }
};

export default authenticate;
