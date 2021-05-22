'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserTicket = sequelize.define('UserTicket', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  UserTicket.associate = function(models) {
    // associations can be defined here
  };
  return UserTicket;
};