import { assert } from 'chai';
import supertest from 'supertest';
import app from '../server/app';
import emptyDb from './tests.includes';

emptyDb();
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoyLCJpYXQiOjE1MDU2Mjc0NjMsImV4cCI6MTUzNzE2MzQ2M30.-rRkw5-BzdYUqrCHCWM2we5Xx5xoF8-Ir7DM1NIrzjM';
// const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoxLCJpYXQiOjE1MDU2MjU2NTQsImV4cCI6MTUzNzE2MTY1NH0.dK3aJerDL9gFNrtV06x6aSBO1Idbn1oCxTPhEsAwqD0';
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
  it('It should create message if input is well structured', (done) => {
    const message = {
      messageBody: 'this is a message',
      messagePriority: 'Normal',
    };
    supertest(app).post('/api/group/1/message').set('x-access-token', token).send(message)
    .end((err, res) => {
      assert.equal(res.statusCode, 201);
      assert.isOk(res.body.message);
      done();
    });
  });
  // it('It should send mail if message priority is urgent or critical', (done) => {
  //   const message = {
  //     messageBody: 'this is a message',
  //     messagePriority: 'Urgent',
  //   };
  //   supertest(app).post('/api/group/1/message').set('x-access-token', token).send(message)
  //   .end((err, res) => {
  //     assert.equal(res.statusCode, 201);
  //     assert.isOk(res.body.message);
  //     done();
  //   });
  // });
  it('getMessages should return status 200 and message if provided the right information', (done) => {
    supertest(app).get('/api/group/2/messages').set('x-access-token', token).send()
    .end((err, res) => {
      assert.equal(res.statusCode, 200);
      assert.isOk(res.body.messages);
      done();
    });
  });
});
