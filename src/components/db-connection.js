const config = require('../config/config.js');

let mysql = require('mysql');

// let connection = mysql.createConnection({
//   host: config.db.host,
//   user: config.db.user,
//   password: config.db.pass,
//   database: config.db.name,
//   multipleStatements: true,
// });

let pool = mysql.createPool({
  connectionLimit: 10,
  host: config.dbt,
  user: config.db.user,
  password: config.db.pass,
  database: config.db.name,
  multipleStatements: true,
});

module.exports = pool;
