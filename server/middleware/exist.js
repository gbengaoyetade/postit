import db from '../models/index';

const Users = db.users;
const Groups = db.groups;
export const groupAndUserExist = (req, res, next) => {
  const groupId = req.params.groupId;
  const userId = req.body.userId || req.params.userId;
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
        console.log(req.params);
        res.status(400).json({ error: 'Group does not exist' });
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
  } else {
    res.status(400).json({ error: 'groupId or userId not a number' });
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
        next();
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
