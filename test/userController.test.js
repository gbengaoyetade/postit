import { assert } from 'chai';
import supertest from 'supertest';
import app from '../server/app';
import database from '../server/models/';
import { tokens } from './testIncludes';

const { groups, groupMembers } = database;
const { token1 } = tokens();
describe('Signup', () => {
  it('should send error message when email is invalid', (done) => {
    const wrongEmail = {
      fullName: 'Gbenga Oyetade',
      username: 'apptest',
      password: 'some password',
      email: 'apptestgmail.com',
      phoneNumber: '+2348064140695'
    };
    supertest(app)
      .post('/api/user/signup')
      .send(wrongEmail)
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        assert.equal(res.body.error.email, 'Not a valid email address');
        done();
      });
  });
  it('should send error when password is less than 6 characters', (done) => {
    const user = {
      fullName: 'gbenga Oyetade',
      username: 'gbenga_ps',
      password: 'pass',
      email: 'ioyetade@gmail.com',
      phoneNumber: '+2348064140695'
    };
    supertest(app)
      .post('/api/user/signup')
      .send(user)
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        assert.equal(
          res.body.error.password,
          'Password cannot be less than 6 characters'
        );
        done();
      });
  });
  it('should send error message when username contains special character except _', (done) => {
    const user = {
      fullName: 'gbenga Oyetade',
      username: '$gbenga_ps',
      password: 'password',
      email: 'ioyetade2@gmail.com',
      phoneNumber: '+2348064140695'
    };
    supertest(app)
      .post('/api/user/signup')
      .send(user)
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        assert.equal(
          res.body.error.username,
          'Username cannot contain special characters aside from _'
        );
        done();
      });
  });
  it('should send error message for invalid phone numbers', (done) => {
    const user = {
      fullName: 'gbenga Oyetade',
      username: 'gbenga_ps',
      password: 'password',
      email: 'ioyetade2@gmail.com',
      phoneNumber: 'ddd'
    };
    supertest(app)
      .post('/api/user/signup')
      .send(user)
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        assert.equal(res.body.error.phoneNumber, 'Phone number not valid');
        done();
      });
  });
  it('should send error message when username is less than 2 characters', (done) => {
    const user = {
      fullName: 'gbenga Oyetade',
      username: 'g',
      password: 'password',
      email: 'ioyetade2@gmail.com',
      phoneNumber: '+2348064140695'
    };
    supertest(app)
      .post('/api/user/signup')
      .send(user)
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        assert.equal(res.body.error.username, 'Username is too short');
        done();
      });
  });
  it('should trim password field of spaces', (done) => {
    const user = {
      fullName: 'gbenga Oyetade',
      username: 'gbenga',
      password: '     p ',
      email: 'ioyetade2@gmail.com',
      phoneNumber: '+2348064140695'
    };
    supertest(app)
      .post('/api/user/signup')
      .send(user)
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        assert.equal(
          res.body.error.password,
          'Password cannot be less than 6 characters'
        );
        done();
      });
  });
  it('should send error message when fullName field contians special characters', (done) => {
    const user = {
      fullName: 'gbenga Oyetade$$$',
      username: 'gbenga',
      password: 'password',
      email: 'ioyetade2@gmail.com',
      phoneNumber: '+2348064140695'
    };
    supertest(app)
      .post('/api/user/signup')
      .send(user)
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        assert.equal(res.body.error.fullName, 'Name can only be alphabets');
        done();
      });
  });
  it('should send error message when fullName is too short', (done) => {
    const user = {
      fullName: 'g',
      username: 'gbenga_ps',
      password: 'password',
      email: 'ioyetade2@gmail.com',
      phoneNumber: '+2348064140695'
    };
    supertest(app)
      .post('/api/user/signup')
      .send(user)
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        assert.equal(res.body.error.fullName, 'Name is too short');
        done();
      });
  });
  it('should create user when inputs are valid', (done) => {
    const user = {
      fullName: 'Gbenga Oyetade',
      username: 'test_signup',
      password: 'password',
      email: 'signup@gmail.com',
      phoneNumber: '08064140699'
    };
    supertest(app)
      .post('/api/user/signup')
      .send(user)
      .end((err, res) => {
        assert.isOk(res.body.user);
        assert.isOk(res.body.user.token);
        assert.equal(res.body.user.username, user.username);
        assert.equal(res.body.user.fullName, user.fullName);
        assert.equal(res.body.user.email, user.email);
        assert.equal(res.body.user.phoneNumber, user.phoneNumber);

        done();
      });
  });
});

// Login tests
describe('Login', () => {
  it('should send error message when required fields are not available', (done) => {
    supertest(app)
      .post('/api/user/signin')
      .send()
      .end((err, res) => {
        assert.equal(res.body.error.username, 'username field is required');
        assert.equal(res.body.error.password, 'password field is required');
        assert.equal(res.statusCode, 400);
        done();
      });
  });
  it('should send error message when user does not exist', (done) => {
    const user = {
      username: 'does not exist',
      password: 'password'
    };
    supertest(app)
      .post('/api/user/signin')
      .send(user)
      .end((err, res) => {
        assert.equal(res.body.error, 'Username or password incorect');
        assert.equal(res.statusCode, 401);
        done();
      });
  });
  it('should send error message when username is correct but password is wrong', (done) => {
    const user = {
      username: 'apptest',
      password: 'wrong password'
    };
    supertest(app)
      .post('/api/user/signin')
      .send(user)
      .end((err, res) => {
        assert.equal(res.statusCode, 401);
        assert.equal(res.body.error, 'Username or password incorrect');
        done();
      });
  });
  it('should send user details on a successfull login', (done) => {
    const userDetails = {
      username: 'apptest',
      password: 'some password'
    };
    supertest(app)
      .post('/api/user/signin')
      .send(userDetails)
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.user.fullName, 'Gbenga Oyetade');
        assert.equal(res.body.user.phoneNumber, '+2348064140695');
        assert.equal(res.body.user.email, 'apptest@gmail.com');
        assert.equal(res.body.user.username, userDetails.username);
        assert.isOk(res.body.user.token);
        assert.isOk(res.body.user.id);
        done();
      });
  });
  it('should login user when the correct email is provided in the username field', (done) => {
    const userDetails = {
      username: 'apptest@gmail.com',
      password: 'some password'
    };
    supertest(app)
      .post('/api/user/signin')
      .send(userDetails)
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.user.fullName, 'Gbenga Oyetade');
        assert.equal(res.body.user.phoneNumber, '+2348064140695');
        assert.equal(res.body.user.email, 'apptest@gmail.com');
        assert.equal(res.body.user.username, 'apptest');
        assert.isOk(res.body.user.token);
        assert.isOk(res.body.user.id);
        done();
      });
  });
});

