//const {connection} = require('./src/components/db-connection.js');

// connection.query('select * from role', function(errors, results, fields) {
//   console.log(results);
//   connection.end();
// });


// Create user
// const User = require('./src/models/user.js');
// const jwt = require('jsonwebtoken');
// let user = new User();
// user.first_name = 'Vu';
// user.last_name = 'Khuu';
// user.email = 'vu.khuu@gmail.com';
// user.password = 'ffsc2018';
// user.address = 'Hoc Mon';
// user.save(function(error, results, fields) {
//   console.log(error, results, fields);
// });

const User = require('./src/models/user.js');
User.authenticate('vu.khuu@gmail.com', 'ffsc2018x').then((user) => {
  console.log(user);
}).catch((err) => {
  console.log(err);
});
