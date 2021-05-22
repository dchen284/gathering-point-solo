'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255],
      },
    },
    eventBody: {
      type: DataTypes.TEXT,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING,
    },
    organizerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255],
      },
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo( models.User, {foreignKey: 'ownerId'} );
    Event.belongsToMany(
      models.User,
      {
        through: 'UserTicket',
        foreignKey: 'eventId',
        otherKey: 'userId',
      }
    );
    Event.belongsToMany(
      models.User,
      {
        through: 'UserBookmark',
        foreignKey: 'eventId',
        otherKey: 'userId',
      }
    );
    Event.belongsToMany(
      models.Category,
      {
        through: 'EventCategory',
        foreignKey: 'eventId',
        otherKey: 'categoryId',
      }
    );
  };
  return Event;
};