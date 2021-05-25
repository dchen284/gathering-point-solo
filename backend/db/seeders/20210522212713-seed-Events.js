'use strict';

const timeTest = '1998-05-24T23:22:37';

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
        startTime: timeTest,
        endTime: timeTest,
        imgUrl: '',
        organizerName: 'Card Corner',
        ownerId: 4,
      },
      {
        title: 'PT Qualifier (Historic)',
        eventBody: 'Bring your best Historic deck to qualify for the next PT!',
        startTime: timeTest,
        endTime: timeTest,
        imgUrl: '',
        organizerName: 'Tolaria West',
        ownerId: 5,
      },
      {
        title: 'FNM at Game Place (Draft)',
        eventBody: 'Come play Draft to prove you are valedictorian of Strixhaven!',
        startTime: timeTest,
        endTime: timeTest,
        imgUrl: '',
        organizerName: 'Game Place',
        ownerId: 2,
      },
      {
        title: 'FNM at Game Place  (Standard)',
        eventBody: 'Come play Sealed to prove you are valedictorian of Strixhaven!',
        startTime: timeTest,
        endTime: timeTest,
        imgUrl: '',
        organizerName: 'Game Place',
        ownerId: 2,
      },
      {
        title: 'Commander - Casual',
        eventBody: 'Commander!',
        startTime: timeTest,
        endTime: timeTest,
        imgUrl: '',
        organizerName: 'Kard Kiosk',
        ownerId: 3,
      },
      {
        title: 'Commander - Competitive',
        eventBody: 'Commander!',
        startTime: timeTest,
        endTime: timeTest,
        imgUrl: '',
        organizerName: 'Kard Kiosk',
        ownerId: 3,
      },
      {
        title: 'should not show',
        eventBody: 'Commander!',
        startTime: timeTest,
        endTime: timeTest,
        imgUrl: '',
        organizerName: 'Kard Kiosk',
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
