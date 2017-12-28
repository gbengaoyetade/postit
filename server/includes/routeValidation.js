import { body, query, param } from 'express-validator/check';

/**
 * @description function to validate each route input parameter
 *
 * @returns { object } -returns validation rules
 */
const routeValidation = () => (
  {
    createGroup: [
      body('groupName')
      .exists()
      .withMessage('groupName field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of alphabets'),
      body('groupDescription')
      .exists()
      .withMessage('groupDescription field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of alphabets')
      .isLength({ max: 255 })
    ],
    addMembers: [
      body('userId')
      .exists()
      .withMessage('userId field is required')
      .matches(/^[0-9]+/)
      .withMessage('Expects a string of number(s)'),
      param('groupId')
      .isNumeric()
      .withMessage('expect a number as groupId')
    ],
    createMessage: [
      body('messageBody')
      .exists()
      .withMessage('messageBody field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of alphabets'),
      body('messagePriority')
      .exists()
      .withMessage('messagePriority field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of alphabets')
      .isLength({ max: 255 })
      .isIn(['Normal', 'Urgent', 'Critical'])
      .withMessage('messagePriority can only be Normal, Urgent or Critical')
    ],
    signUp: [
      body('password')
      .exists()
      .withMessage('password field is required')
      .matches(/^[a-zA-Z ]*$/)
      .withMessage('Expects a string of alphabets'),
      body('username')
      .exists()
      .withMessage('username field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of alphabets'),
      body('fullName')
      .exists()
      .withMessage('fullName field is required')
      .matches(/^[a-zA-Z ]*$/)
      .withMessage('Expects a string of alphabets'),
      body('email')
      .exists()
      .withMessage('email field is required'),
      body('phoneNumber')
      .exists()
      .withMessage('phoneNumber field is required')
    ],
    signIn: [
      body('username')
      .exists()
      .withMessage('username field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of alphabets'),
      body('password')
      .exists()
      .withMessage('password field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of alphabets'),
    ],
    resetPassword: [
      body('email')
      .exists()
      .withMessage('email field is required')
      .isEmail()
      .withMessage('Expects an email address'),
    ],
    updatePassword: [
      body('password')
      .exists()
      .withMessage('password field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of alphabets'),
    ],
    userSearch: [
      query('query')
      .exists()
      .withMessage('query field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of alphabets'),
      query('offset')
      .exists()
      .withMessage('offset field is required')
      .matches(/^[0-9]+/)
      .withMessage('Expects number'),
    ]
  }
);
export default routeValidation;
