'use strict';
const bcrypt = require('bcryptjs');
const { Validator } = require("sequelize");

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
        through: 'UserTicket',
        foreignKey: 'userId',
        otherKey: 'eventId',
      }
    );
  };

  //User Model Methods
    //returns a safe object for JWT
  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
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
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };
    //create new user, return new user
  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};