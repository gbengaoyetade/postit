const Groups = require('../models').groups;
const Members = require('../models').groupMembers;
const Messages = require('../models').messages;

module.exports = {
  create(req, res) {
    Groups.create({
      groupName: req.body.groupName,
      groupDescription: req.body.groupDescription,
      userId: req.body.userId,

    })
    .then((group) => {
      const groupData = {
        groupId: group.groupId,
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
        error: error,
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
      res.status(201).json(members);
    })
    .catch(() => {
      res.status(401).json({
        error: 'could not add member. Check member Id and group Id, then try again',
      });
    });
  },
  createMessage(req, res) {
    Messages.create({
      messageBody: req.body.messageBody,
      messagePriority: req.body.messagePriority,
      userId: req.body.userId,
      groupId: req.body.groupId,
    })
    .then(() => {
      res.status(201).json({ message: 'The message was created successfully' });
    })
    .catch(() => {
      res.status(201).json({ message: 'The message was created successfully' });
    });
  },
  getMessages(req, res) {
    Messages.findAll({
      where: { groupId: req.params.groupId },
      limit: 10,
    })
    .then((messages) => {
      res.status(201).json(messages);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
  },
};
