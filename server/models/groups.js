module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('groups', {
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Group name cannot be empty' },
      },
    },
    groupDescription: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { args: true, msg: 'User Id can only be an integer' },

      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        Group.belongsToMany(models.User);
      },
      hooks: {
        beforeCreate: (groups) => {
          Group.findAll({
            where: { userId: groups.userId, groupName: groups.groupName },
          })
          .then(() => {
            throw new Error('You have created this group already');
          })
          .catch(() => {

          });
        },
      },
    },
  });
  return Group;
};
