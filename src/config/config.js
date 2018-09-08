let env = process.env.NODE_ENV || 'development';
require('dotenv').config();

let config = {
  development: {
    db: {
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
    },
  },
  unit_test: {
    db: {
      host: process.env.UNIT_TEST_DB_HOST,
      name: process.env.UNIT_TEST_DB_NAME,
      user: process.env.UNIT_TEST_DB_USER,
      pass: process.env.UNIT_TEST_DB_PASS,
    },
  },
  staging: {
    db: {
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
    },
  },
  production: {
    db: {
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
    },
  },
};

module.exports = config[env];
