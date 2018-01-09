import validator from 'validator';
import models from '../models';


const { groups, groupMembers } = models;

/**
 * @description Checks to see if group exists
 *
 * @param {object} req -request object
 * @param {object} res -response object
 * @param {promise} next -next
 *
 * @returns {void} -returns nothing
 */
const groupExist = (req, res, next) => {
  const { groupId } = req.params;
  if (!validator.isNumeric(groupId)) {
    res.status(400).json({ error: 'groupId is not a number' });
  } else {
    groups.findOne({
      where: { id: groupId },
    })
  .then((group) => {
    if (group) {
      const userId = req.id;
      groupMembers.findOne({
        where: { userId, groupId },
      })
      .then((member) => {
        if (member) {
          req.group = group;
          next();
        } else {
          res.status(403).json({ error: 'User not a member of the group' });
        }
      })
      .catch(() => {
      });
    } else {
      res.status(404).json({ error: 'Group does not exist' });
    }
  })
  .catch((error) => {
    res.status(500).json(error.message);
  });
  }
};
export default groupExist;
