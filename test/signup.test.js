// request(app).post('/signup').send().end(function(err,res){});
const asserts = require('chai').assert;
const request = require('supertest');
const app = require('../server/app.js');

const data = { username: 'gbenga_ps', password: 'some password', email: 'ioyetadegmail.com' };
describe('Signup tests', () => {
  it('signup post url should be defined', (done) => {
    request(app).post('/api/user/signup').send().end((err, res) => {
      asserts.equal(res.statusCode, 401);
      done();
    });
  });
  it('should validate input parameters are  username,email and password', (done) => {
    request(app).post('/api/user/signup').send(data).end((err, res) => {
      asserts.equal(res.body.parameters, 'ok');
      done();
    });
  });
  it('should detect invalid email address', (done) => {
    request(app).post('/api/user/signup').send(data).end((err, res) => {
      asserts.equal(res.body.message, 'Invalid email address supplied');
      done();
    });
  });
  it('should make sure password parameter is at least 6 characters', (done) => {
    const user = { username: 'gbenga_ps', password: 'pass', email: 'ioyetade@gmail.com' };
    request(app).post('/api/user/signup').send(user).end((err, res) => {
      asserts.equal(res.body.message, 'Password must be at least 6 characters');
      done();
    });
  });
  it('should detect if username contains special characters', (done) => {
    const user = { username: '$gbenga_ps', password: 'password', email: 'ioyetade@gmail.com' };
    request(app).post('/api/user/signup').send(user).end((err, res) => {
      asserts.equal(res.body.message, 'Validation is on username failed');
      done();
    });
  });
});
