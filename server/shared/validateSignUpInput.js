import validator from 'validator';

/**
 * Validates user input to the signup form
 *
 * @param {object} userInput -each the input field
 *
 * @returns {object} -errors and isValid
 */
const validateSignUpInput = (userInput) => {
  const errors = {};
  if (!validator.isMobilePhone(userInput.phoneNumber, 'any')) {
    errors.phoneNumber = 'Phone number not valid';
  }
  if (!validator.matches(userInput.username.trim(), /^[a-zA-Z0-9_]*$/)) {
    errors.username = 'Username cannot contain special characters aside from _';
  }
  if (!validator.isLength(userInput.username.trim(), { min: 3 })) {
    errors.username = 'Username is too short';
  }
  if (!validator.isLength(userInput.password.trim(), { min: 6 })) {
    errors.password = 'Password cannot be less than 6 characters';
  }
  if (!validator.matches(userInput.fullName.trim(), /^[a-zA-Z ]*$/)) {
    errors.fullName = 'Name can only be alphabets';
  }
  if (!validator.isLength(userInput.fullName.trim(), { min: 2 })) {
    errors.fullName = 'Name is too short';
  }
  if (!validator.isEmail(userInput.email)) {
    errors.email = 'Not a valid email address';
  }
  return {
    errors,
    isValid: Object.keys(errors).length > 0 ? null : 1,
  };
};

export default validateSignUpInput;
