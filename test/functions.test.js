import { assert } from 'chai';
import supertest from 'supertest';
import './tests.includes';
import app from '../server/app';
import { checkParams, getId, checkInputLength } from '../server/includes/functions';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZnVsbE5hbWUiOiJnYmVuZ2EgT3lldGFkZSIsImVtYWlsIjoiZ2JlbmdhLm95ZXRhZGVAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIwODA2NDE0MDY5NSIsImlhdCI6MTUwODcyOTExMSwiZXhwIjoxNTQwMjY1MTExfQ.jEyMrWd4FjnKsPM-3yIL9w1o6YdzP2MbOZ2b3nd9LDM';
describe('checkParams function', () => {
  it('should be defined', () => {
    assert.equal(typeof checkParams, 'function');
  });
  it('should return ok if inputs are well structured', () => {
    const request = {
      name: 'gbenga',
      email: 'gbenga.oyetade@gmail.com',
    };
    const requiredFields = ['name', 'email'];
    assert.equal(checkParams(request, requiredFields), 'ok');
  });
  it('should return the first missing field if not provided',
  () => {
    const request = {
      name: 'gbenga',
      email: 'gbenga.oyetade@gmail.com',
    };
    const requiredFields = ['name', 'email', 'age'];
    assert.equal(checkParams(request, requiredFields),
    'age field not provided');
  });
});
describe('getId function', () => {
  it('should be defined', () => {
    assert.equal(typeof getId, 'function');
  });
  it('should return a number if token is passed', () => {
    assert.equal(typeof getId(token), 'number');
  });
});
describe('verifyToken', () => {
  const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImZ1bGxOYW1lIjoiQnVrb2xhIEVsZW1pZGUiLCJlbWFpbCI6ImFzYUBnbWFpbC5jb20iLCJwaG9uZU51bWJlciI6IiAwMDciLCJpYXQiOjE1MDg2ODE5NTksImV4cCI6MTU0MDIxNzk1OX0.7K66I1DSBiGQ-Gwe5DGzBfPcJjF9R3bIsmZfjdtcD0';
  it('should detect if token is provided', (done) => {
    supertest(app).post('/api/user/token/verify').send()
    .end((err, res) => {
      assert.equal(res.statusCode, 400);
      assert.equal(res.body.error, 'No token provided');
      // assert.equal(res.body.error, 'No token provided');
      done();
    });
  });
  it('should detect invalidToken', (done) => {
    supertest(app).post('/api/user/token/verify')
    .set('x-access-token', token2).send()
    .end((err, res) => {
      assert.equal(res.statusCode, 401);
      assert.isOk(res.body.error);
      assert.equal(res.body.error, 'Token authentication failure');
      done();
    });
  });
  it('should verify accurate token', (done) => {
    supertest(app).post('/api/user/token/verify')
    .set('x-access-token', token).send()
    .end((err, res) => {
      // assert.equal(res.statusCode, 200);
      // assert.isOk(res.body.message);
      assert.equal(res.body.message, 'Token verified');
      done();
    });
  });
});
describe('checkInputLength', () => {
  it('should accept two parameters', () => {
    const response = checkInputLength('name');
    assert.equal(typeof response, 'string');
  });
  it('should return an error object when inputs are correctly structured',
  () => {
    const response = checkInputLength({ name: 'Gbenga' }, ['name']);
    assert.deepEqual(response, {});
  });
  it('should return an error for input lenght greater than 255',
  () => {
    const longInput = { statement:
      `is simply dummy text of the printing and typesetting
     industry. Lorem Ipsum has been the industrys standard 
     dummy text ever since the 1500s, when an unknown printer took 
     a galley of type and scrambled it to make a type specimen book` };
    const response = checkInputLength(longInput, ['statement']);
    assert.deepEqual(response, {});
  });
});
