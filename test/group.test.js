import { assert } from 'chai';
import supertest from 'supertest';
import app from '../server/app';

describe('group test', () => {
  it('Group name field is required ', (done) => {
    supertest(app).post('/api/group').send().end((err, res) => {
      assert.equal(res.statusCode, 401);
      done();
    });
  });
});
