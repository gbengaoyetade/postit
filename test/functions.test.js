import { assert } from 'chai';
import { validateInput, getId } from '../server/includes/functions';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoyLCJpYXQiOjE1MDQyODk2NzYsImV4cCI6MTUzNTgyNTY3Nn0.x3Kd6Iyc-8-RU8y5Z_-80kcXPF8IlteXqhVANJW6BQM';
describe('Functions test', () => {
  it('Detect validateInput function', () => {
    assert.equal(typeof validateInput, 'function');
  });
  it('Detect getId function', () => {
    assert.equal(typeof getId, 'function');
  });
  it('getId should return a number if token is passed', () => {
    assert.equal(typeof getId(token), 'number');
  });
  it('validateInput should return ok if inputs are well structured', () => {
    const request = {
      name: 'gbenga',
      email: 'gbenga.oyetade@gmail.com',
    };
    const requiredFields = ['name', 'email'];
    assert.equal(validateInput(request, requiredFields), 'ok');
  });
  it('validateInput should return the first missing field if not provided', () => {
    const request = {
      name: 'gbenga',
      email: 'gbenga.oyetade@gmail.com',
    };
    const requiredFields = ['name', 'email', 'age'];
    assert.equal(validateInput(request, requiredFields), 'age field not provided');
  });
});
