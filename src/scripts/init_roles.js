const Role = require('./models').Role;
const _ = require('lodash');

Role.findById(1).then((role) => {
  if (_.isNull(role)) {
    Role.create({
      id: 1,
      name: 'Admin',
    });
  }
});

Role.findById(2).then((role) => {
  if (_.isNull(role)) {
    Role.create({
      id: 2,
      name: 'Center Admin',
    });
  }
});
