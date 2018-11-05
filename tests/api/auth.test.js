const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/server.js').app;
const User = require('../../src/models').User;
const assert = require('chai').assert;
const sequelize = require('sequelize');
chai.should();

chai.use(chaiHttp);
before((done) => {
  console.log('before');
  sequelize.sync().then(() => {
    done();
  });
});
describe('Auth Controller', () => {
  beforeEach((done) => {
    console.log('before each');
    User.destroy({
      where: {},
      truncate: false,
    }).then(() => {
      done();
    });
  });
  it('Register for new account - Should succeed', (done) => {
    let firstName = 'Nam';
    let lastName = 'Teo';
    let email = 'nam.teo@gmail.com';
    let password = '123456';
    chai.request(server)
      .post('/auth/register')
      .send({
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        assert(res.body.user.first_name === firstName);
        assert(res.body.user.last_name === lastName);
        assert(res.body.user.email === email);

        chai.request(server)
          .post('/auth/login')
          .send({
            email: email,
            password: password,
          })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
  });
  it('Register for new account - Should fail', (done) => {
    let firstName = 'Nam';
    let lastName = 'Nguyen';
    let email = '';
    let password = '123456';
    chai.request(server)
      .post('/auth/register')
      .send({
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
