import { assert } from 'chai';
import { groupExist, groupAndUserExist } from '../server/middleware/exist';

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
});
