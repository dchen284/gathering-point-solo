'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      eventBody: {
        type: Sequelize.TEXT
      },
      startTime: {
        allowNull: false,
        type: Sequelize.STRING
      },
      endTime: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      organizerName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
        },
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};