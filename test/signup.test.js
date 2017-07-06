
const assert = require('chai').assert;
const request = require('supertest');
const app = require('../server/app.js');

describe('Signup tests',function(){
  it('signup post url should be defined',function(done){
    request(app) .post('/signup') .send() .end(function(err, res) { 
        assert.equal(res.statusCode,200); 
        done();
    });

  });
  it('request parameters must be exactly 3',function(done){
    request(app).post('/signup').send().end(function(err,res){
      assert.notEqual(res.body,null);
      done();
    });
  });
  it('a valid email address must be sent to the route',function(done){
    request(app).post('/signup').send().end(function(err,res){
        assert.isOk(err.message,'');
        done();
    });
  });

});