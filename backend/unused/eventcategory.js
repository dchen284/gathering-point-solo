'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventCategory = sequelize.define('EventCategory', {
    eventId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  EventCategory.associate = function(models) {
    // associations can be defined here
  };
  return EventCategory;
};