const Statistic = require('../../models').Statistic;

module.exports = (req, res) => {
  let params = req.params;
  Statistic.findByMonthYear(params.month, params.year, params.center_id).then((stat) => {
    if (stat) {
      res.send(stat.formatData());
    } else {
      res.status(404).send(null);
    }
  });
};
