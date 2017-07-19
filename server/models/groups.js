const Group = (sequelize, DataTypes) => {
  const Groups = sequelize.define('groups', {
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
        Groups.belongsToMany(models.User, {
          through: models.groupMembers,
        });
      },
      hooks: {
        beforeCreate: (groups) => {
          Groups.findAll({
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
  return Groups;
};
export default Group;
