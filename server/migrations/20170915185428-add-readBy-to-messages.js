module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('messages', 'readBy', {
      type: Sequelize.Array,
    });
  },

  down(queryInterface) {
    return queryInterface.removeColumn('messages', 'readBy');
  },
};
