import db from '../models/index';
import { validateInput, getId } from '../includes/functions';

const Users = db.users;
const Groups = db.groups;
export const groupAndUserExist = (req, res, next) => {
  const groupId = req.params.groupId;
  const userId = req.body.userId || req.params.userId;
  const requiredFields = ['userId'];
  const validateInputResponse = validateInput(req.body, requiredFields);
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
          res.status(400).json({ error: 'User not a member of the group' });
        }
      })
      .catch((error) => {
      });
    } else {
      res.status(400).json({ error: 'Group does not exist' });
    }
  })
  .catch((error) => {
    res.status(400).json({ error });
  });
  } else {
    res.json({ error: 'groupId is not a number' });
  }
};
