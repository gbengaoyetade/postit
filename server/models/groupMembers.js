
export default (sequelize, DataTypes) => {
  const groupMembers = sequelize.define('groupMembers', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { args: true, msg: 'User Id can only be an integer' },
      },
    },
    addedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { args: true, msg: 'User Id can only be an integer' },
      },
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { args: true, msg: 'User Id can only be an integer' },
      },
    },
  }, {
    classMethods: {
      associate: () => {
      },
    },
  });
  return groupMembers;
};
