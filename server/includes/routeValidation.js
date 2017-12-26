import { body, query } from 'express-validator/check';

const routeValidation = () => (
  {
    createGroup: [
      body('groupName')
      .exists()
      .withMessage('groupName field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of characters'),
      body('groupDescription')
      .exists()
      .withMessage('groupDescription field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of characters')
      .isLength({ max: 255 })
    ],
    addMembers: [
      body('userId')
      .exists()
      .withMessage('userId field is required')
      .matches(/^[0-9]+/)
      .withMessage('Expects a string of number(s)'),
    ],
    createMessage: [
      body('messageBody')
      .exists()
      .withMessage('messageBody field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of characters'),
      body('messagePriority')
      .exists()
      .withMessage('messagePriority field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of characters')
      .isLength({ max: 255 })
    ],
    signUp: [
      body('password')
      .exists()
      .withMessage('password field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of characters'),
      body('username')
      .exists()
      .withMessage('username field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of characters'),
      body('fullName')
      .exists()
      .withMessage('fullName field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of characters'),
      body('email')
      .exists()
      .withMessage('email field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of characters'),
      body('phoneNumber')
      .exists()
      .withMessage('phoneNumber field is required')
    ],
    signIn: [
      body('username')
      .exists()
      .withMessage('username field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of characters'),
      body('password')
      .exists()
      .withMessage('password field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of characters'),
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
      .withMessage('Expects a string of characters'),
    ],
    userSearch: [
      query('query')
      .exists()
      .withMessage('query field is required')
      .matches(/^[a-zA-Z]+/)
      .withMessage('Expects a string of characters'),
      query('offset')
      .exists()
      .withMessage('offset field is required')
      .matches(/^[0-9]+/)
      .withMessage('Expects number'),
    ]
  }
);
export default routeValidation;