// reset password tests

describe('Reset password', () => {
  it('Should send error message when password field is not provided', (done) => {
    supertest(app)
      .post('/api/user/password/reset')
      .send()
      .end((err, res) => {
        assert.equal(res.body.error.email, 'email field is required');
        assert.equal(res.statusCode, 400);
        done();
      });
  });
  it('Should send error message when invalid password is provided', (done) => {
    const email = { email: 'not an email' };
    supertest(app)
      .post('/api/user/password/reset')
      .send(email)
      .end((err, res) => {
        assert.equal(res.body.error.email, 'Expects an email address');
        assert.equal(res.statusCode, 400);
        done();
      });
  });
  it('Should send error message when email address does not exist on postit', (done) => {
    const email = { email: 'something@gmail.com' };
    supertest(app)
      .post('/api/user/password/reset')
      .send(email)
      .end((err, res) => {
        assert.equal(res.body.error, 'Email address does not exist on Postit');
        assert.equal(res.statusCode, 404);
        done();
      });
  });
  it('Should should send mail if email exist', (done) => {
    const email = { email: 'apptest@gmail.com' };
    supertest(app)
      .post('/api/user/password/reset')
      .send(email)
      .end((err, res) => {
        assert.equal(res.body.message, 'Mail sent successfully');
        assert.equal(res.statusCode, 200);
        done();
      });
  });
});

// update password tests
describe('Update password', () => {
  it('should detect if the password field was provided', (done) => {
    supertest(app)
      .post('/api/user/password/update')
      .send()
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        assert.equal(res.body.error.password, 'password field is required');
      });
    done();
  });
  it('should send error message when url does not contain token', (done) => {
    const password = { password: 'password' };
    supertest(app)
      .post('/api/user/password/update')
      .send(password)
      .end((err, res) => {
        assert.equal(res.body.error.token, 'No token provided');
        assert.equal(res.statusCode, 400);
      });
    done();
  });
  it('should verify token if provided', (done) => {
    const password = { password: 'password' };
    supertest(app)
      .post('/api/user/password/update?token=whatever')
      .send(password)
      .end((err, res) => {
        assert.equal(res.body.error, 'Token authentication failure');
        assert.equal(res.statusCode, 401);
      });
    done();
  });
});
// user search
describe('User search', () => {
  it('should send error message when query field is not provided', (done) => {
    supertest(app)
      .get('/api/user/search?')
      .set('x-access-token', token1)
      .send()
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        assert.equal(res.body.error.query, 'query field is required');
        done();
      });
  });
  it('should return an array of users when params are valid', (done) => {
    supertest(app)
      .get('/api/user/search?query=test2&offset=0')
      .set('x-access-token', token1)
      .send()
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.isOk(Array.isArray(res.body.users));
        assert.equal(res.body.users[0].username, 'apptest2');
        assert.equal(res.body.users[0].email, 'apptest2@gmail.com');
        assert.equal(res.body.users[0].fullName, 'Gbenga Oyetade');
        done();
      });
  });
  it('should return 0 as pageCount when limit is not provided', (done) => {
    supertest(app)
      .get('/api/user/search?query=gb&offset=0')
      .set('x-access-token', token1)
      .send()
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.pageCount, 0);
        done();
      });
  });
});

describe('server', () => {
  it('should return a 500 error when it cannot process .create on groupMembers', (done) => {
    const groupDetails = {
      groupName: 'group name 2',
      groupDescription: 'description'
    };
    groupMembers.create = () => Promise.reject('dsfafd');
    supertest(app)
      .post('/api/group')
      .set('x-access-token', token1)
      .send(groupDetails)
      .end((err, res) => {
        assert.equal(res.statusCode, 500);
        assert.equal(res.body.error, 'Internal server error');
        done();
      });
  });
  it('should return a 500 error when it cannot process .create request', (done) => {
    const groupDetails = {
      groupName: 'group name 2',
      groupDescription: 'description'
    };
    groups.create = () => Promise.reject('dsfafd');
    supertest(app)
      .post('/api/group')
      .set('x-access-token', token1)
      .send(groupDetails)
      .end((err, res) => {
        assert.equal(res.statusCode, 500);
        assert.equal(res.body.error, 'Internal server error');
        done();
      });
  });
  it('should return a 500 error when it cannot process .find request', (done) => {
    const groupDetails = {
      groupName: 'group name 2',
      groupDescription: 'description'
    };
    groups.find = () => Promise.reject('dsfafd');
    supertest(app)
      .post('/api/group')
      .set('x-access-token', token1)
      .send(groupDetails)
      .end((err, res) => {
        assert.equal(res.statusCode, 500);
        assert.equal(res.body.error, 'Internal server error');
        done();
      });
  });
});
