// request(app).post('/signup').send().end(function(err,res){});
import { assert } from 'chai';
import  supertest from 'supertest';
import app from '../server/app';

const data = { username: 'gbenga_ps', password: 'some password', email: 'ioyetadegmail.com' };
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibnBtdGVzdCIsImlhdCI6MTUwMDcwMTAwMCwiZXhwIjoxNTMyMTUwNjAwfQ.G4fdtAVqugLLelqtBWqKI2H9px7lcML2QBmwYrp_AbE';
describe('Signup tests', () => {
  it('signup post url should be defined', (done) => {
    supertest(app).post('/api/user/signup').send().end((err, res) => {
      assert.equal(res.statusCode, 401);
      done();
    });
  });
  it('should validate input parameters are  username,email and password', (done) => {
    supertest(app).post('/api/user/signup').send(data).end((err, res) => {
      assert.equal(res.body.parameters, 'ok');
      done();
    });
  });
  it('should detect invalid email address', (done) => {
    supertest(app).post('/api/user/signup').send(data).end((err, res) => {
      assert.equal(res.body.message, 'Invalid email address supplied');
      done();
    });
  });
  it('should make sure password parameter is at least 6 characters', (done) => {
    const user = { username: 'gbenga_ps', password: 'pass', email: 'ioyetade@gmail.com' };
    supertest(app).post('/api/user/signup').send(user).end((err, res) => {
      assert.equal(res.body.error, 'Password must be at least 6 characters');
      done();
    });
  });
  it('should detect if username contains special characters', (done) => {
    const user = { username: '$gbenga_ps', password: 'password', email: 'ioyetade2@gmail.com' };
    supertest(app).post('/api/user/signup').send(user).end((err, res) => {
      assert.equal(res.body.message, 'Username cannot contain special characters aside from _');
      done();
    });
  });
});

describe('group test', () => {
  it('Create group route should be defined ', (done) => {
    supertest(app).post('/api/group').set('x-access-token', token).send().end((err, res) => {
      assert.equal(res.body, 401);
      done();
    });
  });
   it('Empty group name should flag an error', (done) => {
    supertest(app).post('/api/group').set('x-access-token', token).send().end((err, res) => {
      assert.equal(res.body.message, 'Could not create group');
      done();
    });
  });
});
