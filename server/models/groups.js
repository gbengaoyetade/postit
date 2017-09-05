import Users from './users';

export default (sequelize, DataTypes) => {
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
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { args: true, msg: 'User Id can only be an integer' },
      },
    },
  });
  Groups.associate = (models) => {
    Groups.belongsToMany(models.users, {
      through: models.groupMembers,
      foreignKey: 'groupId',
      onDelete: 'cascade',
    });
  };
  return Groups;
};

