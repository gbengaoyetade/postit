import jwt from 'jsonwebtoken';
import validateInput from '../includes/functions';

const Groups = require('../models').groups;
const Members = require('../models').groupMembers;
const Messages = require('../models').messages;

const getId = (token) => {
  const decoded = jwt.decode(token);
  return decoded.name;
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
    const requiredFields = ['userId'];
    const inputValidation = validateInput(req.body, requiredFields);
    if (inputValidation === 'ok') {
      Members.findOne({
        where: { userId: req.params.userId, groupId: req.params.groupId },
      })
      .then((member) => {
        if (member) {
          res.json({ error: 'User already a member of this group' });
        } else {
          Members.create({
            groupId: req.params.groupId,
            userId: req.body.userId,
            addedBy: getId(req.headers['x-access-token']),
          })
          .then(() => {
            res.json({ message: 'User successfully added to group' });
          })
          .catch((error) => {
            res.json({ error: error.message, message: 'Could not add user to group' });
          });
        }
      })
      .catch((error) => {
        res.json({ error: error.message, message: 'Could not find user' });
      });
    } else {
      res.json({ error: inputValidation });
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
