import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index';

const User = db.users;

const validateInput = (input) => {
  if (!input.username) {
    return 'Username not provided';
  } else if (!input.email) {
    return 'Email not provided';
  } else if (!input.password) {
    return 'Password not provided';
  }
  return 'ok';
};

module.exports = {

  signUp(req, res) {
    if (validateInput(req.body) === 'ok') {
      User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      })
      .then((user) => {
        const userData = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        const data = {
          parameters: 'ok',
          user: userData,
          message: `User ${req.body.username} was created successfully`,

        };
        res.status(201).send(data);
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
          message: errorMessage,
        };
        res.status(400).json(data);
      });
    } else {
      res.status(401).send({ error: validateInput(req.body) });
    }
  }, // end of signup

  signIn(req, res) {
    User.findOne({
      where: { username: req.body.username },
    })
  .then((user) => {
    if (user === null) {
      res.send('could not find user');
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          const userToken = jwt.sign({ name: user.username },
            'andela-bootcamp',
            { expiresIn: 60 * 60 },
            );
          const data = {
            paramsOk: true,
            message: 'Login was successful',
            token: userToken,
          };
          res.send(data);
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
  .catch(() => {
    res.status(401).send('Database error');
  });
  },
};
