import db from '../models/index';
import { checkParams, getId } from '../includes/functions';

const Users = db.users;
const Groups = db.groups;

/**
 *
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void} -returns nothing
 */
export const groupAndUserExist = (req, res, next) => {
  const groupId = req.params.groupId;
  const userId = req.body.userId || req.params.userId;
  const requiredFields = ['userId'];
  const validateInputResponse = checkParams(req.body, requiredFields);
  if (validateInputResponse === 'ok') {
    if (!isNaN(groupId) || !isNaN(userId)) {
      Groups.findOne({
        where: { id: groupId },
      })
      .then((group) => {
        if (group) {
          Users.findOne({
            where: { id: userId },
          })
          .then((user) => {
            if (user) {
              next();
            } else {
              res.status(400).json({ error: 'User does not exist' });
            }
          })
          .catch((error) => {
            res.status(400).json({ error, message: 'user error' });
          });
        } else {
          res.status(400).json({ error: 'Group does not exist' });
        }
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
    } else {
      res.status(400).json({ error: 'groupId or userId not a number' });
    }
  } else {
    res.status(400).json({ error: validateInputResponse });
  }
};

/**
 *
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void} -returns nothing
 */
export const groupExist = (req, res, next) => {
  const groupId = req.params.groupId;
  if (!isNaN(groupId)) {
    Groups.findOne({
      where: { id: groupId },
    })

  .then((group) => {
    if (group) {
      const userId = getId(req.headers['x-access-token']);
      db.groupMembers.findOne({
        where: { userId, groupId },
      })
      .then((member) => {
        if (member) {
          next();
        } else {
          res.status(401).json({ error: 'User not a member of the group' });
        }
      })
      .catch(() => {
      });
    } else {
      res.status(400).json({ error: 'Group does not exist' });
    }
  })
  .catch(() => {
    res.status(500).json({ error: 'Could not find group' });
  });
  } else {
    res.status(400).json({ error: 'groupId is not a number' });
  }
};
