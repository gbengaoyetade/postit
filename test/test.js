// request(app).post('/signup').send().end(function(err,res){});
import { assert } from 'chai';
import  supertest from 'supertest';
import app from '../server/app';

const data = { username: 'gbenga_ps', password: 'some password', email: 'ioyetadegmail.com' };
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoxLCJpYXQiOjE1MDE3MTIyMzAsImV4cCI6MTUzMzI0ODIzMH0.0vgaYNXIJD8R6r3VHMVlqzi5bfGumgYZLaquFtCJmzU';
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
      assert.equal(res.statusCode, 401);
      done();
    });
  });
   it('Empty group name should flag an error', (done) => {
    supertest(app).post('/api/group').set('x-access-token', token).send(data).end((err, res) => {
      assert.equal(res.body.message, 'Could not create group');
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

});