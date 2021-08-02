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
    return queryInterface.bulkInsert('Categories',
    [
      {categoryName: 'Standard'},
      {categoryName: 'Historic'},
      {categoryName: 'Commander - Casual'},
      {categoryName: 'Draft'},
      {categoryName: 'Sealed'},
      {categoryName: 'Modern'},
      {categoryName: 'Legacy'},
      {categoryName: 'Commander - Competitive'},
      {categoryName: 'Other'},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
