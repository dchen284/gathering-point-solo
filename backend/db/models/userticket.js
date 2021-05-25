'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserTicket = sequelize.define('UserTicket', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  UserTicket.associate = function(models) {
    // associations can be defined here

    UserTicket.belongsTo( models.User, {foreignKey: 'userId'});

    UserTicket.belongsTo( models.Event, {foreignKey: 'eventId'})
  };
  return UserTicket;
};