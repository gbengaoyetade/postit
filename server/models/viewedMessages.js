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
        // associations can be defined here
      },
    },
  });
  return viewedMessages;
};
