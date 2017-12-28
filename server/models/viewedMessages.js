module.exports = (sequelize, DataTypes) => {
  const viewedMessages = sequelize.define('viewedMessages', {
    messageId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: () => {
      },
    },
  });
  return viewedMessages;
};
