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
    return queryInterface.bulkInsert('users', [{
      username: 'martins',
      email: 'martins@gmail.com',
      phoneNumber: '08066152234',
      fullName: 'martins etim',
      password: 'password',
    },
    {
      username: 'mark',
      email: 'mark@gmail.com',
      phoneNumber: '08066152233',
      fullName: 'mark',
      password: 'password',
    },
    {
      username: 'george',
      email: 'george@gmail.com',
      phoneNumber: '08066152235',
      fullName: 'george benson',
      password: 'password',
    },
    {
      username: 'segun',
      email: 'segun@gmail.com',
      phoneNumber: '08066152237',
      fullName: 'segun ola',
      password: 'password',
    },
    {
      username: 'Michael',
      email: 'mic@gmail.com',
      phoneNumber: '08066152244',
      fullName: 'Michael bolton',
      password: 'password',
    },
    {
      username: 'etim',
      email: 'etim@gmail.com',
      phoneNumber: '08066152233',
      fullName: 'Raphael',
      password: 'password',
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
