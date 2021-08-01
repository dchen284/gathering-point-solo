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
        imgUrl: '/images/khm-139-goldspan-dragon.jpeg',
        location: 'Houston',
        organizerName: 'Card Corner',
        ownerId: 4,
      },
      {
        title: 'PT Qualifier (Historic)',
        eventBody: 'Bring your best Historic deck to qualify for the next PT!',
        startTime: timeTest,
        endTime: timeTest,
        imgUrl: '/images/sta-33-tainted-pact.jpeg',
        location: 'Houston',
        organizerName: 'Tolaria West',
        ownerId: 5,
      },
      {
        title: 'FNM at Game Place (Draft)',
        eventBody: 'Come play Draft to prove you are valedictorian of Strixhaven!',
        startTime: timeTest,
        endTime: timeTest,
        imgUrl: '/images/stx-198-lorehold-apprentice.jpeg',
        location: 'Houston',
        organizerName: 'Game Place',
        ownerId: 2,
      },
      {
        title: 'FNM at Game Place  (Standard)',
        eventBody: 'Come play Sealed to prove you are valedictorian of Strixhaven!',
        startTime: timeTest,
        endTime: timeTest,
        imgUrl: '/images/khm-139-goldspan-dragon.jpeg',
        location: 'Houston',
        organizerName: 'Game Place',
        ownerId: 2,
      },
      {
        title: 'Commander - Casual',
        eventBody: 'Commander!',
        startTime: timeTest,
        endTime: timeTest,
        imgUrl: '/images/stx-178-dina-soul-steeper.jpeg',
        location: 'Houston',
        organizerName: 'Kard Kiosk',
        ownerId: 3,
      },
      {
        title: 'Commander - Competitive',
        eventBody: 'Commander!',
        startTime: timeTest,
        endTime: timeTest,
        imgUrl: '/images/mh1-75-urza-lord-high-artificer.jpeg',
        location: 'Dallas',
        organizerName: 'Kard Kiosk',
        ownerId: 3,
      },
      {
        title: 'Commander!',
        eventBody: 'Commander!',
        startTime: timeTest,
        endTime: timeTest,
        imgUrl: '/images/stx-178-dina-soul-steeper.jpeg',
        location: 'Dallas',
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
