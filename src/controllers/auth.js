const User = require('../models').User;
const _ = require('lodash');

module.exports = {
  login: (req, res) => {
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
  },

  register: (req, res) => {
    let body = _.pick(req.body, ['email', 'password', 'first_name', 'last_name']);
    console.log('request body: ', req.body);
    console.log('found body: ', body);

    User.create(body).then((user) => {
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
  },
};
