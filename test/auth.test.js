import { assert } from 'chai';
import supertest from 'supertest';
import testInclude from './tests.includes';
import app from '../server/app';

describe('Signup', () => {
  before(() => {
    testInclude();
  });
  it('URL should be defined', (done) => {
    supertest(app).post('/api/user/signup').send().end((err, res) => {
      assert.equal(res.statusCode, 400);
      done();
    });
  });
  it('should detect invalid email address', (done) => {
    const wrongEmail = {
      fullName: 'gbenga Oyetade',
      username: 'apptest',
      password: 'some password',
      email: 'apptestgmail.com',
      phoneNumber: '+2348064140695' };
    supertest(app).post('/api/user/signup').send(wrongEmail).end((err, res) => {
      assert.isOk(res.body.error.email);
      assert.equal(res.body.error.email, 'Not a valid email address');
      done();
    });
  });
  it('should make sure password parameter is at least 6 characters', (done) => {
    const user = {
      fullName: 'gbenga Oyetade',
      username: 'gbenga_ps',
      password: 'pass',
      email: 'ioyetade@gmail.com',
      phoneNumber: '+2348064140695' };
    supertest(app).post('/api/user/signup').send(user).end((err, res) => {
      assert.equal(res.body.error.password,
        'Password cannot be less than 6 characters');
      done();
    });
  });
  it('should detect if username contains special characters', (done) => {
    const user = {
      fullName: 'gbenga Oyetade',
      username: '$gbenga_ps',
      password: 'password',
      email: 'ioyetade2@gmail.com',
      phoneNumber: '+2348064140695' };
    supertest(app).post('/api/user/signup').send(user).end((err, res) => {
      assert.equal(res.body.error.username,
        'Username cannot contain special characters aside from _');
      done();
    });
  });
  it('should detect if phone number is valid', (done) => {
    const user = {
      fullName: 'gbenga Oyetade',
      username: '$gbenga_ps',
      password: 'password',
      email: 'ioyetade2@gmail.com',
      phoneNumber: 'ddd' };
    supertest(app).post('/api/user/signup').send(user).end((err, res) => {
      assert.equal(res.body.error.phoneNumber, 'Phone number not valid');
      done();
    });
  });
  it('should detect if username is less than 2 characters', (done) => {
    const user = {
      fullName: 'gbenga Oyetade',
      username: 'g',
      password: 'password',
      email: 'ioyetade2@gmail.com',
      phoneNumber: '+2348064140695' };
    supertest(app).post('/api/user/signup').send(user).end((err, res) => {
      assert.equal(res.body.error.username,
        'Username is too short');
      done();
    });
  });
  it('should trim password field of spaces', (done) => {
    const user = {
      fullName: 'gbenga Oyetade',
      username: 'gbenga',
      password: '     p ',
      email: 'ioyetade2@gmail.com',
      phoneNumber: '+2348064140695' };
    supertest(app).post('/api/user/signup').send(user).end((err, res) => {
      assert.equal(res.body.error.password,
        'Password cannot be less than 6 characters');
      done();
    });
  });
  it('should detect if full name contains special characters', (done) => {
    const user = {
      fullName: 'gbenga Oyetade$$$',
      username: 'gbenga',
      password: 'password',
      email: 'ioyetade2@gmail.com',
      phoneNumber: '+2348064140695' };
    supertest(app).post('/api/user/signup').send(user).end((err, res) => {
      assert.equal(res.body.error.fullName,
        'Name can only be alphabets');
      done();
    });
  });
  it('should detect if fullname is too small', (done) => {
    const user = {
      fullName: 'g',
      username: '$gbenga_ps',
      password: 'password',
      email: 'ioyetade2@gmail.com',
      phoneNumber: '+2348064140695' };
    supertest(app).post('/api/user/signup').send(user).end((err, res) => {
      assert.equal(res.body.error.fullName,
        'Name is too short');
      done();
    });
  });
  it('should sign user up if parameters are well structured', (done) => {
    const user = {
      fullName: 'gbenga Oyetade',
      username: 'test_signup',
      password: 'password',
      email: 'test_signup@gmail.com',
      phoneNumber: '+2348064140699' };
    supertest(app).post('/api/user/signup').send(user).end((err, res) => {
      assert.isOk(res.body.user);
      assert.isOk(res.body.user.token);
      assert.equal(res.body.user.username, user.username);
      done();
    });
  });
});

