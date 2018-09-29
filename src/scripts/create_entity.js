const yargs = require('yargs');
const bcrypt = require('bcryptjs');
const Consts = require('../components/consts.js');
const randomToken = require('random-token').create(Consts.RANDOM_SALT);
const Center = require('../models').Center;
const User = require('../models').User;
const sequelize = require('sequelize');

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
  let token = randomToken(Consts.TOKEN_LENGTH);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(String(password), salt, (err, hash) => {
      User.create({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hash,
        token: token,
        active: Consts.ACTIVE_YES,
      }).then(() => {
        process.exit(0);
      }).catch((e) => {
        console.log(e.errors[0].message);
        process.exit(0);
      });
    });
  });
default:
}
