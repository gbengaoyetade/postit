import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import db from '../models/index';
import { validateInput } from '../includes/functions';

dotenv.load();
const User = db.users;
const groupMembers = db.groupMembers;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

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
            process.env.TOKEN_SECRET,
            { expiresIn: 60 * 60 * 24 * 365 },
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
  }, // end of signup

  signIn(req, res) {
    const secret = process.env.TOKEN_SECRET;
    const requiredFields = ['username', 'password'];
    const validateInputResponse = validateInput(req.body, requiredFields);
    if (validateInputResponse === 'ok') {
      User.findOne({
        where: { username: req.body.username },
      })
    .then((user) => {
      if (user === null) {
        res.status(401).send({ message: 'could not find user' });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            const userToken = jwt.sign({ name: user.id },
              secret,
              { expiresIn: 60 * 60 * 24 * 365 },
              );
            const data = {
              token: userToken,
              message: 'Login was successful',
            };
            res.status(200).json(data);
          } else {
            res.status(401).json({ message: 'Username and or password incorect ' });
          }
        });
      }
    })
    .catch((error) => {
      res.status(401).send(error);
    });
    } else {
      res.status(401).json({ message: validateInputResponse });
    }
  }, // end of signIn
  resetPassword(req, res) {
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
            process.env.TOKEN_SECRET,
            { expiresIn: 60 * 30 },
            );
          const mailOptions = {
            from: 'ioyetade@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: 'Welcome to node mailer',
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.status(400).json({ error });
            } else {
              res.json({ message: 'Mail sent successfully' });
            }
          });
        } else {
          res.json({ user: 'user not found' });
        }
      })
      .catch(() => {
      });
    } else {
      res.status(400).json({ error: validateInputResponse });
    }
  },
  updatePassword(req, res) {
    const requiredFields = ['password'];
    const validateInputResponse = validateInput(req.body, requiredFields);
    if (validateInputResponse === 'ok') {
      res.json(req.body.password);
    } else {
      res.status(400).json({ error: validateInputResponse });
    }
  },
};
