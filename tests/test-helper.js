const conn = require('../src/components/db-connection.js');
const fs = require('fs');
const _ = require('lodash');

/**
 * TestHelper
 *
 */
class TestHelper {
  /**
   * The function to be run before any test case
   *
   * @return {Promise}
   */
  initDatabase() {
    return new Promise((resolve, reject) => {
      fs.readFile(__dirname + '/data.sql', 'utf8', function(err, sql) {
        if (_.isNull(err)) {
          conn.query(sql, function(err, results, fields) {
            if (!_.isNull(err)) {
              reject(err.sqlMessage);
            } else {
              resolve('Success');
            }
          });
        } else {
          reject(err);
        }
      });
    });
  }
};

module.exports = new TestHelper();
