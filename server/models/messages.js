module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('messages', {
    messageBody: DataTypes.STRING,
    messagePriority: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Message.hasOne(models.User);
      },
    },
  });
  return Message;
};