import { validateInput, getId } from '../includes/functions';

const Groups = require('../models').groups;
const Users = require('../models').users;
const Messages = require('../models').messages;
const Members = require('../models').groupMembers;

export const create = (req, res) => {
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
}; // end of Create

export const addMembers = (req, res) => {
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
}; // end of addMembers

export const getGroups = (req, res) => {
  // const userId = getId(req.headers['x-access-token']);
  Users.findAll({
    include: [
      {
        model: Messages,
      },
    ],
  })
  .then((groups) => {
    res.json(groups);
  })
  .catch((error) => {
    res.json(error);
  });
};

