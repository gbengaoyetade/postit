import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.load();
const secret = process.env.TOKEN_SECRET;

/**
 * -checks to see if requests contains required
 * -fields as defined by the end point
 * @param {object} request
 * @param {array} requiredFields
 * @returns {string} -returns a string
 */
export const checkParams = (request, requiredFields) => {
  for (let counter = 0; counter < requiredFields.length; counter += 1) {
    if (!Object.prototype.hasOwnProperty.call(
      request, requiredFields[counter])) {
      return `${requiredFields[counter]} field not provided`;
    }
  }
  return 'ok';
};

// export const checkDataTypes = ()
/**
 * -decodes user id from token
 *
 * @param {string} token
 * @returns {number} -returns a number
 */
export const getId = (token) => {
  const decoded = jwt.decode(token);
  return decoded.id;
};

/**
 *
 *
 * @param {object} userDetails
 * @returns {string} -returns string
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
 * @param {object} requestObject -the request object
 * @param {array} inputField -array of input fields
 * @returns {object} -error
 */
export const checkInputLength = (requestObject, inputField) => {
  let counter;
  const error = {};
  if (typeof requestObject === 'object' && Array.isArray(inputField)) {
    for (counter = 0; counter < inputField.length; counter += 1) {
      if (requestObject[inputField[counter]].trim().length > 255) {
        error[inputField[counter]] = 'Maximum character length exceeded';
      } else if (requestObject[inputField[counter]].trim().length < 1) {
        error[inputField[counter]] = 'Field cannot be empty';
      }
    }
  } else {
    return 'bad input to function';
  }
  return error;
};

/**
 *
 *
 * @param {string} password
 * @returns {string} -returns hashed password
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
