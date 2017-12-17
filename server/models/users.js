import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: /^[a-zA-Z0-9_]*$/,
          msg: 'Username cannot contain special characters aside from _' },
      },
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-zA-Z ]*$/,
          msg: 'Name can only contain alphabets' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { value: true, msg: 'Invalid email address supplied' },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { value: true, msg: 'Phonenumber is required' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: [6, 100], msg: 'Password must be at least 6 characters' },
        notEmpty: { value: true, msg: 'Password cannot be empty' },
      },
    },
  });

  Users.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  });
  Users.associate = (models) => {
    Users.belongsToMany(models.groups, {
      through: models.groupMembers,
      foreingKey: 'userId',
      onDelete: 'cascade',
    });
    Users.hasMany(models.messages);
  };
  return Users;
};
