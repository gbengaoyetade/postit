module.exports = (sequelize, DataTypes) => {
  const invalidToken = sequelize.define('invalidToken', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: () => {
        // associations can be defined here
      },
    },
  });
  return invalidToken;
};
