'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryName: DataTypes.STRING(60)
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    // Category.belongsToMany(
    //   models.Event,
    //   {
    //     through: 'EventCategory',
    //     foreignKey: 'categoryId',
    //     otherKey: 'eventId',
    //   }
    // );
    
    Category.hasMany(
      models.Event,
      {foreignKey: 'categoryId'}
    );

  };
  return Category;
};