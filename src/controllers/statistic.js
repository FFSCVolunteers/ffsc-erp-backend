const _ = require('lodash');
const Statistic = require('../models').Statistic;
const Sequelize = require('sequelize');

module.exports = {
  createOrUpdate: (req, res) => {
    let body = _.pick(req.body, ['month', 'year', 'center_id', 'stats']);
    let sendResult = (stat) => {
      res.send({
        id: stat.id,
        month: stat.month,
        year: stat.year,
        stats: {
          number_of_new_students: stat.number_of_new_students,
          number_of_new_scholarships: stat.number_of_new_scholarships,
          number_of_excellent_students: stat.number_of_excellent_students,
        },
        center_id: stat.center_id,
      });
    };
    let data = {
      month: req.body.month,
      year: req.body.year,
      number_of_new_students: body.stats.number_of_new_students,
      number_of_new_scholarships: body.stats.number_of_new_scholarships,
      number_of_excellent_students: body.stats.number_of_excellent_students,
      center_id: body.center_id,
      inputted_by: req.user.id,
    };
    Statistic.findByMonthYear(req.body.month, req.body.year, req.body.center_id).then((model) => {
      if (model) {
        model.update(data).then((stat) => {
          sendResult(stat);
        }).catch(Sequelize.ValidationError, (err) => {
          let msg = err.errors[0].message;
          res.status(400).send({message: msg});
        });
      } else {
        Statistic.create(data).then((stat) => {
          sendResult(stat);
        }).catch(Sequelize.ValidationError, (err) => {
          let msg = err.errors[0].message;
          res.status(400).send({message: msg});
        });
      }
    });
  },
  get: (req, res) => {
    let params = req.params;
    Statistic.findOne({
      where: {id: params.id},
    }).then((stat) => {
      if (stat) {
        res.send(stat.formatData());
      } else {
        res.status(404).send(null);
      }
    });
  },
  getByMonthYear: (req, res) => {
    let params = req.params;
    Statistic.findByMonthYear(params.month, params.year, params.center_id).then((stat) => {
      if (stat) {
        res.send(stat.formatData());
      } else {
        res.status(404).send(null);
      }
    });
  },
};
