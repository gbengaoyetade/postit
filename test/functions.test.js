import { assert } from 'chai';
import supertest from 'supertest';
import app from '../server/app';
import { validateInput, getId, verifyToken } from '../server/includes/functions';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImZ1bGxOYW1lIjoiQnVrb2xhIEVsZW1pZGUiLCJlbWFpbCI6ImFzYUBnbWFpbC5jb20iLCJwaG9uZU51bWJlciI6IiAwMDciLCJpYXQiOjE1MDg2ODE5NTksImV4cCI6MTU0MDIxNzk1OX0.7K66I1DSBiGQ-Gwe5DGzBfPcJjF9R3bIsmZfjdtcD0Y';
describe('Functions test', () => {
  it('Detect validateInput function', () => {
    assert.equal(typeof validateInput, 'function');
  });
  it('Detect getId function', () => {
    assert.equal(typeof getId, 'function');
  });
  it('getId should return a number if token is passed', () => {
    assert.equal(typeof getId(token), 'number');
  });
  it('validateInput should return ok if inputs are well structured', () => {
    const request = {
      name: 'gbenga',
      email: 'gbenga.oyetade@gmail.com',
    };
    const requiredFields = ['name', 'email'];
    assert.equal(validateInput(request, requiredFields), 'ok');
  });
  it('validateInput should return the first missing field if not provided',
  () => {
    const request = {
      name: 'gbenga',
      email: 'gbenga.oyetade@gmail.com',
    };
    const requiredFields = ['name', 'email', 'age'];
    assert.equal(validateInput(request, requiredFields),
    'age field not provided');
  });
  describe('verifyToken', () => {
    const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImZ1bGxOYW1lIjoiQnVrb2xhIEVsZW1pZGUiLCJlbWFpbCI6ImFzYUBnbWFpbC5jb20iLCJwaG9uZU51bWJlciI6IiAwMDciLCJpYXQiOjE1MDg2ODE5NTksImV4cCI6MTU0MDIxNzk1OX0.7K66I1DSBiGQ-Gwe5DGzBfPcJjF9R3bIsmZfjdtcD0';
    it('Should detect invalidToken', (done) => {
      supertest(app).get('/api/user/token/verify')
      .set('x-access-token', token2).send()
      .end((err, res) => {
        assert.equal(res.statusCode, 401);
        assert.isOk(res.body.message);
        assert.equal(res.body.message, 'Token authentication failure');
        done();
      });
    });
  });
});
