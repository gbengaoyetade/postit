module.exports = (sequelize, DataTypes) => {
  const invalidToken = sequelize.define('invalidToken', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: () => {
      },
    },
  });
  return invalidToken;
};
