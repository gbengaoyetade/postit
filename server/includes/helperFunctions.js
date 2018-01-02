import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const secret = process.env.TOKEN_SECRET;


/**
 * @description Decodes user id from token
 *
 * @param { string } token -user token
 *
 * @returns { number } -returns a number
 */
export const getId = (token) => {
  const decoded = jwt.decode(token);
  return decoded.id;
};

/**
 * @description Generates token
 *
 * @param { object } userDetails -user information
 *
 * @returns { string } -returns string
 */
export const generateToken = (userDetails) => {
  const userToken = jwt.sign({
    id: userDetails.id,
    fullName: userDetails.fullName,
    email: userDetails.email,
    phoneNumber: userDetails.phoneNumber,
  },
    secret,
    { expiresIn: 60 * 60 * 24 },
    );
  return userToken;
};

/**
 *
 * @description creates an encrypted string
 *
 * @param { string } password -password string
 *
 * @returns { string } -returns hashed password
 */
export const encryptPassword = (password) => {
  let hashedPassword;
  if (typeof password === 'string') {
    const salt = bcrypt.genSaltSync(5);
    hashedPassword = bcrypt.hashSync(password, salt);
  } else {
    hashedPassword = 'Wrong input type';
  }

  return hashedPassword;
};

