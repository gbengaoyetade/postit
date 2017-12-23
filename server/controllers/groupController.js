import {
  checkParams,
  getId,
  checkInputLength } from '../includes/helperFunctions';
import database from '../models/index';

const Groups = database.groups;
const Users = database.users;
const Messages = database.messages;
const Members = database.groupMembers;

/**
 * @description create new group
 *
 * @param { object } req -request object
 * @param { object } res -response object
 *
 * @returns { void } -returns nothing
 */
export const create = (req, res) => {
  const requiredFields = ['groupName', 'groupDescription'];
  const requiredFieldsResponse = checkParams(req.body, requiredFields);
  if (requiredFieldsResponse !== 'ok') {
    res.status(400).json({ error: requiredFieldsResponse });
  } else {
    const inputError = checkInputLength(req.body, requiredFields);
    if (Object.keys(inputError).length > 0) {
      res.status(400).json({ error: inputError });
    } else {
      Groups.find({
        where: {
          groupName: req.body.groupName.toLowerCase(),
        },
      })
      .then((groupExist) => {
        if (groupExist) {
          res.status(409).json({ error: 'group name already exist.' });
        } else {
          Groups.create({
            groupName: req.body.groupName.toLowerCase(),
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
              res.status(500).send({ error: error.message });
            });
          })
          .catch((error) => {
            res.status(500).send({ error: error.message });
          });
        }
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
    }
  }
}; // end of Create


/**
 * @description Adds new member to group
 *
 * @param { object } req -request object
 * @param { object } res -response object
 *
 * @returns { void } -returns nothing
 */
export const addMembers = (req, res) => {
  const requiredFields = ['userId'];
  const inputValidation = checkParams(req.body, requiredFields);
  if (inputValidation === 'ok') {
    Members.findOne({
      where: { userId: req.body.userId, groupId: req.params.groupId },
    })
    .then((member) => {
      if (member) {
        res.status(409).send({
          error: 'User already a member of this group', member });
      } else {
        Members.create({
          groupId: req.params.groupId,
          userId: req.body.userId,
          addedBy: getId(req.headers['x-access-token']),
        })
        .then((groupMember) => {
          res.status(201).send({
            member: groupMember, message: 'User successfully added to group' });
        })
        .catch((error) => {
          res.status(500).send({ error: error.message });
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
  }
}; // end of addMembers

/**
 * @description Get groups a particular user belongs to
 *
 * @param { object } req -request object
 * @param { object } res -response object
 *
 * @returns { void } -returns nothing
 */
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
    res.send(groups);
  })
  .catch((error) => {
    res.status(500).send({ error: error.message });
  });
};

/**
 * @description Removes user from group
 *
 * @param { object } req -request object
 * @param { object } res -response object
 *
 * @returns { void } -returns nothing
 */
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
        res.send({ message: 'User left group' });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
    }
  })
  .catch((error) => {
    res.status(500).send({ error: error.messagee });
  });
};

/**
 * @description gets members of a particular group
 *
 * @param { object } req -request object
 * @param { object } res -response object
 *
 * @returns { void } -returns nothing
 */
export const getGroupMembers = (req, res) => {
  Groups.find({
    where: { id: req.params.groupId },
  })
  .then((foundGroup) => {
    foundGroup.getUsers({ attributes: {
      exclude: ['password', 'createdAt', 'updatedAt'],
    },
    })
    .then((users) => {
      res.send({ users, group: foundGroup });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
  })
  .catch((error) => {
    res.status(500).send({ error: error.message });
  });
};
