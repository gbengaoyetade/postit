const bcrypt = require('bcrypt');

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(5);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('groups', [{
      groupName: 'Postit',
      groupDescription: 'Postit default group',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
