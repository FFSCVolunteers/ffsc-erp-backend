const BaseModel = require('./base-model.js');
const toUnnamed = require('named-placeholders')();

/**
 * Statistic model
 *
 */
class Statistic extends BaseModel {
  /**
   * constructor
   *
   */
  constructor() {
    super();
    this.year = null;
    this.month = null;
    this.month_year = null;
    this.center_id = null;
    this.number_of_new_students = 0;
    this.number_of_scholarships = 0;
    this.number_of_excellent_students = 0;
    this.inputted_by = null;
    this.created_at = null;
    this.updated_at = null;
  }


  /**
   * Get month year combination as month-year
   *
   *
   * @return {string}
   *
   */
  getMonthYear() {
    return this.month + '-' + this.year;
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
      let sql = toUnnamed(`
        INSERT INTO statistic(year, month, month_year, center_id,
          number_of_new_students, number_of_scholarships,
          number_of_excellent_students, inputted_by)
        VALUES(:year, :month, :month_year, :center_id, :number_of_new_students,
          :number_of_scholarships, :number_of_excellent_students, :inputted_by);
      `, {
        year: this.year,
        month: this.month,
        month_year: this.getMonthYear(),
        center_id: this.center_id,
        number_of_new_students: this.number_of_new_students,
        number_of_scholarships: this.number_of_scholarships,
        number_of_excellent_students: this.number_of_excellent_students,
        inputted_by: this.inputted_by,
      });
      connection.query(sql[0], sql[1], function(error, result, fields) {
        if (!error) {
          me.id = result.insertId;
          resolve(me);
        } else {
          reject(error.sqlMessage);
        }
      });
    });
  };

  /**
   * findByEmail
   *
   * @param {int} centerId
   *
   * @return {Promise}
   *
   */
  static findAllByCenter(centerId) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT id, year, number_of_new_students,
        number_of_scholarships, number_of_excellent_students
        FROM statistic
      `;
      let conn = Statistic.getConnectionStatic();
      return conn.query(sql, [], function(error, results, fields) {
        if (!error) {
          let items = [];
          results.forEach((item) => {
            items.push({
              year: item['year'],
              month: item['month'],
              stat: {
                number_of_new_students: item['number_of_new_students'],
                number_of_scholarships: item['number_of_scholarships'],
                number_of_excellent_students: item['number_of_excellent_students'],
              },
            });
          });
          resolve(items);
        } else {
          reject(results.sqlMessage);
        }
      });
    });
  }
}

module.exports = Statistic;
