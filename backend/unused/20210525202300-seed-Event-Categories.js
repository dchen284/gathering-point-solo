'use strict';

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
      return queryInterface.bulkInsert('EventCategories',
      [
        {eventId: 1, categoryId: 1},
        {eventId: 2, categoryId: 2},
        {eventId: 3, categoryId: 4},
        {eventId: 4, categoryId: 2},
        {eventId: 5, categoryId: 3},
        {eventId: 6, categoryId: 8},
        {eventId: 7, categoryId: 3},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
      return queryInterface.bulkDelete('EventCategories', null, {});
  }
};
