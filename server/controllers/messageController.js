import db from '../models/index';
import { validateInput, getId } from '../includes/functions';

const Messages = db.messages;
export const createMessage = (req, res) => {
  const requieredFields = ['messageBody', 'messagePriority'];
  const validateReturn = validateInput(req.body, requieredFields);
  if (validateReturn === 'ok') {
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
      res.status(201).json({ group: groupData });
    })
    .catch((error) => {
      const data = {
        error: error.errors[0].message,
        message: 'Could not create message',
      };
      res.status(400).json(data);
    });
  } else {
    res.status(400).json({ error: validateReturn });
  }
};

export const getMessages = (req, res) => {
  Messages.findAll({
    where: { groupId: req.params.groupId },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
  .then((messages) => {
    res.status(200).json(messages);
  })
  .catch((err) => {
    res.status(401).json(err.message);
  });
};

