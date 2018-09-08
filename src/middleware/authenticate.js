const User = require('../models/user.js');
const _ = require('lodash');

const message = 'Invalid credential';
let authenticate = function(req, res, next) {
  let token = req.header('x-auth');

  if (_.isNull(token)) {
    res.status(401).send({message});
  } else {
    User.findByToken(token).then((user) => {
      if (!user) {
        res.status(401).send({message});
      } else {
        req.user = user;
        req.token = token;
        next();
      }
    }).catch((e) => {
      res.status(401).send({message});
    });
  }
};
module.exports = authenticate;
