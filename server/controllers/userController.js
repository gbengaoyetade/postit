import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models/index';
import transporter from '../config/mail.config';
import { validateInput, getId, generateToken } from '../includes/functions';

dotenv.load();
const User = db.users;
const groupMembers = db.groupMembers;
const secret = process.env.TOKEN_SECRET;

export const signUp = (req, res) => {
  const requiredFields = [
    'username', 'email', 'password', 'fullName', 'phoneNumber'];
  const validateInputResponse = validateInput(req.body, requiredFields);
  if (validateInputResponse === 'ok') {
    User.create({
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
        const userData = {
          id: user.id,
          username: user.username,
          email: user.email,
          token: userToken,
        };
        const userCreateResponse = {
          user: userData,
          message: `User ${req.body.username} was created successfully`,
        };
        res.status(201).send(userCreateResponse);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
    })
    .catch((error) => {
      if (error.errors[0].message === 'username must be unique') {
        res.status(409).json({ error: 'Username not available' });
      } else if (error.errors[0].message === 'email must be unique') {
        res.status(409).json({ error: 'Email address already in use' });
      } else if (error.errors[0].message === 'phoneNumber must be unique') {
        res.status(409).json({ error: 'Phone Number already in use' });
      } else {
        const errorMessage = error.errors[0].message;
        res.status(400).json({ error: errorMessage });
      }
    });
  } else {
    res.status(400).json({ error: validateInputResponse });
  }
}; // end of signup

export const signIn = (req, res) => {
  const requiredFields = ['username', 'password'];
  const validateInputResponse = validateInput(req.body, requiredFields);
  if (validateInputResponse === 'ok') {
    User.findOne({
      where: {
        username: req.body.username,
      },
    })
  .then((user) => {
    if (user === null) {
      res.status(401).send({ message: 'Username or password incorect' });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          const userToken = generateToken(user);
          const data = {
            token: userToken,
            user: {
              username: user.username,
              email: user.email,
              fullName: user.fullName },
          };
          res.status(200).json(data);
        } else {
          res.status(401).json({ message: 'Username or password incorect' });
        }
      });
    }
  })
  .catch((error) => {
    res.status(500).send(error.message);
  });
  } else {
    res.status(400).json({ error: validateInputResponse });
  }
}; // end of signIn
export const resetPassword = (req, res) => {
  const requiredFields = ['email'];
  const validateInputResponse = validateInput(req.body, requiredFields);
  const email = req.body.email;
  if (validateInputResponse === 'ok') {
    User.findOne({
      where: { email },
    })
    .then((user) => {
      if (user) {
        // structure email
        const token = jwt.sign({ name: user.id },
          secret,
          { expiresIn: 60 * 30 },
          );
        const resetPasswordMail =
        `<p> Click the link to change your password.</p>
        <a href='http://localhost:3000/password_change?token=${token}'>
        Change password</a> `;
        const mailOptions = {
          from: 'ioyetade@gmail.com',
          to: email,
          subject: 'Reset Password',
          html: resetPasswordMail,
        };
        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            res.status(503).json({ error: 'Could not send mail' });
          } else {
            res.json({ message: 'Mail sent successfully' });
          }
        });
      } else {
        res.status(400).json({
          error: 'Email address does not exist on Postit' });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: 'Cannot process your request at the moment' });
    });
  } else {
    res.status(400).json({
      error: validateInputResponse, message: 'Parameter not well structured' });
  }
};
export const updatePassword = (req, res) => {
  // Check if password field was provided
  const requiredFields = ['password'];
  const validateInputResponse = validateInput(req.body, requiredFields);
  if (validateInputResponse === 'ok') {
    // Check if URL contians parameter token
    const userToken = req.query.token;
    if (userToken) {
      let userId;
      // Verify user token
      jwt.verify(userToken, secret, (error) => {
        if (error) {
          res.status(401).json({ error: 'Token authentication failure' });
        } else {
          // Update user password if token was verified successfully
          const salt = bcrypt.genSaltSync(5);
          const hash = bcrypt.hashSync(req.body.password, salt);
          userId = getId(userToken);
          User.update(
            { password: hash },
            { where: { id: userId } },
          )
          .then((updateValue) => {
            if (updateValue[0] === 1) {
              const authToken = generateToken(userId);
              res.json({ token: authToken });
            } else {
              res.status(500).json({
                error: 'Password not updated. Try again' });
            }
          })
          .catch(() => {
            res.status(500).json({
              error: 'Could not update password at the moment' });
          });
        }
      });
    } else { // Token not provided response
      res.status(400).json({ error: 'No token provided' });
    }
  } else { // Password field not provided response
    res.status(400).json({ error: validateInputResponse });
  }
};

export const groupMemberSearch = (req, res) => {
  const groupId = req.params.groupId;
  const query = req.query.query;
  db.groups.find({
    where: {
      id: groupId,
    },
  })
  .then((groups) => {
    // Get the ids of users that belong to the current group
    groups.getUsers({
      attributes: ['id'],
    })
    .then((users) => {
      // Get the arrays of ids only from the result returned
      // because it returns groupMembers data too
      const usersId = users.map(user => (
        user.id
      ));
      db.users.findAll({
        // Take the usersIds gotten above to search the users table
        // The query below finds users that are not in the arrays
        // of usersId and whose ...
        // ...usernames are like the value in the search query
        where: { id: { not: usersId },
          username: { $like: `%${query}%` } },
      })
      .then((otherUsers) => {
        res.json(otherUsers);
      })
      .catch(() => {
        res.status(500).json({ error: 'Could not search group members' });
      });
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not search group members' });
    });
  })
  .catch(() => {
    res.status(500).json({ error: 'Could not search group members' });
  });
};
