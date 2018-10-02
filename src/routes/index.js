const authController = require('../controllers').auth;
const statisticController = require('../controllers').statistic;
const auth = require('../middleware/authenticate.js');

module.exports = (app) => {
  app.post('/auth/login', authController.login);
  app.post('/stats', auth, statisticController.create);
};
