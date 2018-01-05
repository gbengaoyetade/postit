export default (sequelize, DataTypes) => {
  const messages = sequelize.define('messages', {
    messageBody: {
      type: DataTypes.TEXT,
      allowNull: { value: false, msg: 'Message body cannot be null' },
      validate: {
        notEmpty: { value: true, msg: 'Message body cannot be empty' },
      },
    },
    messagePriority: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: { args: [['Normal', 'Urgent', 'Critical']],
          msg: 'Message priority can only be Normal, Urgent, or Critical' },
      },
    },

    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { value: true, msg: 'groupId cannot be empty' },
        isInt: { value: true, msg: 'groupId can only be a number' },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      notNull: true,
      validate: {
        notEmpty: { value: true, msg: 'userId cannot be empty' },
        isInt: { value: true, msg: 'userId can only be a number' },
      },
    },
  });
  messages.associate = (models) => {
    messages.belongsTo(models.users);
  };
  return messages;
};
