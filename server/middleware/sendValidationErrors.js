import { validationResult } from 'express-validator/check/';

/**
 * @description Function sends validation errors
 *
 * @param { object } req -request object
 * @param { object } res -response object
 * @param { object } next -next function
 *
 * @returns { void } -return nothing
 */
const sendValidationErrors = (req, res, next) => {
  const errors = validationResult(req).formatWith(error => (error.msg));
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.mapped() });
  }
  next();
};

export default sendValidationErrors;
