'use strict';
const bcrypt = require('bcryptjs');
const { Validator } = require("sequelize");

// const { Event, UserTicket } = require('../../db/models');
// const { Event } = require('./event');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
    profileImageUrl: {
      type: DataTypes.STRING,
    },

  },
  { //scope controls what is included and excluded from queries
    defaultScope: { //for default queries; i. e. User.findAll excludes the specified fields
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: { //e.g. User.scope('currentUser').findByPk(id) uses this scope
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: { //no exclusions for checking login credentials
        attributes: {},
      },
    },
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany( models.Event, {foreignKey: 'ownerId'} );

    User.belongsToMany(
      models.Event,
      {
        through: 'UserTicket',
        foreignKey: 'userId',
        otherKey: 'eventId',
      }
    );

    User.belongsToMany(
      models.Event,
      {
        through: 'UserBookmark',
        foreignKey: 'userId',
        otherKey: 'eventId',
      }
    );

    User.hasMany(
      models.UserBookmark,
      {
        foreignKey: 'userId',
        onDelete: 'cascade', hooks: true,
      });

    User.hasMany(
      models.UserTicket,
      {
        foreignKey: 'userId',
        onDelete: 'cascade', hooks: true,
      });

  };

  //User Model Methods
    //returns a safe object for JWT
  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username, email, profileImageUrl } = this; // context will be the User instance
    return { id, username, email, profileImageUrl };
  };
    //returns true/false for if password and hashedPassword line up
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
    //returns current user, using 'currentUser' scope
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };
    //find user, check if passwords match, return use if passwords match
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');

    const { Event, UserBookmark, UserTicket } = require('../models');

    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      // console.log('++++++++++++');
      // console.log('User', User);
      // console.log('UserBookmark', UserBookmark);
      // const test = await Event.findAll();

      const result = await User.scope('currentUser').findByPk(user.id, {
        include: [UserBookmark, UserTicket],
        // include: [
        //   {
        //     model: UserBookmark,
        //     nested: true,
        //     // attributes: { include: ['id'] },
        //   },
        //   {
        //     model: UserTicket,
        //     nested: true,
        //     // attributes: { include: ['id'] },
        //   },
        // ],
        // include: { all: true, nested: true }
      });
      // console.log('test', JSON.stringify(test, null, 4));
      return result;
    }
  };
    //create new user, return new user
  User.signup = async function ({ username, email, password, profileImageUrl }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      profileImageUrl,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};