module.exports = (sequelize, DataTypes) => {
  const groups = sequelize.define('groups', {
    group_name: DataTypes.STRING,
    group_description: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return groups;
};