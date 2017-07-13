'use strict';
module.exports = function(sequelize, DataTypes) {
  var viewed_posts = sequelize.define('viewed_posts', {
    post_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return viewed_posts;
};