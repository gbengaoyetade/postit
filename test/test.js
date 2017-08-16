import { assert } from 'chai';
import supertest from 'supertest';
import app from '../server/app';

const data = { username: 'gbenga_ps', password: 'some password', email: 'ioyetadegmail.com' };
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoxLCJpYXQiOjE1MDIxMjU5NzEsImV4cCI6MTUzMzY2MTk3MX0.jOSzQjOPXsUjacqwT6HQ5lC-eys_gSgqj-gOC75-eXs';
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
    const user = { username: 'gbenga_ps', password: 'pass', email: 'ioyetade@gmail.com' };
    supertest(app).post('/api/user/signup').send(user).end((err, res) => {
      assert.equal(res.body.error, 'Password must be at least 6 characters');
      done();
    });
  });
  it('should detect if username contains special characters', (done) => {
    const user = { username: '$gbenga_ps', password: 'password', email: 'ioyetade2@gmail.com' };
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
      assert.equal(res.statusCode, 200);
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
  it('Undefined urls should return 404 statusCode', (done) => {
    supertest(app).get('/whatever').send().end((err, res) => {
      assert.equal(res.statusCode, 404);
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
  it('should detect if user is logged out', (done) => {
    const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjo0LCJpYXQiOjE1MDIxMjYwNjcsImV4cCI6MTUzMzY2MjA2N30.UUxPoocmCvNtCGUl1OIbZ_-FbdO77ankB6VfqT-V-b0';
    supertest(app).get('/api/group').set('x-access-token', token2).send().end((err, res) => {
      assert.equal(res.body.message, 'You are not logged in');
      done();
    });
  });
});
