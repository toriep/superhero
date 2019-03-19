const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src');


chai.should();

chai.use(chaiHttp);

describe('Server should be able to perform "/users" operation', () => {
  it('it should get /users/foods', done => {
    chai.request(server).get('/users/foods').end((err, res) => {
      res.should.have.status(200);
      res.should.be.a('object');
      res.body.should.be.a('array');
 
      done();
    })
  });
})