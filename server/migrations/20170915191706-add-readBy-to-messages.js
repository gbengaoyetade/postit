module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('messages', 'readBy', {
      type: Sequelize.INTEGER,
    });
  },

  down(queryInterface) {
    return queryInterface.removeColumn('messages', 'readBy');
  },
};
