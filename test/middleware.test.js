import { assert } from 'chai';
import express from 'express';
// import app from '../server/app';  
import { groupExist, groupAndUserExist } from '../server/middleware/exist';

const data = { fullName: 'gbenga Oyetade', username: 'gbenga_ps', password: 'some password', email: 'ioyetadegmail.com', phoneNumber: '+2348064140695' };
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoyLCJpYXQiOjE1MDQyODk2NzYsImV4cCI6MTUzNTgyNTY3Nn0.x3Kd6Iyc-8-RU8y5Z_-80kcXPF8IlteXqhVANJW6BQM';
// Middleware tests
describe('Middleware tests', () => {
  it('Detect groupExist function', (done) => {
    assert.equal(typeof groupExist, 'function');
    done();
  });
  it('Detect groupAndUserExist function', (done) => {
    assert.equal(typeof groupAndUserExist, 'function');
    done();
  });
  //  it('UserId must be a number', (done) => {
  //   app.use(groupExist)
  // });
  // it('Undefined groups should be detected', (done) => {
  //   const groupData = { groupName: 'react leaders' };
  //   supertest(app).post('/api/group').set('x-access-token', token).send(groupData).end((err, res) => {
  //     assert.equal(res.body.message, 'groupDescription field not provided');
  //     done();
  //   });
  // });
  // it('Undefined user should be detected', (done) => {
  // //   const groupData = { groupName: 'react leaders' };
  // //   supertest(app).post('/api/group').set('x-access-token', token).send(groupData).end((err, res) => {
  // //     assert.equal(res.body.message, 'groupDescription field not provided');
  // //     done();
  // //   });
  // });
});
