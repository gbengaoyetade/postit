import { assert } from 'chai';
import supertest from 'supertest';
import app from '../server/app';
import { tokens } from './tests.includes';
import database from '../server/models/';

const { messages, groups } = database;
const { token1, token2 } = tokens();
describe('Message ', () => {
  it('should send error when required fields are missing', (done) => {
    supertest(app).post('/api/group/1/message')
      .set('x-access-token', token1).send()
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        assert.equal(res.body.error.messageBody,
        'messageBody field is required');
        assert.equal(res.body.error.messagePriority,
        'messagePriority field is required');
        done();
      });
  });
  it('should send error message when messagePriority is not Normal, Urgent or Critical',
  (done) => {
    const message = {
      messageBody: 'this is a message',
      messagePriority: 'something'
    };
    supertest(app).post('/api/group/3/message')
    .set('x-access-token', token1)
    .send(message)
    .end((err, res) => {
      assert.equal(res.statusCode, 400);
      assert.equal(res.body.error.messagePriority,
      'messagePriority can only be Normal, Urgent or Critical');
      done();
    });
  });
  it('should create message when inputs are valid', (done) => {
    const message = {
      messageBody: 'this is a message',
      messagePriority: 'Normal',
    };
    supertest(app).post('/api/group/3/message')
    .set('x-access-token', token1).send(message)
    .end((err, res) => {
      assert.equal(res.statusCode, 201);
      assert.equal(res.body.message.messageBody, message.messageBody);
      assert.equal(res.body.message.messagePriority, message.messagePriority);
      done();
    });
  });
});
describe('Get Messages', () => {
  it('should return status 200 and message when provided the right information',
  (done) => {
    supertest(app).get('/api/group/3/messages')
    .set('x-access-token', token1)
    .send()
    .end((err, res) => {
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.messages[0].messageBody, 'this is a message');
      assert.equal(res.body.messages[0].messagePriority, 'Normal');
      done();
    });
  });
  it('should create message when priority is Urgent or Critical',
  (done) => {
    const message = {
      messageBody: 'this is a message',
      messagePriority: 'Urgent',
    };
    supertest(app).post('/api/group/3/message')
    .set('x-access-token', token2).send(message)
    .end((err, res) => {
      assert.equal(res.statusCode, 201);
      assert.equal(res.body.message.messageBody, message.messageBody);
      assert.equal(res.body.message.messagePriority, message.messagePriority);
      done();
    });
  });
  it('should return a 500 error when server process .findAll request',
  (done) => {
    messages.findAll = () => Promise.reject('dsfafd');
    supertest(app).get('/api/group/3/messages').set('x-access-token', token2)
    .send()
    .end((err, res) => {
      assert.equal(res.statusCode, 500);
      assert.equal(res.body.error, 'Internal server error');
      done();
    });
  });
  it('should return a 500 error when server process .create() request',
  (done) => {
    const message = {
      messageBody: 'this is a message',
      messagePriority: 'Normal',
    };
    messages.create = () => Promise.reject('dsfafd');
    supertest(app).post('/api/group/3/message').set('x-access-token', token1)
    .send(message)
    .end((err, res) => {
      assert.equal(res.statusCode, 500);
      assert.equal(res.body.error, 'Internal server error');
      done();
    });
  });
  it('should return a 500 error when server process groups.find() request',
  (done) => {
    const message = {
      messageBody: 'this is a message',
      messagePriority: 'Normal',
    };
    groups.find = () => Promise.reject('dsfafd');
    supertest(app).post('/api/group/3/message').set('x-access-token', token1)
    .send(message)
    .end((err, res) => {
      assert.equal(res.statusCode, 500);
      assert.equal(res.body.error, 'Internal server error');
      done();
    });
  });
});

