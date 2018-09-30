const yargs = require('yargs');
const Consts = require('../components/consts.js');
const Center = require('../models').Center;
const User = require('../models').User;
const UserRole = require('../models').UserRole;

const argv = yargs.argv;
let command = argv._[0];

switch (command) {
case 'center':
  let name = argv.name;
  let address = argv.address;
  Center.create({
    name: name,
    address: address,
  });
  break;
case 'user':
  let firstName = argv.first_name;
  let lastName = argv.last_name;
  let email = argv.email;
  let password = argv.password;
  let roleId = argv.role_id;
  let centerId = argv.center_id;
  User.create({
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
    active: Consts.ACTIVE_YES,
  }).then((user) => {
    if (roleId) {
      UserRole.create({
        user_id: user.getDataValue('id'),
        role_id: roleId,
        center_id: centerId,
      }).then((model) => {
        process.exit(0);
      });
    }
  });
default:
}
