const _ = require('lodash');
const Statistic = require('../models').Statistic;
const Sequelize = require('sequelize');

module.exports = {
  create: (req, res) => {
    let body = _.pick(req.body, ['month', 'year', 'center_id', 'stats']);
    Statistic.create({
      month: req.body.month,
      year: req.body.year,
      number_of_new_students: body.stats.number_of_new_students,
      number_of_scholarships: body.stats.number_of_scholarships,
      number_of_excellent_students: body.stats.number_of_excellent_students,
      center_id: body.center_id,
      inputted_by: req.user.id,
    }).then((stat) => {
      res.send({
        id: stat.id,
        month: stat.month,
        year: stat.year,
        stats: {
          number_of_new_students: stat.number_of_new_students,
          number_of_scholarships: stat.number_of_scholarships,
          number_of_excellent_students: stat.number_of_excellent_students,
        },
        center_id: stat.center_id,
      });
    }).catch(Sequelize.ValidationError, (err) => {
      let msg = err.errors[0].message;
      res.status(400).send({message: msg});
    });
  },
};
