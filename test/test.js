import { assert } from 'chai';
import supertest from 'supertest';
import app from '../server/app';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZnVsbE5hbWUiOiJnYmVuZ2EgT3lldGFkZSIsImVtYWlsIjoidGVzdF9zaWdudXBAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIrMjM0ODA2NDE0MDY5NTMzIiwiaWF0IjoxNTA4NjkzNTQ4LCJleHAiOjE1NDAyMjk1NDh9.NmVm9HklrmPDs67p-aC7moae5xgRQMY5emdhaWRM3V8';
// Message test

// General Application tests
describe('Undefined GET urls', () => {
  it(' should return 404 statusCode', (done) => {
    supertest(app).get('/whatever').send().end((err, res) => {
      assert.equal(res.statusCode, 404);
      done();
    });
  });
});
describe('Undefined POST urls', () => {
  it('should return 404 statusCode', (done) => {
    supertest(app).post('/whatever').send().end((err, res) => {
      assert.equal(res.statusCode, 404);
      done();
    });
  });
  it('should return a message', (done) => {
    supertest(app).post('/whatever').send().end((err, res) => {
      assert.isOk(res.body.message);
      done();
    });
  });
});
describe('API doc', () => {
  it('should be defined', (done) => {
    supertest(app).get('/doc')
    .send().end((err, res) => {
      assert.notEqual(res.statusCode, 404);
      done();
    });
  });
});

// user search test
describe('User search', () => {
  it('should be defined', () => {
    supertest(app).get('/api/user/search')
    .send()
    .end((err, res) => {
      assert.notEqual(res.statusCode, 404);
    });
  });
  it('should return results for every search', (done) => {
    supertest(app).get('/api/user/search?query=a&limit=1')
    .set('x-access-token', token)
    .send()
    .end((err, res) => {
      assert.isOk(res.body.pageCount);
      assert.isOk(res.body.users);
      assert.isOk(res.body.count);
      done();
    });
  });
  it('should return 0 as pageCount when limit is not provided', (done) => {
    supertest(app).get('/api/user/search?query=gb')
    .set('x-access-token', token)
    .send()
    .end((err, res) => {
      assert.equal(res.body.pageCount, 0);
      done();
    });
  });
});
