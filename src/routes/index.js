const authController = require('../controllers').auth;
const statisticController = require('../controllers').statistic;
const auth = require('../middleware/authenticate.js');

module.exports = (app) => {
  app.post('/auth/login', authController.login);
  app.post('/auth/register', authController.register);
  app.put('/stats', auth, statisticController.createOrUpdate);
  app.get('/stats/:id', auth, statisticController.get);
  app.get('/stats/:center_id/:month/:year', auth, statisticController.getByMonthYear);
};
