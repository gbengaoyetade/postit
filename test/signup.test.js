// request(app).post('/signup').send().end(function(err,res){});
const asserts = require('chai').assert;
const request = require('supertest');
const app = require('../server/app.js');

describe('Signup tests',function(){
  it('signup post url should be defined',function(done){
    request(app) .post('/signup') .send() .end(function(err, res) { 
        asserts.equal(res.statusCode,200); 
        done();
    });

  });
  it('request parameters must be exactly 3',function(done){
    request(app).post('/signup').send().end(function(err,res){
      asserts.equal(res.body.paramsLength,'ok');
      done();
    });
  });
  it('a valid email address must be sent to the route',function(done){
    request(app).post('/signup').send().end(function(err,res){
        asserts.equal(res.body.emailAddress,'ok');
        done();
    });

  });
  it('request password parameter length must be greater 6',function(done){
      request(app).post('/signup').send().end(function(err,res){
        asserts.equal(res.body.passwordLenght,'ok');
        done();
      });
  });
  it('request name parameter must not contain special character',function(done){
      request(app).post('/signup').send().end(function(err,res){
        asserts.equal(res.body.nameCharacters,'ok');
        done();
      });
  });
});