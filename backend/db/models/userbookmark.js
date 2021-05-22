'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserBookmark = sequelize.define('UserBookmark', {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  UserBookmark.associate = function(models) {
    // associations can be defined here
  };
  return UserBookmark;
};