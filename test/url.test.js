import { assert } from 'chai';
import supertest from 'supertest';
import app from '../server/app';

describe('Undefined GET urls', () => {
  it(' should return 200 statusCode', (done) => {
    supertest(app)
      .get('/whatever')
      .send()
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        done();
      });
  });
});
describe('Undefined POST urls', () => {
  it('should return an error message', (done) => {
    supertest(app)
      .post('/whatever')
      .send()
      .end((err, res) => {
        assert.equal(res.statusCode, 404);
        assert.equal(res.body.error, 'URL does not exist on this server');
        done();
      });
  });
});
