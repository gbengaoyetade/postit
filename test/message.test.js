import { assert } from 'chai';
import supertest from 'supertest';
import app from '../server/app';
import db from '../server/models/';
import emptyDb from './tests.includes';

emptyDb();
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoxLCJpYXQiOjE1MDU0NTc3MTIsImV4cCI6MTUzNjk5MzcxMn0.BUOGxhrHYnwV3PskMkt7x243QzO_nxhRP_zZBB6OWkM';
describe('Message tests', () => {
  it('It should detect if messageBody field was provided', (done) => {
    supertest(app).post('/api/group/1/message').set('x-access-token', token).send()
    .end((err, res) => {
      assert.equal(res.body.error, 'messageBody field not provided');
      done();
    });
  });
  it('It should detect if messagePriority field was provided', (done) => {
    const message = {
      messageBody: 'this is a message',
    };
    supertest(app).post('/api/group/1/message').set('x-access-token', token).send(message)
    .end((err, res) => {
      assert.equal(res.body.error, 'messagePriority field not provided');
      done();
    });
  });
  // it('It should create message if input is well structured', (done) => {
  //   const message = {
  //     messageBody: 'this is a message',
  //     messagePriority: 'Normal',
  //   };
  //   supertest(app).post('/api/group/1/message').set('x-access-token', token).send(message)
  //   .end((err, res) => {
  //     assert.equal(res.body.error, 'messagePriority field not provided');
  //     done();
  //   });
  // });
});
