'use strict';
const bcrypt = require('bcryptjs');
const Consts = require('../components/consts.js');
const randomToken = require('random-token').create(Consts.RANDOM_SALT);

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    timestamp: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'user',
  });
  User.hook('afterValidate', (user, options) => {
    if (user.isNewRecord) {
      return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(String(user.password), salt, (err, hash) => {
            if (err) {
              reject(err);
            } else {
              user.password = hash;
              resolve();
            }
          });
        });
      });
    }
  });
  User.hook('beforeValidate', (user, options) => {
    if (user.isNewRecord) {
      user.token = randomToken(Consts.TOKEN_LENGTH);
    }
  });
  User.authenticate = function(email, password) {
    let invalidMsg = 'Invalid credential';
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {email: email},
      }).then((user) => {
        bcrypt.compare(password, user.password, function(err, match) {
          if (match) {
            resolve(user);
          } else {
            reject(invalidMsg);
          }
        });
      }).catch((err) => {
        reject(err);
      });
    });
  };
  User.findByToken = function(token) {
    return User.findOne({
      where: {token: token},
    });
  };
  return User;
};
