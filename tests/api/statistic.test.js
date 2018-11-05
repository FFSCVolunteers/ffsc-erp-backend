const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/server.js').app;
const assert = require('chai').assert;
chai.should();

chai.use(chaiHttp);

describe('Static Controller', () => {
  it('Create or update an entry', (done) => {
    let data = {
      month: 8,
      year: 2018,
      stats: {
        number_of_new_students: 20,
        number_of_scholarships: 10,
        number_of_excellent_students: 20,
      },
      center_id: 1,
    };
    chai.request(server)
      .put('/stats')
      .send(data)
      .end((err, res) => {
        console.log(res);
        res.should.have.status(200);
      });
  });
});
