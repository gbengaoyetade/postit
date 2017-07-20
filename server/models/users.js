import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: { args: /^[a-zA-Z0-9_]*$/, msg: 'Username cannot contain special characters aside from _' },
        notEmpty: { value: true, msg: 'Username cannot be empty' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { value: true, msg: 'Invalid email address supplied' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: [6, 100], msg: 'Password must be at least 6 characters' },
      },
    },
  },
    {
      classMethods: {
        associate: (models) => {
          Users.belongsToMany(models.groups, {
            through: models.groupMembers,
            foreignKey: 'groupId',
          });
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
