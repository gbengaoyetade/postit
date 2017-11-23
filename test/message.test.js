import { assert } from 'chai';
import supertest from 'supertest';
import app from '../server/app';
import seedDb from './tests.includes';

seedDb();
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZnVsbE5hbWUiOiJnYmVuZ2EgT3lldGFkZSIsImVtYWlsIjoiYXBwdGVzdDIyQGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiKzIyMzQ4MDY0MTQwNjkyNSIsImlhdCI6MTUwODY5MjIwNSwiZXhwIjoxNTQwMjI4MjA1fQ.z0gYZWEZGF15KsBJKh2dQWdyVg4EOvuVTuz2vZhHjV8';
describe('Message ', () => {
  it('should detect if messageBody field was provided', (done) => {
    supertest(app).post('/api/group/1/message')
      .set('x-access-token', token).send()
      .end((err, res) => {
        assert.equal(res.body.error, 'messageBody field not provided');
        done();
      });
  });
  it('should detect if messagePriority field was provided', (done) => {
    const message = {
      messageBody: 'this is a message',
    };
    supertest(app).post('/api/group/1/message')
    .set('x-access-token', token)
    .send(message)
    .end((err, res) => {
      assert.equal(res.body.error, 'messagePriority field not provided');
      done();
    });
  });
  it('should create message if input is well structured', (done) => {
    const message = {
      messageBody: 'this is a message',
      messagePriority: 'Normal',
    };
    supertest(app).post('/api/group/1/message')
    .set('x-access-token', token).send(message)
    .end((err, res) => {
      assert.equal(res.statusCode, 201);
      assert.isOk(res.body.message);
      done();
    });
  });
  it('should return status 200 and message if provided the right information',
  (done) => {
    supertest(app).get('/api/group/2/messages')
    .set('x-access-token', token)
    .send()
    .end((err, res) => {
      assert.isOk(res.body.messages);
      assert.equal(res.statusCode, 200);
      done();
    });
  });
  it('should send mail to group members if priority is not Normal', (done) => {
    const message = {
      messageBody: 'this is a message',
      messagePriority: 'Urgent',
    };
    supertest(app).post('/api/group/1/message')
    .set('x-access-token', token).send(message)
    .end((err, res) => {
      assert.equal(typeof res.body.message, 'object');
      assert.isOk(res.body.message);
      done();
    });
  });
});
