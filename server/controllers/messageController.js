import db from '../models/index';
import { checkParams, getId } from '../includes/functions';
import transporter from '../config/mail.config';

const Messages = db.messages;
/**
 * @function
 * @name createMessage
 * @param {object} req
 * @param {object} res
 * @returns {void} -returns nothing
 */
export const createMessage = (req, res) => {
  const requieredFields = ['messageBody', 'messagePriority'];
  const validateReturn = checkParams(req.body, requieredFields);
  if (validateReturn === 'ok') {
    // create the message
    Messages.create({
      messageBody: req.body.messageBody,
      messagePriority: req.body.messagePriority,
      userId: getId(req.headers['x-access-token']),
      groupId: req.params.groupId,
    })
    .then((message) => {
      const messageData = {
        messageId: message.id,
        userId: message.userId,
        groupId: message.groupId,
        messageBody: message.messageBody,
        messagePriority: message.messagePriority,
      };
      res.status(201).send({ message: messageData });
      // if priority is Urgent or Critical, send E-mail Notifications
      if (message.messagePriority === 'Urgent' ||
      message.messagePriority === 'Critical') {
        db.groups.find({
          where: { id: message.groupId },
        })
        .then((group) => {
          group.getUsers({
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'password'],
            },
          })
          .then((groupMembers) => {
            const membersEmail = groupMembers.map(member => (
              member.email
            ));
            const email = `<h3>Group: ${group.groupName}</h3>
            <p>Message: ${message.messageBody}</p>
            <p>Priority: <small>${message.messagePriority}</small><p>`;
            const mailOptions = {
              from: 'ioyetade@gmail.com',
              to: membersEmail,
              subject: 'Postit Message Notification',
              html: email,
            };
            transporter.sendMail(mailOptions, () => {
            });
          });
        })
        .catch((error) => {
          res.status(400).send({ error: error.message, bad: 'bad request' });
        });
      }
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
  } else {
    res.status(400).send({ error: validateReturn });
  }
};

/**
 * @function
 * @name getMessages
 * @param {object} req
 * @param {object} res
 * @returns {void} -returns nothing
 */
export const getMessages = (req, res) => {
  const userId = getId(req.headers['x-access-token']);
  const groupId = req.params.groupId;
  db.groupMembers.find({
    where: { userId, groupId },
  })
  .then(() => {
    db.messages.findAll({
      where: { groupId },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: db.users,
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
          },
        },
      ],
    })
    .then((messages) => {
      res.status(200).send({ messages });
    })
    .catch(() => {
      res.status(500).send({ error: 'Could not get messages' });
    });
  });
};
