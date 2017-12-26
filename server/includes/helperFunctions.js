import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator/check/';

dotenv.load();
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
/**
 * @description Send validation errors if they are available
 *
 * @param { object } req -express request object
 * @param { object } res -express response object
 *
 * @returns { boolean } returns a boolean
 */
export const sendValidationErrors = (req, res) => {
  const errors = validationResult(req).formatWith(error => (error.msg));
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.mapped() });
  }
  return false;
};
