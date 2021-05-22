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
  return queryInterface.bulkInsert('Events',
    [
      {
        title: 'FNM at Card Corner (Standard)',
        eventBody: 'Bring your best Standard Deck to prove you are valedictorian of Strixhaven!',
        startTime: new Date(),
        endTime: new Date(),
        imgUrl: '',
        organizerName: 'Card Corner',
        ownerId: 4,
      },
      {
        title: 'PT Qualifier (Historic)',
        eventBody: 'Bring your best Historic deck to qualify for the next PT!',
        startTime: new Date(),
        endTime: new Date(),
        imgUrl: '',
        organizerName: 'Tolaria West',
        ownerId: 5,
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
    return queryInterface.bulkDelete('Events', null, {});
  }
};
