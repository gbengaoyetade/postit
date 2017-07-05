'use strict';
module.exports = function(sequelize, DataTypes) {
  let posts = sequelize.define('posts', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    created_by: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return posts;
};