import jwt from 'jsonwebtoken';

const Groups = require('../models').groups;
const Members = require('../models').groupMembers;
const Messages = require('../models').messages;

const getId = (token) => {
  const decoded = jwt.decode(token);
  return decoded.name;
};
module.exports = {
  create(req, res) {
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
  },
  addMembers(req, res) {
    Members.create({
      groupId: req.body.groupId,
      userId: req.body.userId,
    })
    .then((members) => {
      res.status(201).send(members);
    })
    .catch(() => {
      res.status(401).send({
        error: 'could not add member. Check member Id and group Id, then try again',
      });
    });
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
