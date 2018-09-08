const assert = require('assert');
const User = require('../../src/models/user.js');
const testHelper = require('../test-helper.js');

beforeEach(function() {
  return testHelper.initDatabase();
});

describe('Array', function() {

  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });

    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });

    it('should test', function(done) {
      (new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      })).then(() => {
        done();
      });
    });

    it('should test', function(done) {
      (new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 500);
      })).then(() => {
        done();
      });
    });

    it('should test', function(done) {
      (new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 500);
      })).then(() => {
        done();
      });
    });

    // it('should test 2', function(done) {
    //   testHelper.initDatabase().then(function() {
    //     assert.equal([1,2,3].indexOf(4), -1);
    //     done();
    //   });
    // });

    it('should test3', function(done) {
      (new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 500);
      })).then(() => {
        done();
      });
    });

    // it('should test 2', function(done) {
    //   testHelper.initDatabase().then(function() {
    //     assert.equal([1,2,3].indexOf(4), -1);
    //     done();
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // });

    // it('should test 2', function(done) {
    //   testHelper.initDatabase().then(function() {
    //     let user = new User();
    //     let firstName = 'Vu';
    //     let lastName = 'Khuu';
    //     let email = 'vu.khuu@gmail.com';
    //     let address = 'Hoc Mon';
    //     user.first_name = firstName;
    //     user.last_name = lastName;
    //     user.email = email;
    //     user.address = address;
    //     done()
    //     user.save().then((result) => {
    //       assert.equal(1,2);
    //       done();
    //       // expect(result).toMatchObject({
    //       //   first_name: firstName,
    //       //   last_name: lastName,
    //       // });
    //     });
    //   });
    // });

    // it('should test', function(done) {
    //   testHelper.initDatabase().then(function() {
    //     new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         resolve();
    //       }, 1000);
    //     }).then(() => {
    //       assert.equal([1,2,3].indexOf(4), -1);
    //       done();
    //     });
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // });

    // it('test user', function(done) {
    //   testHelper.initDatabase().then(function() {
    //     done();
    //   });
    // });
  });
});

// describe('Array 2', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1,2,3].indexOf(4), -1);
//     });
//   });
// });


// it('should create new user with hashed password and random token', (done) => {
//   let user = new User();
//   let firstName = 'Vu';
//   let lastName = 'Khuu';
//   let email = 'vu.khuu@gmail.com';
//   let address = 'Hoc Mon';
//   user.first_name = firstName;
//   user.last_name = lastName;
//   user.email = email;
//   user.address = address;
//   user.save();
//   return user.save().then((result) => {
//     assert.equal(result.first_name, firstName);
//     done();
//     // expect(result).toMatchObject({
//     //   first_name: firstName,
//     //   last_name: lastName,
//     // });
//   });
// });
/*const jest = require('jest');
const testHelper = require('../test-helper.js');
//const conn = required('../components/db-connection.js');
const User = require('../../src/models/user.js');
console.log(jest);
/*beforeAll(() => {
  console.log('Befor each');
  return testHelper.beforeRunningTests();
});


*/
