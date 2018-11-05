const User = require('../../models').User;
const _ = require('lodash');

module.exports = (req, res) => {
  let body = _.pick(req.body, ['email', 'password', 'first_name', 'last_name']);

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
};
