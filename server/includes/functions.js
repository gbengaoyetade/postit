import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();
const secret = process.env.TOKEN_SECRET;
// checks to see if requests contains required
// fields as defined by the end point
export const checkParams = (request, requiredFields) => {
  for (let counter = 0; counter < requiredFields.length; counter += 1) {
    if (!request.hasOwnProperty(requiredFields[counter])) {
      return `${requiredFields[counter]} field not provided`;
    }
  }
  return 'ok';
};

/*
* There is an authentication middleware that handles verification of token
* This function serves to verify token supplied from
* undefined routes i.e frontend token
*/
export const verifyToken = (req, res) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, (err) => {
      if (err) {
        res.status(401).send({ error: 'Token authentication failure' });
      } else {
        res.json({ message: 'Token verified' });
      }
    });
  } else {
    res.status(400).send({ error: 'No token provided' });
  }
};

// decodes user id from token
export const getId = (token) => {
  const decoded = jwt.decode(token);
  return decoded.id;
};

export const generateToken = (userDetails) => {
  const userToken = jwt.sign({
    id: userDetails.id,
    fullName: userDetails.fullName,
    email: userDetails.email,
    phoneNumber: userDetails.phoneNumber,
  },
    secret,
    { expiresIn: 60 * 60 * 24 * 365 },
    );
  return userToken;
};

