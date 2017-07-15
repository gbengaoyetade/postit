module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      messageBody: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      messagePriority: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      groupId: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('messages'),
};
