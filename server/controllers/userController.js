import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import database from '../models/index';
import transporter from '../config/transporter';
import validateSignUpInput from '../shared/validateSignUpInput';
import {
  getId,
  generateToken,
  encryptPassword,
  sendValidationErrors } from '../includes/helperFunctions';

dotenv.load();
const { APP_URL } = process.env;
const { groupMembers, users } = database;
const secret = process.env.TOKEN_SECRET;

/**
 * @description Signup new user
 *
 * @param { object } req -request object
 * @param { object } res -response object
 *
 * @returns { void } -returns nothing
 */
export const signUp = (req, res) => {
  if (!sendValidationErrors(req, res)) {
    // Validate input if it contains required fields
    const { errors, isValid } = validateSignUpInput(req.body);
    if (isValid) {
      // if input is valid, create user
      users.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
      })
      .then((user) => {
        groupMembers.create({
          userId: user.id,
          groupId: 1,
          addedBy: 1,
        })
        .then(() => {
          const userToken = generateToken(user);
          const userDetails = {
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: userToken,
          };
          const userCreateResponse = {
            user: userDetails,
            message: `User ${req.body.username} was created successfully`,
          };
          res.status(201).send(userCreateResponse);
        })
        .catch((serverError) => {
          res.status(500).send({ error: serverError.message });
        });
      })
      .catch((error) => {
        if (error.errors[0].message === 'username must be unique') {
          res.status(409).send({ error: 'Username not available' });
        } else if (error.errors[0].message === 'email must be unique') {
          res.status(409).send({ error: 'Email address already in use' });
        } else if (error.errors[0].message === 'phoneNumber must be unique') {
          res.status(409).send({ error: 'Phone Number already in use' });
        } else {
          const errorMessage = error.errors[0].message;
          res.status(400).send({ error: errorMessage });
        }
      });
    } else {
      res.status(400).json({ error: errors });
    }
  }
}; // end of signup

/**
 * @description Signs user in
 *
 * @param { object } req -request object
 * @param { object } res -response object
 *
 * @returns {  void } -returns nothing
 */
export const signIn = (req, res) => {
  if (!sendValidationErrors(req, res)) {
    users.findOne({
      where: {
        $or: [{ username: req.body.username }, { email: req.body.username }]
      }
    })
  .then((user) => {
    if (user === null) {
      res.status(401).send({ error: 'Username or password incorect' });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          const userToken = generateToken(user);
          const userDetails = {
            user: {
              id: user.id,
              fullName: user.fullName,
              username: user.username,
              email: user.email,
              phoneNumber: user.phoneNumber,
              token: userToken,
            },
          };
          res.status(200).send(userDetails);
        } else {
          res.status(401).send({ error: 'Username or password incorrect' });
        }
      });
    }
  })
  .catch((error) => {
    res.status(500).send(error.message);
  });
  }
}; // end of signIn
/**
 * @description Sends user a reset password link
 *
 * @param { object } req -request object
 * @param { object } res -response object
 *
 * @returns { void } -returns nothing
 */
export const resetPassword = (req, res) => {
  const { email } = req.body;
  if (!sendValidationErrors(req, res)) {
    users.findOne({
      where: { email },
    })
    .then((user) => {
      if (user) {
        // structure email
        const token = jwt.sign({ id: user.id },
          secret,
          { expiresIn: 60 * 30 },
          );
        const resetPasswordMail =
        `<p> Click the link to change your password.</p>
        <a href='${APP_URL}/password/update?token=${token}'>
        Change password</a> `;
        const mailOptions = {
          from: 'ioyetade@gmail.com',
          to: email,
          subject: 'Reset Password',
          html: resetPasswordMail,
        };
        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            res.status(503).send({ error: 'Could not send mail' });
          } else {
            res.send({ message: 'Mail sent successfully' });
          }
        });
      } else {
        res.status(400).send({
          error: 'Email address does not exist on Postit' });
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
  }
};
/**
 * @description Updates user password
 *
 * @param { object } req -request object
 * @param { object } res -response object
 *
 * @returns { void } -returns nothing
 */
export const updatePassword = (req, res) => {
  if (!sendValidationErrors(req, res)) {
    // Check if URL contians parameter token
    const userToken = req.query.token;
    if (!userToken) {
      // Token not provided response
      res.status(400).send({ error: 'No token provided' });
    } else {
      let userId;
      // Verify user token
      jwt.verify(userToken, secret, (error) => {
        if (error) {
          res.status(401).send({ error: 'Token authentication failure' });
        } else {
          // Update user password if token was verified successfully
          const hash = encryptPassword(req.body.password);
          userId = getId(userToken);
          users.update(
            { password: hash },
            { where: { id: userId } },
          )
          .then((updateValue) => {
            if (updateValue[0]) {
              users.findOne(({
                where: { id: userId },
                attributes: {
                  exclude: ['createdAt', 'updatedAt', 'password'],
                },
              }))
              .then((user) => {
                const token = generateToken(user);
                res.send({ token });
              });
            } else {
              res.status(500).send({
                error: 'Password not updated. Try again' });
            }
          })
          .catch((updateError) => {
            res.status(500).send({ error: updateError.message });
          });
        }
      });
    }
  }
};
/**
 * @description search user
 *
 * @param { object } req -request object
 * @param { object } res -response object
 *
 * @returns { void } - returns nothing
 */
export const userSearch = (req, res) => {
  if (!sendValidationErrors(req, res)) {
    const { query, offset } = req.query;
    const limit = req.query.limit || 10;
    database.users.findAndCountAll({
      where: {
        $or: [{
          username: { $iLike: `%${query.toLowerCase()}%` },
        }, {
          fullName: { $iLike: `%${query.toLowerCase()}%` },
        }],
      },
      offset,
      limit,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      }
    })
    .then((result) => {
      const pagination = {
        pageCount: Math.floor(result.count / limit),
        count: result.count,
        users: result.rows,
      };
      res.send(pagination);
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
  }
};