// Login tests
describe('Login', () => {
  it('endpoint should be defined', (done) => {
    supertest(app).post('/api/user/signin').send().end((err, res) => {
      assert.notEqual(res.statusCode, 404);
      done();
    });
  });
  it('should detect if parameters are correct', (done) => {
    supertest(app).post('/api/user/signin').send().end((err, res) => {
      assert.isOk(res.body.error);
      assert.equal(res.statusCode, 400);
      done();
    });
  });
  it('should return 401 error if user does not exist', (done) => {
    const user = {
      username: 'does not exist',
      password: 'password',
    };
    supertest(app).post('/api/user/signin').send(user).end((err, res) => {
      assert.equal(res.statusCode, 401);
      done();
    });
  });
  it('should return error if username is correct but password is wrong',
  (done) => {
    const user = {
      username: 'apptest',
      password: 'wrong password',
    };
    supertest(app).post('/api/user/signin').send(user).end((err, res) => {
      assert.equal(res.statusCode, 401);
      assert.equal(res.body.error, 'Username or password incorrect');
      done();
    });
  });
  it('should return a token on successful login', (done) => {
    const userDetails = {
      username: 'apptest', password: 'some password',
    };
    supertest(app).post('/api/user/signin')
    .send(userDetails).end((err, res) => {
      assert.isOk(res.body.user.token);
      assert.isOk(res.body.user.id);
      assert.isOk(res.body.user.email);
      assert.equal(res.body.user.username, userDetails.username);
      done();
    });
  });
  it('should login user if email is provided in the username field', (done) => {
    const userDetails = {
      username: 'apptest@gmail.com', password: 'some password',
    };
    supertest(app).post('/api/user/signin')
    .send(userDetails).end((err, res) => {
      assert.isOk(res.body.user.token);
      assert.isOk(res.body.user.id);
      assert.isOk(res.body.user.email);
      assert.equal(res.body.user.username, 'apptest');
      done();
    });
  });
});

// reset password tests

describe('Reset password', () => {
  it('Should detect if email was provided', (done) => {
    supertest(app).post('/api/user/password/reset').send().end((err, res) => {
      assert.equal(res.body.message, 'Parameter not well structured');
      assert.isOk(res.body.error);
      assert.equal(res.statusCode, 400);
      done();
    });
  });
  it('Should detect if provided email exists', (done) => {
    const email = { email: 'something@gmail.com' };
    supertest(app).post('/api/user/password/reset').send(email)
    .end((err, res) => {
      assert.equal(res.body.error, 'Email address does not exist on Postit');
      assert.equal(res.statusCode, 400);
      done();
    });
  });
  it('Should should send mail if email exist', (done) => {
    const email = { email: 'apptest@gmail.com' };
    supertest(app).post('/api/user/password/reset').send(email)
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
    supertest(app).post('/api/user/password/update').send().end((err, res) => {
      assert.isOk(res.body.error);
      assert.equal(res.statusCode, 400);
    });
    done();
  });
  it('should detect if url contains token', (done) => {
    const password = { password: 'password' };
    supertest(app).post('/api/user/password/update').send(password)
    .end((err, res) => {
      assert.equal(res.body.error, 'No token provided');
      assert.equal(res.statusCode, 401);
    });
    done();
  });
  it('should verify token if provided', (done) => {
    const password = { password: 'password' };
    supertest(app).post('/api/user/password/update?token=whatever')
    .send(password).end((err, res) => {
      assert.equal(res.body.error, 'Token authentication failure');
      assert.equal(res.statusCode, 401);
    });
    done();
  });
});
