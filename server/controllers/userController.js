import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index';
import validateInput from '../includes/functions';

const User = db.users;
const groupMembers = db.groupMembers;
const invalidToken = db.invalidToken;
module.exports = {

  signUp(req, res) {
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
          const userToken = jwt.sign({ name: user.id },
            'andela-bootcamp',
            { expiresIn: 60 * 60 * 24 },
            );
          const userData = {
            id: user.id,
            username: user.username,
            email: user.email,
            token: userToken,
          };
          const data = {
            user: userData,
            message: `User ${req.body.username} was created successfully`,
          };
          res.status(201).send(data);
        })
        .catch((error) => {
          res.json({ error: error.message });
        });
      })
      .catch((error) => {
        let errorMessage;
        if (error.errors[0].message === 'username must be unique') {
          errorMessage = 'Username not available';
        } else if (error.errors[0].message === 'email must be unique') {
          errorMessage = 'Email address already in use';
        } else {
          errorMessage = error.errors[0].message;
        }
        const data = {
          parameters: 'ok',
          error: errorMessage,
        };
        res.status(400).json(data);
      });
    } else {
      const data = {
        parameters: 'Not ok',
        error: validateInput(req.body, requiredFields),
      };
      res.status(401).send(data);
    }
  }, // end of signup

  signIn(req, res) {
    // const secret = process.env.TOKEN_SECRET;
    User.findOne({
      where: { username: req.body.username },
    })
  .then((user) => {
    if (user === null) {
      const error = {
        message: 'could not find user',
      };
      res.status(401).send(error);
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          const userToken = jwt.sign({ name: user.id },
            'andela-bootcamp',
            { expiresIn: 60 * 60 * 24 },
            );
          const userData = {
            id: user.id,
            token: userToken,
          };
          const data = {
            user: userData,
            message: 'Login was successful',
          };
          res.status(200).send(data);
        } else {
          const data = {
            paramsOk: true,
            message: 'Incorrect user details',
          };
          res.send(data);
        }
      });
    }
  })
  .catch((error) => {
    res.status(401).send(error);
  });
  }, // end of signIn

  signOut(req, res) {
    invalidToken.create({
      token: req.headers['x-access-token'],
    })
    .then(() => {
      res.send({ message: 'You have successful logged out' });
    })
    .catch((error) => {
      res.status(401).send(error);
    });
  },
};
