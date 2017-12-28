import {
  getId,
  sendValidationErrors } from '../includes/helperFunctions';
import database from '../models/index';

const { groupMembers, groups, messages, users } = database;
/**
 * @description create new group
 *
 * @param { object } req -request object
 * @param { object } res -response object
 *
 * @returns { void } -returns nothing
 */
export const create = (req, res) => {
  if (!sendValidationErrors(req, res)) {
    const { groupName, groupDescription } = req.body;
    groups.find({
      where: {
        groupName: groupName.toLowerCase().trim(),
      },
    })
    .then((groupExist) => {
      if (groupExist) {
        res.status(409).json({ error: 'group name already exist' });
      } else {
        const userId = getId(req.headers['x-access-token']);
        groups.create({
          groupName: groupName.trim().toLowerCase(),
          groupDescription,
          createdBy: userId,
        })
        .then((group) => {
          groupMembers.create({
            groupId: group.id,
            userId,
            addedBy: userId,
          })
          .then(() => {
            const groupDetails = {
              groupId: group.id,
              groupName,
              groupDescription,
            };
            res.status(201).json({ group: groupDetails });
          })
          .catch(() => {
            res.status(500).send({ error: 'Internal server error' });
          });
        })
        .catch(() => {
          res.status(500).send({ error: 'Internal server error' });
        });
      }
    })
    .catch(() => {
      res.status(500).send({ error: 'Internal server error' });
    });
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
  const { userId } = req.body;
  const { groupId } = req.params;
  groupMembers.findOne({
    where: { userId, groupId },
  })
  .then((member) => {
    if (member) {
      res.status(409).send({
        error: 'User already a member of this group', member });
    } else {
      groupMembers.create({
        groupId,
        userId,
        addedBy: getId(req.headers['x-access-token']),
      })
      .then((groupMember) => {
        res.status(201).send({
          member: groupMember, message: 'User successfully added to group' });
      })
      .catch(() => {
        res.status(500).send({ error: 'Internal server error' });
      });
    }
  })
  .catch(() => {
    res.status(500).send({ error: 'Internal server error' });
  });
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
  users.find({
    where: { id: userId },
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt'],
    },
    include: [
      {
        model: groups,
        // send group last message with it
        include: [
          {
            model: messages,
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
      [groups, 'id', 'DESC'],
    ],
  })
  .then((userGroups) => {
    res.send(userGroups);
  })
  .catch(() => {
    res.status(500).send({ error: 'Internal server error' });
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
  const { groupId } = req.params;
  groupMembers.destroy({
    where: { userId, groupId },
  })
  .then(() => {
    res.send({ message: 'User left group' });
  })
  .catch(() => {
    res.status(500).send({ error: 'Internal server error' });
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
  req.group.getUsers({ attributes: {
    exclude: ['password', 'createdAt', 'updatedAt'],
  },
  })
  .then((members) => {
    res.send({ groupMembers: members, group: req.group });
  })
  .catch(() => {
    res.status(500).send({ error: 'Internal server error' });
  });
};
