require('dotenv').config();
const mysql = require('mysql');
const migration = require('mysql-migration');

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

migration.init(connection, __dirname + '/migrations')
