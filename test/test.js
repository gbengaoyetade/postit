import { assert } from 'chai';
import supertest from 'supertest';
import app from '../server/app';
import exist from '../server/middleware/exist';

const data = { fullName: 'gbenga Oyetade', username: 'gbenga_ps', password: 'some password', email: 'ioyetadegmail.com', phoneNumber: '+2348064140695' };
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoyLCJpYXQiOjE1MDQyODk2NzYsImV4cCI6MTUzNTgyNTY3Nn0.x3Kd6Iyc-8-RU8y5Z_-80kcXPF8IlteXqhVANJW6BQM';
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
      assert.equal(res.body.error, 'Invalid email address supplied');
      done();
    });
  });
  it('should make sure password parameter is at least 6 characters', (done) => {
    const user = { fullName: 'gbenga Oyetade', username: 'gbenga_ps', password: 'pass', email: 'ioyetade@gmail.com', phoneNumber: '+2348064140695' };
    supertest(app).post('/api/user/signup').send(user).end((err, res) => {
      assert.equal(res.body.error, 'Password must be at least 6 characters');
      done();
    });
  });
  it('should detect if username contains special characters', (done) => {
    const user = { fullName: 'gbenga Oyetade', username: '$gbenga_ps', password: 'password', email: 'ioyetade2@gmail.com', phoneNumber: '+2348064140695' };
    supertest(app).post('/api/user/signup').send(user).end((err, res) => {
      assert.equal(res.body.error, 'Username cannot contain special characters aside from _');
      done();
    });
  });
});

// Test for the group controller
describe('group test', () => {
  it('Create group route should be defined ', (done) => {
    supertest(app).post('/api/group').set('x-access-token', token).send().end((err, res) => {
      assert.equal(res.body.message, 'groupName field not provided');
      done();
    });
  });
   it('Empty group name should flag an error', (done) => {
    supertest(app).post('/api/group').set('x-access-token', token).send(data).end((err, res) => {
      assert.equal(res.body.message, 'groupName field not provided');
      done();
    });
  });
  it('Should detect if group description field is not provided', (done) => {
    const groupData = { groupName: 'react leaders' };
    supertest(app).post('/api/group').set('x-access-token', token).send(groupData).end((err, res) => {
      assert.equal(res.body.message, 'groupDescription field not provided');
      done();
    });
  });
});

// Login tests
describe('Login', () => {
  it('Return 401 error if user does not exist', (done) => {
    const user = {
      username: 'does not exist',
      password: 'password',
    };
    supertest(app).post('/api/user/signin').send(user).end((err, res) => {
      assert.equal(res.statusCode, 401);
      done();
    });
  });
  it('Return a token on successful login', (done) => {
    const user = {
      username: 'test',
      password: 'password',
    };
    supertest(app).post('/api/user/signin').send(user).end((err, res) => {
      assert.isOk(res.body.token);
      done();
    });
  });
});


// General Application tests

describe('General tests', () => {
  it('Undefined GET urls should return 404 statusCode', (done) => {
    supertest(app).get('/whatever').send().end((err, res) => {
      assert.equal(res.statusCode, 404);
      done();
    });
  });
  it('Undefined POST urls should return 404 statusCode', (done) => {
    supertest(app).post('/whatever').send().end((err, res) => {
      assert.equal(res.statusCode, 404);
      done();
    });
  });
  it('Undefined POST urls should return a message', (done) => {
    supertest(app).post('/whatever').send().end((err, res) => {
      assert.isOk(res.body.message);
      done();
    });
  });
  // it('Undefined routes should return HTML', (done) => {
  //   supertest(app).get('/undefined_route').send().end((err, res) => {
  //     assert.equal(res.header('content-type'), 'HTML');
  //   });
  // });
});
describe('Authenticate', () => {
  it('should detect if token is not provided', (done) => {
    supertest(app).get('/api/group').send().end((err, res) => {
      assert.equal(res.body.message, 'No token provided');
      done();
    });
  });
  it('should detect if token is invalid', (done) => {
    supertest(app).get('/api/group').set('x-access-token', 'invalid token').send().end((err, res) => {
      assert.equal(res.body.message, 'Token authentication failure');
      done();
    });
  });
});
