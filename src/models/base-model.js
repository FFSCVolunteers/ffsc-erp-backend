'use strict';

const connection = require('../components/db-connection.js');

/**
 * Base class for all models
 */
class BaseModel {
  /**
   * Get primary key field
   *
   *
   * @return {String}
   *
   */
  static getPrimaryKeyField() {
    return 'id';
  }


  /**
   * Get a list of properties (fields) of this model
   *
   *
   * @return {ArrayPattern}
   *
   */
  static getProperties() {
    return [];
  }

  /**
   * Get connection object
   *
   * @return {DbConnection} Db connection
   */
  getConnection() {
    return connection;
  }

  /**
   * Get connection object in a static context
   *
   * @return {DbConnection} Db connection
   */
  static getConnectionStatic() {
    return connection;
  }
}

module.exports = BaseModel;
