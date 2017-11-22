import { assert } from 'chai';
import supertest from 'supertest';
import './tests.includes';
import app from '../server/app';
import { checkParams, getId, checkInputLength } from '../server/includes/functions';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZnVsbE5hbWUiOiJnYmVuZ2EgT3lldGFkZSIsImVtYWlsIjoiZ2JlbmdhLm95ZXRhZGVAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIwODA2NDE0MDY5NSIsImlhdCI6MTUwODcyOTExMSwiZXhwIjoxNTQwMjY1MTExfQ.jEyMrWd4FjnKsPM-3yIL9w1o6YdzP2MbOZ2b3nd9LDM';
describe('checkParams function', () => {
  it('should be defined', () => {
    assert.equal(typeof checkParams, 'function');
  });
  it('should return ok if inputs are well structured', () => {
    const request = {
      name: 'gbenga',
      email: 'gbenga.oyetade@gmail.com',
    };
    const requiredFields = ['name', 'email'];
    assert.equal(checkParams(request, requiredFields), 'ok');
  });
  it('should return the first missing field if not provided',
  () => {
    const request = {
      name: 'gbenga',
      email: 'gbenga.oyetade@gmail.com',
    };
    const requiredFields = ['name', 'email', 'age'];
    assert.equal(checkParams(request, requiredFields),
    'age field not provided');
  });
});
describe('getId function', () => {
  it('should be defined', () => {
    assert.equal(typeof getId, 'function');
  });
  it('should return a number if token is passed', () => {
    assert.equal(typeof getId(token), 'number');
  });
});
describe('checkInputLength', () => {
  it('should accept two parameters', () => {
    const response = checkInputLength('name');
    assert.equal(typeof response, 'string');
  });
  it('should return an error object when inputs are correctly structured',
  () => {
    const response = checkInputLength({ name: 'Gbenga' }, ['name']);
    assert.deepEqual(response, {});
  });
  it('should return an error for input lenght greater than 255',
  () => {
    const longInput = { statement:
      `is simply dummy text of the printing and typesetting
     industry. Lorem Ipsum has been the industrys standard
     dummy text ever since the 1500s, when an unknown printer took
     a galley of type and scrambled it to make a type specimen book` };
    const response = checkInputLength(longInput, ['statement']);
    assert.deepEqual(response, {});
  });
});
