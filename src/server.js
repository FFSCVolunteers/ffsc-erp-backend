require('dotenv').config();
const express = require('express');
const BodyParser = require('body-parser');
const _ = require('lodash');
const User = require('./models/user.js');
const auth = require('./middleware/authenticate.js');
const Statistic = require('./models/statistic.js');

let app = express();
app.use(BodyParser.json());

app.post('/stats', auth, (req, res) => {
  let body = _.pick(req.body, ['month', 'year', 'stats']);
  let stat = new Statistic();
  stat.month = req.body.month;
  stat.year = req.body.year;
  stat.number_of_new_students = body.stats.number_of_new_students;
  stat.number_of_scholarships = body.stats.number_of_scholarships;
  stat.number_of_excellent_students = body.stats.number_of_excellent_students;
  stat.center_id = 1;
  stat.inputted_by = req.user.id;
  stat.save().then((result) => {
    res.send({
      month: stat.month,
      year: stat.year,
      stats: {
        number_of_new_students: stat.number_of_new_students,
        number_of_scholarships: stat.number_of_scholarships,
        number_of_excellent_students: stat.number_of_excellent_students,
      },
    });
  }).catch((err) => {
    console.log(err);
  });
});

app.get('/stats', auth, (req, res) => {
  Statistic.findAllByCenter().then((items) => {
    res.send(items);
  }).catch((err) => {
    console.log(err);
  });
});

app.post('/auth/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  User.authenticate(body.email, body.password).then((user) => {
    res.send({
      token: user.token,
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  }).catch((err) => {
    res.status(401).send({message: err});
  });
});

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
