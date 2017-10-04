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
  const requiredFields = ['username', 'email', 'password', 'fullName', 'phoneNumber'];
  if (validateInput(req.body, requiredFields) === 'ok') {
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
        const userToken = generateToken(user.id);
        const userData = {
          id: user.id,
          username: user.username,
          email: user.email,
          token: userToken,
        };
        const data = {
          user: userData,
          message: `User ${req.body.username} was created successfully`,
          parameters: 'ok',
        };
        res.status(201).send(data);
      })
      .catch((error) => {
        res.json({ error: error.message });
      });
    })
    .catch((error) => {
      let errorMessage;
      if (error.errors.message === 'username must be unique') {
        errorMessage = 'Username not available';
      } else if (error.errors[0].message === 'email must be unique') {
        errorMessage = 'Email address already in use';
      } else {
        errorMessage = error.errors[0].message;
      }
      const data = {
        error: errorMessage,
        parameters: 'ok',
      };
      res.status(401).json(data);
    });
  } else {
    const data = {
      error: validateInput(req.body, requiredFields),
    };
    res.status(401).send(data);
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
          const userToken = generateToken(user.id);
          const data = {
            token: userToken,
            user: { username: user.username, email: user.email, fullName: user.fullName },
          };
          res.status(200).json(data);
        } else {
          res.status(401).json({ message: 'Username or password incorect' });
        }
      });
    }
  })
  .catch((error) => {
    res.status(401).send(error);
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
        const resetPasswordMail = `<p> Click the link to change your password.</p>
        <a href='http://localhost:3000/password_change?token=${token}'>Change password</a> `;
        const mailOptions = {
          from: 'ioyetade@gmail.com',
          to: email,
          subject: 'Reset Password',
          html: resetPasswordMail,
        };
        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            res.status(400).json({ error });
          } else {
            res.json({ message: 'Mail sent successfully' });
          }
        });
      } else {
        res.status(401).json({ error: 'Email address does not exist on Postit' });
      }
    })
    .catch(() => {
    });
  } else {
    res.status(400).json({ error: validateInputResponse, message: 'Parameter not well structured' });
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
              res.status(400).json({ error: 'Password not updated. Try again' });
            }
          })
          .catch((updateError) => {
            res.status(400).json(updateError);
          });
        }
      });
    } else { // Token not provided response
      res.status(401).json({ error: 'No token provided' });
    }
  } else { // Password field not provided response
    res.status(400).json({ error: validateInputResponse });
  }
};

export const userSearch = (req, res) => {
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
      // filter the arrays of ids only from it because it returns groupMembers data too
      const usersId = users.map(user => (
        user.id
      ));
      db.users.findAll({
        // Take the usersIds gotten above to search the users table
        // The query below finds users that are not in the arrays of usersId and whose ...
        // ...usernames are like the value in the search query
        where: { id: { not: usersId },
          username: { $like: `%${query}%` } },
      })
      .then((otherUsers) => {
        res.json(otherUsers);
      });
    });
  })
  .catch((error) => {
    res.status(400).json({ error });
  });
};
