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
        title: 'Welcome Back!  FNM Standard!',
        eventBody:
          'Hey everyone! Love Your LGS promotions are BACK for tournament entry, starting with Standard FNM at 7PM! ' +
          'This week\'s promo will be Goblin Guide! All who play in the tournament will receive a promo on entry! Each week ' +
          'we\'ll rotate the promo offered!  Remember, we have spots for 16 players max in the tournament, with entry fee ' +
          'being $5 and pay out in store credit! Swing on by tonight for the tournament at 7!'
          ,
        startTime: '2021-08-20T19:00:00',
        endTime: '2021-08-20T22:00:00',
        imgUrl: '/images/khm-139-goldspan-dragon.jpeg',
        location: 'Katy, TX',
        organizerName: '3rd Coast Cards',
        ownerId: 4,
        categoryId: 1,
      },
      {
        title: 'FNM Standard at Gen X!',
        eventBody:
        'Hey everyone! Come play Standard at FNM while talking about the next set! FNM at 7PM, with $5 entry ' +
        'fee. We have seating for 16 max, and we\'ll be doing 3 rounds max, with store credit for prize support and FNM ' +
        'promo packs to entrants!  We also have some new singles, so if you\'re looking for any new cards, check it out! ' +
        'Sealed product is also available in store! Call in or come in for details!'
        ,
        startTime: '2021-08-20T20:00:00',
        endTime: '2021-08-20T23:00:00',
        imgUrl: '/images/khm-41-alrund-s-epiphany.jpeg',
        location: 'Dallas, TX',
        organizerName: 'Gen X Games',
        ownerId: 5,
        categoryId: 1,
      },
      {
        title: 'FNM Standard at Gen X!',
        eventBody:
        'Hey everyone! Come play Standard at FNM while talking about the next set! FNM at 7PM, with $5 entry ' +
        'fee. We have seating for 16 max, and we\'ll be doing 3 rounds max, with store credit for prize support and FNM ' +
        'promo packs to entrants!  We also have some new singles, so if you\'re looking for any new cards, check it out! ' +
        'Sealed product is also available in store! Call in or come in for details!'
        ,
        startTime: '2021-08-27T20:00:00',
        endTime: '2021-08-27T23:00:00',
        imgUrl: '/images/khm-41-alrund-s-epiphany.jpeg',
        location: 'Dallas, TX',
        organizerName: 'Gen X Games',
        ownerId: 5,
        categoryId: 1,
      },
      {
        title: 'FNM Standard at Gen X!',
        eventBody:
        'Hey everyone! Come play Standard at FNM while talking about the next set! FNM at 7PM, with $5 entry ' +
        'fee. We have seating for 16 max, and we\'ll be doing 3 rounds max, with store credit for prize support and FNM ' +
        'promo packs to entrants!  We also have some new singles, so if you\'re looking for any new cards, check it out! ' +
        'Sealed product is also available in store! Call in or come in for details!'
        ,
        startTime: '2021-09-03T20:00:00',
        endTime: '2021-09-03T23:00:00',
        imgUrl: '/images/khm-41-alrund-s-epiphany.jpeg',
        location: 'Dallas, TX',
        organizerName: 'Gen X Games',
        ownerId: 5,
        categoryId: 1,
      },
      {
        title: 'SCG Tour Online Satellite - Standard',
        eventBody:
        'Registration:  ' +
        '* Registration for all SCG Tour Online Satellite events will close 10 minutes prior to each event.  ' +
        '* No late registrations will be allowed.' +
        '* Players must have a verified Discord account to register.' +
        '* Players are expected to have joined, and to be available on, the SCG Tour Online Discord during SCG Tour Satellite events.'
        ,
        startTime: '2021-08-20T20:00:00',
        endTime: '2021-08-20T23:00:00',
        imgUrl: '/images/stx-259-strixhaven-stadium.jpeg',
        location: 'Online on MTG:Arena',
        organizerName: 'Star City Games',
        ownerId: 5,
        categoryId: 1,
      },
      {
        title: 'Be Strixhaven Valedictorian! (Historic)',
        eventBody:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit velit eget lorem volutpat auctor. Nullam eget nunc quam. Aenean eget lectus ipsum. ' +
        'Vestibulum non elementum nunc. Donec porttitor ligula purus, et dignissim augue ullamcorper ut. Maecenas augue diam, posuere vitae risus blandit, mollis dignissim ' +
        'libero. Aliquam venenatis, diam sed semper mattis, mi velit euismod dolor, non facilisis libero lectus id est. Sed vulputate in diam non viverra. Curabitur nulla ' +
        'sem, fringilla a congue eget, volutpat id orci. Aliquam tempus sit amet orci eget rhoncus. Vivamus ornare faucibus tempus. Nullam in ipsum sed lectus hendrerit ' +
        'scelerisque faucibus ac sem. Morbi ut eros fringilla, efficitur eros a, molestie orci. Nunc non erat est. Vivamus vel nunc eget elit porttitor blandit.'
        ,
        startTime: '2021-08-20T20:00:00',
        endTime: '2021-08-20T23:00:00',
        imgUrl: '/images/stx-264-the-biblioplex.jpeg',
        location: 'Houston, TX',
        organizerName: 'The Bibiloplex',
        ownerId: 5,
        categoryId: 2,
      },
      {
        title: 'SCG Tour Online Satellite - Historic',
        eventBody:
        'Registration:  ' +
        '* Registration for all SCG Tour Online Satellite events will close 10 minutes prior to each event.  ' +
        '* No late registrations will be allowed.' +
        '* Players must have a verified Discord account to register.' +
        '* Players are expected to have joined, and to be available on, the SCG Tour Online Discord during SCG Tour Satellite events.'
        ,
        startTime: '2021-08-20T20:00:00',
        endTime: '2021-08-20T23:00:00',
        imgUrl: '/images/stx-259-strixhaven-stadium.jpeg',
        location: 'Online on MTG:Arena',
        organizerName: 'Star City Games',
        ownerId: 5,
        categoryId: 2,
      },
      {
        title: 'Can Anyone Beat Pact?',
        eventBody:
        'Cras eget condimentum libero. Nulla dapibus dignissim sagittis. Pellentesque ultrices nec massa vel luctus. Etiam non tellus ' +
        'quis purus accumsan efficitur. Suspendisse interdum lobortis ipsum in egestas. Etiam sit amet ullamcorper nisl. Vivamus eget ' +
        'magna eu dui volutpat dignissim. Vestibulum dolor massa, lobortis a porta vel, egestas sed mauris. Integer a elementum felis.'
        ,
        startTime: '2021-09-18T13:30:00',
        endTime: '2021-09-18T16:30:00',
        imgUrl: '/images/sta-33-tainted-pact.jpeg',
        location: 'The Leaky Cauldron',
        organizerName: 'Columbus, OH',
        ownerId: 3,
        categoryId: 2,
      },
      {
        title: 'Tuesday Night Commander',
        eventBody:
        'Aliquam purus libero, ullamcorper nec dui in, vulputate porta diam. Nulla pretium luctus magna vulputate commodo. Sed pretium ' +
        'cursus nibh et consectetur. Aliquam purus felis, interdum non ultrices id, maximus eget lectus. Nullam ultrices enim ut ex ' +
        'viverra, id sodales odio condimentum. Suspendisse mauris nisi, condimentum non felis quis, placerat ultricies enim. Vestibulum ' +
        'ut congue neque, eget ornare dui. Quisque in urna lorem. Donec vel magna mollis turpis dapibus elementum. Mauris pharetra dapibus ' +
        'enim molestie sagittis. Sed nisl orci, semper at nibh nec, ornare feugiat massa.'
        ,
        startTime: '2021-09-07T19:00:00',
        endTime: '2021-09-07T22:00:00',
        imgUrl: '/images/stx-178-dina-soul-steeper.jpeg',
        location: 'Tiger Cards & Games',
        organizerName: 'Cincinnati, OH',
        ownerId: 3,
        categoryId: 3,
      },
      {
        title: 'New to EDH?  Join Us at Eudemonia!',
        eventBody:
        'Aliquam purus libero, ullamcorper nec dui in, vulputate porta diam. Nulla pretium luctus magna vulputate commodo. Sed pretium ' +
        'cursus nibh et consectetur. Aliquam purus felis, interdum non ultrices id, maximus eget lectus. Nullam ultrices enim ut ex ' +
        'viverra, id sodales odio condimentum. Suspendisse mauris nisi, condimentum non felis quis, placerat ultricies enim. Vestibulum ' +
        'ut congue neque, eget ornare dui. Quisque in urna lorem. Donec vel magna mollis turpis dapibus elementum. Mauris pharetra dapibus ' +
        'enim molestie sagittis. Sed nisl orci, semper at nibh nec, ornare feugiat massa.'
        ,
        startTime: '2021-08-20T19:30:00',
        endTime: '2021-09-07T22:30:00',
        imgUrl: 'images/stx-227-rootha-mercurial-artist.jpeg',
        location: 'Eudemonia',
        organizerName: 'Berkeley, CA',
        ownerId: 3,
        categoryId: 3,
      },
      {
        title: 'Fun Casual EDH',
        eventBody:
        'Nullam nec tristique augue. Proin congue tellus dictum tortor rhoncus ullamcorper. Suspendisse in mi mi. Ut efficitur suscipit ' +
        'mauris, eu suscipit arcu imperdiet non. Aenean placerat nulla eu purus molestie efficitur. Curabitur ornare velit ex, nec ' +
        'venenatis urna fermentum ac. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum ' +
        'ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut convallis scelerisque elit, sed porta neque ' +
        'pulvinar in. Suspendisse nec auctor arcu. Donec auctor, ligula non sodales tristique, tellus sem faucibus felis, ut iaculis nibh ' +
        'purus id augue.'
        ,
        startTime: '2021-08-20T19:30:00',
        endTime: '2021-09-07T22:30:00',
        imgUrl: 'images/stx-155-plargg-dean-of-chaos.jpeg',
        location: 'Suzaku Games',
        organizerName: 'Phoenix, AZ',
        ownerId: 3,
        categoryId: 3,
      },
      {
        title: 'Friday Night Drafting',
        eventBody:
        'Hey everyone! Come Draft tonight at 7PM! ' +
        'This week\'s promo will be Goblin Guide! All who play in the tournament will receive a promo on entry! Each week ' +
        'we\'ll rotate the promo offered!  Remember, we have spots for 16 players max in the tournament, with entry fee ' +
        'being $5 and pay out in store credit! Swing on by tonight for the tournament at 7!'
        ,
        startTime: '2021-08-20T19:00:00',
        endTime: '2021-08-20T22:00:00',
        imgUrl: '/images/stx-211-pest-summoning.jpeg',
        location: 'Katy, TX',
        organizerName: '3rd Coast Cards',
        ownerId: 2,
        categoryId: 4,
      },
      {
        title: 'Friday Night Drafting',
        eventBody:
        'Hey everyone! Come Draft tonight at 7PM! ' +
        'This week\'s promo will be Goblin Guide! All who play in the tournament will receive a promo on entry! Each week ' +
        'we\'ll rotate the promo offered!  Remember, we have spots for 16 players max in the tournament, with entry fee ' +
        'being $5 and pay out in store credit! Swing on by tonight for the tournament at 7!'
        ,
        startTime: '2021-08-27T19:00:00',
        endTime: '2021-08-27T22:00:00',
        imgUrl: '/images/stx-211-pest-summoning.jpeg',
        location: 'Katy, TX',
        organizerName: '3rd Coast Cards',
        ownerId: 2,
        categoryId: 4,
      },
      {
        title: 'Friday Night Drafting',
        eventBody:
        'Hey everyone! Come Draft tonight at 7PM! ' +
        'This week\'s promo will be Goblin Guide! All who play in the tournament will receive a promo on entry! Each week ' +
        'we\'ll rotate the promo offered!  Remember, we have spots for 16 players max in the tournament, with entry fee ' +
        'being $5 and pay out in store credit! Swing on by tonight for the tournament at 7!'
        ,
        startTime: '2021-09-03T19:00:00',
        endTime: '2021-09-03T22:00:00',
        imgUrl: '/images/stx-211-pest-summoning.jpeg',
        location: 'Katy, TX',
        organizerName: '3rd Coast Cards',
        ownerId: 2,
        categoryId: 4,
      },
      {
        title: '$5k High Stakes Vintage Tournament',
        eventBody:
        'Donec at odio lobortis, sagittis ipsum vitae, ornare neque. Integer varius, orci quis aliquam condimentum, dolor ' +
        'eros faucibus est, at elementum orci turpis vitae est. Quisque egestas odio eget mattis consectetur. Curabitur at ' +
        'gravida turpis, ut varius lacus. Donec vestibulum finibus purus, non rutrum nisi convallis id. Phasellus mi sapien, ' +
        'venenatis a est non, consectetur feugiat libero. Vestibulum eu enim est. Nam finibus, diam et eleifend varius, orci ' +
        'sapien ornare sem, non consequat elit tortor quis orci. Phasellus faucibus pulvinar posuere. Sed facilisis lorem nec ' +
        'magna imperdiet pulvinar. Cras at leo tristique, posuere diam non, blandit magna. Nullam eros est, imperdiet eget ' +
        'malesuada non, pulvinar sit amet mauris.'
        ,
        startTime: '2021-08-22T19:00:00',
        endTime: '2021-08-22T22:00:00',
        imgUrl: '/images/lea-232-black-lotus.jpeg',
        location: 'New York, NY',
        organizerName: 'Elysium Fields',
        ownerId: 5,
        categoryId: 5,
      },
      {
        title: 'Play Canadian Highlander with LRR!',
        eventBody:
        'Join us at Yellowjacket for a fun day of casual Canadian Highlander games, hosted by the illustrious LoadingReadyRun ' +
        'crew!  Whether you are a veteran or brand-new to the format, all are welcome to join the games.  Meet the wonderful ' +
        'comedians from LoadingReadyRun in person!  Some special merchandise from LoadingReadyRun will be available for sale, ' +
        'be sure to come early to grab your goodies!'
        ,
        startTime: '2021-08-21T14:00:00',
        endTime: '2021-08-21T17:00:00',
        imgUrl: '/images/poster_with_borders_large.png',
        location: 'Victoria, BC',
        organizerName: 'Yellowjacket',
        ownerId: 5,
        categoryId: 5,
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
