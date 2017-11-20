export default (sequelize, DataTypes) => {
  const Groups = sequelize.define('groups', {
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Group name cannot be empty' },
        len: {
          args: [1, 255],
          msg: 'Group name cannot be more than 255 characters' }
      },
    },
    groupDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Group description cannot be empty' },
        len: {
          args: [1, 255],
          msg: 'Group description cannot be more than 255 characters' }
      },
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
    Groups.hasMany(models.messages, {
      foreignKey: 'groupId',
    });
  };
  return Groups;
};

