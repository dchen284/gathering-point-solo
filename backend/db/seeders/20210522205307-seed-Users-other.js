'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users',
    [
      {
        email: 'embrose@strixhaven.com',
        username: 'DeanEmbrose',
        hashedPassword: bcrypt.hashSync('Password1!'),
      },
      {
        email: 'teferi@time.com',
        username: 'Teferi',
        hashedPassword: bcrypt.hashSync('Password1!'),
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
      return queryInterface.bulkDelete('Users', null, {});
  }
};
