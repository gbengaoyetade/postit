import { assert } from 'chai';
import { groupExist, groupAndUserExist } from '../server/middleware/exist';

// Middleware tests
describe('Middleware', () => {
  it('should have groupExist function defined', (done) => {
    assert.equal(typeof groupExist, 'function');
    done();
  });
  it('should have groupAndUserExist function defined', (done) => {
    assert.equal(typeof groupAndUserExist, 'function');
    done();
  });
});
