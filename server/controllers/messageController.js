import db from '../models/index';
import { validateInput, getId } from '../includes/functions';
import transporter from '../config/mail.config';

const Messages = db.messages;
export const createMessage = (req, res) => {
  const requieredFields = ['messageBody', 'messagePriority'];
  const validateReturn = validateInput(req.body, requieredFields);
  if (validateReturn === 'ok') {
    // create the message
    Messages.create({
      messageBody: req.body.messageBody,
      messagePriority: req.body.messagePriority,
      userId: getId(req.headers['x-access-token']),
      groupId: req.params.groupId,
    })
    .then((message) => {
      // if priority is Urgent or Critical, send E-mail Notifications
      if (message.messagePriority === 'Urgent' || message.messagePriority === 'Critical') {
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
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                res.status(400).json({ error: 'notifications not sent' });
              } else {
                res.status(200).json({ message });
              }
            });
          });
        })
        .catch((error) => {
          res.status(400).json({ error, bad: 'bad request' });
        });
      } else {
        const messageData = {
          messageId: message.id,
          userId: message.userId,
          groupId: message.groupId,
          messageBody: message.messageBody,
          messagePriority: message.messagePriority,
        };
        res.status(201).json({ message: messageData });
      }
    })
    .catch((error) => {
      const data = {
        error: error.errors[0].message,
        message: 'Could not create message',
      };
      console.log(error);
      res.status(400).json({ error });
    });
  } else {
    res.status(400).json({ error: validateReturn });
  }
};

export const getMessages = (req, res) => {
  const userId = getId(req.headers['x-access-token']);
  const groupId = req.params.groupId;
  db.groupMembers.find({
    where: { userId, groupId },
  })
  .then((groupMember) => {
    Messages.findAll({
      where: { groupId },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })
    .then((messages) => {
      res.status(200).json({ messages });
    })
    .catch((err) => {
      res.status(401).json(err.message);
    });
  });
};

