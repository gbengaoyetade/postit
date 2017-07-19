module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('messages', {
    messageBody: {
      type: DataTypes.STRING,
    },
    messagePriority: {
      type: DataTypes.STRING,
    },

    groupId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.User);
        Message.belongsTo(models.groups);
      },
    },
  });
  return Message;
};
