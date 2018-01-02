import models from '../models/';

const { users } = models;
/**
 * @description Check to see if user and group exists
 *
 * @param { object } req -request object
 * @param { object } res -response object
 * @param { function } next -function to call next route
 *
 * @returns { void } -returns nothing
 */
const userExist = (req, res, next) => {
  const { userId } = req.body;
  users.findOne({
    where: { id: userId },
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt'],
    },
  })
  .then((user) => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ error: 'User does not exist' });
    }
  })
  .catch(() => {
    res.status(500).json({ error: 'Internal server error' });
  });
};
export default userExist;
