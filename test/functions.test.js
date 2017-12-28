import { assert } from 'chai';
import './tests.includes';
import {
  getId,
  encryptPassword } from '../server/includes/helperFunctions';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZnVsbE5hbWUiOiJnYmVuZ2EgT3lldGFkZSIsImVtYWlsIjoiZ2JlbmdhLm95ZXRhZGVAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIwODA2NDE0MDY5NSIsImlhdCI6MTUwODcyOTExMSwiZXhwIjoxNTQwMjY1MTExfQ.jEyMrWd4FjnKsPM-3yIL9w1o6YdzP2MbOZ2b3nd9LDM';
describe('getId function', () => {
  it('should be defined', () => {
    assert.equal(typeof getId, 'function');
  });
  it('should return a number if token is passed', () => {
    assert.equal(typeof getId(token), 'number');
  });
});
describe('encryptPassword', () => {
  it('should accept a string only', () => {
    const returnValue = encryptPassword(['arrayIndex0']);
    assert.equal(returnValue, 'Wrong input type');
  });
  it('should return an encrypted string if string is provided', () => {
    const password = 'password';
    const returnValue = encryptPassword(password);
    assert.equal(typeof returnValue, 'string');
    assert.notEqual(returnValue, password);
  });
});
