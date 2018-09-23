import { assert } from 'chai';
import { getId, encryptPassword } from '../server/includes/helperFunctions';
import { tokens } from './testIncludes';

const { token1 } = tokens();
describe('getId function', () => {
  it('should be defined', () => {
    assert.equal(typeof getId, 'function');
  });
  it('should return a number when token is passed', () => {
    assert.equal(typeof getId(token1), 'number');
  });
});
describe('encryptPassword', () => {
  it('should send error message when string is not passed', () => {
    const returnValue = encryptPassword(['arrayIndex0']);
    assert.equal(returnValue, 'Wrong input type');
  });
  it('should return an encrypted string when provided with valid input', () => {
    const password = 'password';
    const encryptedPassword = encryptPassword(password);
    assert.equal(typeof encryptedPassword, 'string');
    assert.notEqual(encryptedPassword, password);
  });
});
