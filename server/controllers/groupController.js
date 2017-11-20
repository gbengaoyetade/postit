import { checkParams, getId, checkInputLength } from '../includes/functions';
import db from '../models/index';

const Groups = db.groups;
const Users = db.users;
const Messages = db.messages;
const Members = db.groupMembers;


export const create = (req, res) => {
  const requiredFields = ['groupName', 'groupDescription'];
  if (checkParams(req.body, requiredFields) === 'ok') {
    const inputError = checkInputLength(req.body, requiredFields);
    if (Object.keys(inputError).length > 0) {
      res.status(400).json({ error: inputError });
    } else {
      Groups.create({
        groupName: req.body.groupName,
        groupDescription: req.body.groupDescription,
        createdBy: getId(req.headers['x-access-token']),
      })
      .then((group) => {
        Members.create({
          groupId: group.id,
          userId: getId(req.headers['x-access-token']),
          addedBy: getId(req.headers['x-access-token']),
        })
        .then(() => {
          const groupDetails = {
            groupId: group.id,
            groupName: group.groupName,
            groupDescription: group.groupDescription,
          };
          res.status(201).json(groupDetails);
        })
        .catch((error) => {
          res.status(500).json({
            error: 'Could not add user to group', message: error.message });
        });
      })
      .catch((error) => {
        res.status(400)
        .json({ error: 'Could not create group', message: error.message });
      });
    }
  } else {
    res.status(400).json({ error: checkParams(req.body, requiredFields) });
  }
}; // end of Create

export const addMembers = (req, res) => {
  const requiredFields = ['userId'];
  const inputValidation = checkParams(req.body, requiredFields);
  if (inputValidation === 'ok') {
    Members.findOne({
      where: { userId: req.body.userId, groupId: req.params.groupId },
    })
    .then((member) => {
      if (member) {
        res.status(409).json({
          error: 'User already a member of this group', member });
      } else {
        Members.create({
          groupId: req.params.groupId,
          userId: req.body.userId,
          addedBy: getId(req.headers['x-access-token']),
        })
        .then((groupMember) => {
          res.status(201).json({
            member: groupMember, message: 'User successfully added to group' });
        })
        .catch((error) => {
          res.status(500).json({
            error: error.message, message: 'Could not add user to group' });
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: 'Could not process request' });
    });
  }
}; // end of addMembers

export const getGroups = (req, res) => {
  const userId = getId(req.headers['x-access-token']);
  Users.find({
    where: { id: userId },
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt'],
    },
    include: [
      {
        model: Groups,
        // send group last message with it
        include: [
          {
            model: Messages,
            limit: 1,
            order: [
              ['id', 'DESC'],
            ]
          },
        ], // end of Group include
        through: { attributes: [] },
      },
    ],
    order: [
      [Groups, 'id', 'DESC'],
    ],
  })
  .then((groups) => {
    res.json(groups);
  })
  .catch(() => {
    res.status(500).json({ error: 'Could not perform action' });
  });
};

export const leaveGroup = (req, res) => {
  const userId = getId(req.headers['x-access-token']);
  const groupId = req.params.groupId;
  Members.findOne({
    where: { userId, groupId },
  })
  .then((member) => {
    if (member) {
      Members.destroy({
        where: { userId, groupId },
      })
      .then(() => {
        res.json({ message: 'User left group' });
      })
      .catch(() => {
        res.status(500).json({ error: 'Could not process request' });
      });
    } else {
      res.status(404).json({ error: 'User not a member of the group' });
    }
  })
  .catch(() => {
    res.status(500).json({ error: 'Could not process request' });
  });
};
export const getGroupMembers = (req, res) => {
  const requiredFields = ['groupId'];
  const inputValidationResponse = checkParams(req.params, requiredFields);
  if (inputValidationResponse === 'ok' && !isNaN(req.params.groupId)) {
    Groups.find({
      where: { id: req.params.groupId },
    })
    .then((foundGroup) => {
      foundGroup.getUsers({ attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
      })
      .then((users) => {
        res.json({ users, group: foundGroup });
      })
      .catch(() => {
        res.status(500).json({ error: 'Could not process request' });
      });
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not process request' });
    });
  } else {
    res.status(400).json({ error: inputValidationResponse });
  }
};
