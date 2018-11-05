module.exports = {
  development: {
    username: 'root',
    password: 'admin',
    database: 'ffsc',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  unit_test: {
    username: process.env.UNIT_TEST_DB_USER,
    password: process.env.UNIT_TEST_DB_PASS,
    database: process.env.UNIT_TEST_DB_NAME,
    host: process.env.UNIT_TEST_DB_HOST,
    dialect: 'mysql',
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: 'mysql',
  },
};
