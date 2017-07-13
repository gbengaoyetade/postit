const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z0-9_]*$/,   
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { value: true, msg: 'The input value in email field is not a valid email address '},
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args:[6,100], msg: 'Password must be at least 6 characters' },
      },
    },
  },
  {
    classMethods: {
      associate: (models) => {
      Users.belongsToMany(models.groups);
      },
      
      },
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync(5);
          const hash = bcrypt.hashSync(user.password, salt);
          user.password = hash;
        },
    },
  });
  return Users;
};
