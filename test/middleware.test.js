import { assert } from 'chai';
import supertest from 'supertest';
import app from '../server/app';
import { groupExist, groupAndUserExist } from '../server/middleware/exist';

// Middleware tests
describe('Middleware', () => {
  it('should have groupExist function defined', (done) => {
    assert.equal(typeof groupExist, 'function');
    done();
  });
  it('should have groupAndUserExist function defined', (done) => {
    assert.equal(typeof groupAndUserExist, 'function');
    done();
  });
});
describe('Authenticate', () => {
  it('should detect if token is not provided', (done) => {
    supertest(app).get('/api/group').send().end((err, res) => {
      assert.equal(res.body.error, 'No token provided');
      assert.equal(res.statusCode, 400);
      done();
    });
  });
  it('should detect if token is invalid', (done) => {
    supertest(app).get('/api/group').set('x-access-token', 'invalid token')
    .send()
    .end((err, res) => {
      assert.equal(res.body.error, 'Token authentication failure');
      assert.equal(res.statusCode, 401);
      done();
    });
  });
});
