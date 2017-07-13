// request(app).post('/signup').send().end(function(err,res){});
const asserts = require('chai').assert;
const request = require('supertest');
const app = require('../server/app.js');

describe('Signup tests', () => {
  it('signup post url should be defined', (done) => {
    request(app).post('/api/user/signup').send().end((err, res) => {
      asserts.equal(res.statusCode, 200);
      done();
    });
  });
  it('should validate input parameters are  username,email and password', (done) => {
    const data = { 'username': 'gbenga_ps', 'password': 'some password', 'email': 'ioyetade@gmail.com'};
    request(app).post('/api/user/signup').send(data).end((err, res) => {
      asserts.equal(res.body.paramsOK, true);
      done();
    });
  });
  // it('should detect invalid email address', (done) => {
  //   request(app).post('/signup').send().end((err, res) => {
  //     asserts.equal(res.body.emailAddress, 'ok');
  //     done();
  //   });
  // });
  // it('should make sure password parameter is at least 6 characters', (done) => {
  //   request(app).post('/signup').send().end((err, res) => {
  //     asserts.equal(res.body.passwordLenght, 'ok');
  //     done();
  //   });
  // });
  // it('should detect if username contains special characters', (done) => {
  //   request(app).post('/signup').send().end((err, res) => {
  //     asserts.equal(res.body.nameCharacters, 'ok');
  //     done();
  //   });
  // });
});
