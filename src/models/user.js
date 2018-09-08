const BaseModel = require('./base-model.js');
const toUnnamed = require('named-placeholders')();
const Consts = require('../components/consts.js');
const _ = require('lodash');
const randomToken = require('random-token').create(Consts.RANDOM_SALT);
const bcrypt = require('bcryptjs');

/**
 * User model
 *
 */
class User extends BaseModel {
  /**
   * constructor
   *
   */
  constructor() {
    super();
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.address = '';
    this.mobile = '';
    this.password = '';
    this.token = '';
    this.active = '';
    this.created_at = '';
    this.updated_at = '';
  }

  /**
   * save
   *
   * @return {Promise}
   */
  save() {
    let me = this;
    return new Promise((resolve, reject) => {
      let connection = me.getConnection();
      let token = randomToken(32);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(me.password, salt, (err, hash) => {
          me.password = hash;
          let sql = toUnnamed(`
            INSERT INTO user(first_name, last_name, email, address, mobile,
              password, token, active, created_at, updated_at)
            VALUES(:first_name, :last_name, :email, :address, :mobile,
              :password, :token, :active, NOW(), NOW())
          `, {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            address: this.address,
            mobile: this.mobile,
            password: this.password,
            token: token,
            active: Consts.ACTIVE_YES,
          });
          connection.query(sql[0], sql[1], function(error, result, fields) {
            if (!error) {
              me.id = result.insertId;
              me.token = token;
              resolve(me);
            } else {
              reject(error.sqlMessage);
            }
          });
        });
      });
    });
  }

  /**
   * Create object from json
   *
   * @param {Object} json
   *
   * @return {User}
   *
   */
  static fromJson(json) {
    let user = new User();
    _.assign(user, json);
    return user;
  }

  /**
   * Find a record by id
   *
   * @param {Integer} id
   * @return {User}
   */
  static findById(id) {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM user WHERE id = ? LIMIT 1';
      let conn = User.getConnectionStatic();
      return conn.query(sql, [id], function(error, results, fields) {
        if (!error) {
          resolve(User.fromJson(results[0]));
        } else {
          reject(results.sqlMessage);
        }
      });
    });
  }


  /**
   * findByEmail
   *
   * @param {string} email
   *
   * @return {Promise}
   *
   */
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM user WHERE email = ? LIMIT 1';
      let conn = User.getConnectionStatic();
      return conn.query(sql, [email], function(error, results, fields) {
        console.log(error);
        if (!error) {
          resolve(User.fromJson(results[0]));
        } else {
          reject(results.sqlMessage);
        }
      });
    });
  }

  /**
   * findByEmail
   *
   * @param {string} token
   *
   * @return {Promise}
   *
   */
  static findByToken(token) {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM user WHERE token = ? LIMIT 1';
      let conn = User.getConnectionStatic();
      return conn.query(sql, [token], function(error, results, fields) {
        if (!error) {
          resolve(results.length ? User.fromJson(results[0]) : null);
        } else {
          reject(results.sqlMessage);
        }
      });
    });
  }

  /**
   * authenticate
   *
   * @param {string} email
   * @param {string} password
   *
   * @return {Promise}
   *
   */
  static authenticate(email, password) {
    let invalidMsg = 'Invalid credential';
    return new Promise((resolve, reject) => {
      User.findByEmail(email).then((user) => {
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
  }
}
module.exports = User;
