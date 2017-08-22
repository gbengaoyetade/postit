import Users from './users';

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
      allowNull: false,
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
        Groups.belongsToMany(models.users, {
          through: models.groupMembers,
          foreignKey: 'userId',
        });
      },
    }, // end fo classMethods
    hooks: {

    }, // end of hooks
  });
  return Groups;
};
export default Group;
