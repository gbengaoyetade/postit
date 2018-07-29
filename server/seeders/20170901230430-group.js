module.exports = {
  up: queryInterface =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    queryInterface.bulkInsert(
      'groups',
      [
        {
          groupName: 'Postit',
          groupDescription: 'Postit default group',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: () => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
