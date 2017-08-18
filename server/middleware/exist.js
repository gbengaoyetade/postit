import db from '../models/index';

const Users = db.users;
const Groups = db.groups;
const groupAndUserExist = (req, res, next) => {
  const groupId = req.params.groupId;
  const userId = req.body.userId || req.params.userId;

  Groups.findOne({
    where: { id: groupId },
  })
  .then((user) => {
    if (user) {
      Users.findOne({
        where: { id: userId },
      })
      .then((groups) => {
        if (groups) {
          next();
        } else {
          res.json({ error: 'User does not exist' });
        }
      })
      .catch((error) => {
        res.json({ error, message: 'user error' });
      });
    } else {
      console.log(req.params);
      res.json({ error: 'Group does not exist' });
    }
  })
  .catch((error) => {
    res.json({ error: error.message });
  });
};
export default groupAndUserExist;
