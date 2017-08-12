import jwt from 'jsonwebtoken';
import validateInput from '../includes/functions';

const Groups = require('../models').groups;
const Members = require('../models').groupMembers;
const Messages = require('../models').messages;
const User = require('../models').users;

const getId = (token) => {
  const decoded = jwt.decode(token);
  return decoded.name;
};
const beforeAddMember = (req) => {
  User.findOne({
    where: { id: req.body.userId },
  })
  .then((user) => {
    if (user) {
      Groups.findOne({
        where: { id: req.params.id },
      })
      .then((group) => {
        if (group) {
          Members.findOne({
            where: { userId: req.body.userId, groupId: req.params.id },
          })
          .then((member) => {
            if (member !== null) {
              return 1; // user does not belong to group
            } else {
              return 2; // user already a member of the group
            }
          })
          .catch(() => {
            return 3; // connection error
          });
        } else {
          return 4; // Group does not exist
        }
      })
    } else {
      return 5; // user does not exist
    }
  })
  .catch((error) => {
    return error;
  });
};
const checkExist = (value) => {
  Groups.findOne({
    where: { id: value },
  })
  .then((returnedValue) =>{ return returnedValue; })
  .catch((error) => {
    return error;
  });
};
module.exports = {
  create(req, res) {
    const requiredFields = ['groupName', 'groupDescription'];
    if (validateInput(req.body, requiredFields) === 'ok') {
      Groups.create({
        groupName: req.body.groupName,
        groupDescription: req.body.groupDescription,
        userId: getId(req.headers['x-access-token']),

      })
      .then((group) => {
        const groupData = {
          groupId: group.id,
          groupName: group.groupName,
          groupDescription: group.groupDescription,
        };
        const data = {
          group: groupData,
          parameter: 'Parameters well structured',
          message: `Group ${req.body.groupName} was created successfully`,

        };
        res.status(201).send(data);
      })
      .catch((error) => {
        const data = {
          error: error.errors,
          message: 'Could not create group',
        };
        res.status(401).send(data);
      });
    } else {
      res.send({ message: validateInput(req.body, requiredFields) });
    }
  },
  addMembers(req, res) {
    let thisData= 'Epl';
    const requiredFields = ['userId'];
    if(validateInput(req.body, requiredFields) === 'ok'){
      Groups.findOne({
        where: { id: req.params.id },
      })
      .then((group) => {
        if(group){
          thisData = 'I am a data';
          Users.findOne({
            where: { id: req.body.userId },
          })
          .then((user) => {
            if (user) {
              res.send(user);
            } else {
              res.send({ error: 'user not found' });
            }
          });
        }
      })
      .catch((error) => {
        res.send(error);
      });
      res.send(thisData);
    }
  },
  createMessage(req, res) {
    Messages.create({
      messageBody: req.body.messageBody,
      messagePriority: req.body.messagePriority,
      userId: getId(req.headers['x-access-token']),
      groupId: req.params.groupId,
    })
    .then((group) => {
      const groupData = {
        messageId: group.id,
        userId: group.userId,
        groupId: group.groupId,
        messageBody: group.messageBody,
        messagePriority: group.messagePriority,
      };
      res.status(201).send({ group: groupData });
    })
    .catch((error) => {
      const data = {
        error: error.errors[0].message,
        message: 'Could not create message',
      };
      res.status(201).send(data);
    });
  },
  getMessages(req, res) {
    Messages.findAll({
      where: { groupId: req.params.groupId },
    })
    .then((messages) => {
      res.status(201).send(messages);
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
  },
};
