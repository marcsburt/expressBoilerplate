import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../../app';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';

chai.config.includeStack = true;

const request = supertest.agent(app.listen());

after((done) => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
})


describe('# Example API', () => {

  let user = {
    username: 'Test',
    number: 12345
  };

  let resUser = {};

  describe('# POST /api/examples', () => {
    it('should create a new example', (done) => {
      request
        .post('/api/examples')
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).to.equal(user.username);
          expect(res.body.number).to.equal(user.number);
          resUser = res.body;
        })
      done();

    })
  })

  describe('# GET /api/examples', () => {
    it('should get all examples', (done) => {
      request
        .get('/api/examples')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
        })
      done();
    })
  })

  describe('# DELETE /api/examples/:id', () => {
    it('should delete what was posted earlier in the test', (done) => {
      request
        .delete(`/api/examples/${resUser._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('ok').eql(1);
        })
      done();
    })
  })

})
