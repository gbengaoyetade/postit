import jwt from 'jsonwebtoken';
import { getId } from '../includes/helperFunctions';

const secret = process.env.TOKEN_SECRET;

/**
 * @description Does token verification
 *
 * @param { object } req -request object
 * @param { object } res -response object
 * @param { function } next -next
 *
 * @returns { void } -returns nothing
 */
const authenticate = (req, res, next) => {
  const userToken = req.headers['x-access-token'];
  if (userToken) {
    jwt.verify(userToken, secret, (error) => {
      if (error) {
        res.status(401).send({ error: 'Token authentication failure' });
      } else {
        req.id = getId(userToken);
        next();
      }
    });
  } else {
    res.status(400).send({ error: 'No token provided' });
  }
};

export default authenticate;
