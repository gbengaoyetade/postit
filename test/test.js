import { assert } from 'chai';
import supertest from 'supertest';
import testInclude from './tests.includes';
import app from '../server/app';


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZnVsbE5hbWUiOiJnYmVuZ2EgT3lldGFkZSIsImVtYWlsIjoidGVzdF9zaWdudXBAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIrMjM0ODA2NDE0MDY5NTMzIiwiaWF0IjoxNTA4NjkzNTQ4LCJleHAiOjE1NDAyMjk1NDh9.NmVm9HklrmPDs67p-aC7moae5xgRQMY5emdhaWRM3V8';
describe('Signup', () => {
  before(() => {
    testInclude();
  });
  describe('URL', () => {
    it('should be defined', (done) => {
      supertest(app).post('/api/user/signup').send().end((err, res) => {
        assert.equal(res.statusCode, 400);
        done();
      });
    });
  });
  it('should detect invalid email address', (done) => {
    const wrongEmail = {
      fullName: 'gbenga Oyetade',
      username: 'apptest',
      password: 'some password',
      email: 'apptestgmail.com',
      phoneNumber: '+2348064140695' };
    supertest(app).post('/api/user/signup').send(wrongEmail).end((err, res) => {
      assert.equal(res.body.error, 'Invalid email address supplied');
      done();
    });
  });
  it('should make sure password parameter is at least 6 characters', (done) => {
    const user = {
      fullName: 'gbenga Oyetade',
      username: 'gbenga_ps',
      password: 'pass',
      email: 'ioyetade@gmail.com',
      phoneNumber: '+2348064140695' };
    supertest(app).post('/api/user/signup').send(user).end((err, res) => {
      assert.equal(res.body.error, 'Password must be at least 6 characters');
      done();
    });
  });
  it('should detect if username contains special characters', (done) => {
    const user = {
      fullName: 'gbenga Oyetade',
      username: '$gbenga_ps',
      password: 'password',
      email: 'ioyetade2@gmail.com',
      phoneNumber: '+2348064140695' };
    supertest(app).post('/api/user/signup').send(user).end((err, res) => {
      assert.equal(res.body.error,
        'Username cannot contain special characters aside from _');
      done();
    });
  });
  it('should sign user up if parameters are well structured', (done) => {
    const user = {
      fullName: 'gbenga Oyetade',
      username: 'test_signup',
      password: 'password',
      email: 'test_signup@gmail.com',
      phoneNumber: '+234806414069533' };
    supertest(app).post('/api/user/signup').send(user).end((err, res) => {
      assert.isOk(res.body.user.token);
      done();
    });
  });
});

// Test for the group controller
describe('Create group', () => {
  it('route should be defined ', (done) => {
    supertest(app).post('/api/group').set('x-access-token', token).send()
    .end((err, res) => {
      assert.equal(res.body.error, 'groupName field not provided');
      done();
    });
  });
  it('Should detect if groupName field is not provided', (done) => {
    supertest(app).post('/api/group').set('x-access-token', token).send()
    .end((err, res) => {
      assert.equal(res.body.error, 'groupName field not provided');
      done();
    });
  });
  it('Should not create group if group name is empty', (done) => {
    const groupData = { groupName: '  ', groupDescription: '', createdBy: 1 };
    supertest(app).post('/api/group').set('x-access-token', token)
    .send(groupData)
    .end((err, res) => {
      assert.equal(res.body.error, 'Could not create group');
      assert.equal(res.statusCode, 400);
      assert.isOk(res.body.message);
      done();
    });
  });
  it('Should detect if group description field is not provided', (done) => {
    const groupData = { groupName: 'react leaders' };
    supertest(app).post('/api/group').set('x-access-token', token)
    .send(groupData)
    .end((err, res) => {
      assert.equal(res.body.error, 'groupDescription field not provided');
      done();
    });
  });
});
describe('getGroupMembers', () => {
  it('endpoint should be defined', (done) => {
    supertest(app).get('/api/group/1/users').set('x-access-token', token)
    .send()
    .end((err, res) => {
      assert.notEqual(res.statusCode, 404);
      done();
    });
  });
  it('should detect if groupId is a number', (done) => {
    supertest(app).get('/api/group/k/users').set('x-access-token', token)
    .send()
    .end((err, res) => {
      assert.equal(res.statusCode, 400);
      assert.equal(res.body.error, 'groupId is not a number');
      done();
    });
  });
  it('should return group members', (done) => {
    supertest(app).get('/api/group/1/users').set('x-access-token', token)
    .send()
    .end((err, res) => {
      assert.isOk(res.body.users);
      assert.equal(res.statusCode, 200);
      done();
    });
  });
});
describe('Leave group', () => {
  it('endpoint should be defined', (done) => {
    supertest(app).delete('/api/group/e/leave')
    .set('x-access-token', token).send()
    .end((err, res) => {
      assert.notEqual(res.statusCode, 404);
      done();
    });
  });
  it('should detect if group exist', (done) => {
    supertest(app).delete('/api/group/10789/leave')
    .set('x-access-token', token).send()
    .end((err, res) => {
      assert.equal(res.body.error, 'Group does not exist');
      done();
    });
  });
  it('should detect if user belongs to group', (done) => {
    supertest(app).delete('/api/group/2/leave')
    .set('x-access-token', token).send()
    .end((err, res) => {
      assert.equal(res.body.error, 'User not a member of the group');
      done();
    });
  });
  it('should remove user from group if he belongs to the group',
  (done) => {
    supertest(app).delete('/api/group/1/leave').set('x-access-token', token)
    .send()
    .end((err, res) => {
      assert.isOk(res.body.message);
      assert.equal(res.statusCode, 200);
      done();
    });
  });
  it('should detect if user is a member of the group', (done) => {
    supertest(app).delete('/api/group/2/leave').set('x-access-token', token)
    .send()
    .end((err, res) => {
      assert.isOk(res.body.error);
      assert.equal(res.statusCode, 400);
      done();
    });
  });
});
describe('Add member', () => {
  it('function should be defined', (done) => {
    const groupData = {};
    supertest(app).post('/api/group/1/user').set('x-access-token', token)
    .send(groupData)
    .end((err, res) => {
      assert.notEqual(res.statusCode, 404);
      assert.equal(res.statusCode, 400);
      assert.isOk(res.body.error);
      done();
    });
  });
  it('should to a group if conditions are satisfactory',
  (done) => {
    const groupData = { userId: 1 };
    supertest(app).post('/api/group/1/user').set('x-access-token', token)
    .send(groupData)
    .end((err, res) => {
      assert.equal(res.body.message, 'User successfully added to group');
      assert.isOk(res.body.member);
      done();
    });
  });
  it('should detect if user is already a member of the group',
  (done) => {
    const groupData = { userId: 1 };
    supertest(app).post('/api/group/1/user').set('x-access-token', token)
    .send(groupData)
    .end((err, res) => {
      assert.equal(res.body.error, 'User already a member of this group');
      done();
    });
  });
  it('should detect if groupId is an integer', (done) => {
    supertest(app).get('/api/group/3ttt/users').set('x-access-token', token)
    .send()
    .end((err, res) => {
      assert.isOk(res.body.error);
      assert.equal(res.statusCode, 400);
      assert.equal(res.body.error, 'groupId is not a number');
      done();
    });
  });
});
// Login tests
describe('Login', () => {
  it('endpoint should be defined', (done) => {
    supertest(app).post('/api/user/signin').send().end((err, res) => {
      assert.notEqual(res.statusCode, 404);
      done();
    });
  });
  it('should detect if parameters are correct', (done) => {
    supertest(app).post('/api/user/signin').send().end((err, res) => {
      assert.isOk(res.body.error);
      assert.equal(res.statusCode, 400);
      done();
    });
  });
  it('should return 401 error if user does not exist', (done) => {
    const user = {
      username: 'does not exist',
      password: 'password',
    };
    supertest(app).post('/api/user/signin').send(user).end((err, res) => {
      assert.equal(res.statusCode, 401);
      done();
    });
  });
  it('should return a token on successful login', (done) => {
    const userDetails = {
      username: 'apptest', password: 'some password',
    };
    supertest(app).post('/api/user/signin')
    .send(userDetails).end((err, res) => {
      assert.isOk(res.body.user.token);
      assert.isOk(res.body.user.id);
      assert.isOk(res.body.user.email);
      assert.equal(res.body.user.username, userDetails.username);
      done();
    });
  });
  it('should login user if email is provided in the username field', (done) => {
    const userDetails = {
      username: 'apptest@gmail.com', password: 'some password',
    };
    supertest(app).post('/api/user/signin')
    .send(userDetails).end((err, res) => {
      assert.isOk(res.body.user.token);
      assert.isOk(res.body.user.id);
      assert.isOk(res.body.user.email);
      assert.equal(res.body.user.username, 'apptest');
      done();
    });
  });
});

// reset password tests

describe('Reset password', () => {
  it('Should detect if email was provided', (done) => {
    supertest(app).post('/api/user/password/reset').send().end((err, res) => {
      assert.equal(res.body.message, 'Parameter not well structured');
      assert.isOk(res.body.error);
      assert.equal(res.statusCode, 400);
      done();
    });
  });
  it('Should detect if provided email exists', (done) => {
    const email = { email: 'something@gmail.com' };
    supertest(app).post('/api/user/password/reset').send(email)
    .end((err, res) => {
      assert.equal(res.body.error, 'Email address does not exist on Postit');
      assert.equal(res.statusCode, 400);
      done();
    });
  });
  it('Should should send mail if email exist', (done) => {
    const email = { email: 'apptest@gmail.com' };
    supertest(app).post('/api/user/password/reset').send(email)
    .end((err, res) => {
      assert.equal(res.body.message, 'Mail sent successfully');
      assert.equal(res.statusCode, 200);
      done();
    });
  });
});

// update password tests
describe('Update password', () => {
  it('should detect if the password field was provided', (done) => {
    supertest(app).post('/api/user/password/update').send().end((err, res) => {
      assert.isOk(res.body.error);
      assert.equal(res.statusCode, 400);
    });
    done();
  });
  it('should detect if url contains token', (done) => {
    const password = { password: 'password' };
    supertest(app).post('/api/user/password/update').send(password)
    .end((err, res) => {
      assert.equal(res.body.error, 'No token provided');
      assert.equal(res.statusCode, 401);
    });
    done();
  });
  it('should verify token if provided', (done) => {
    const password = { password: 'password' };
    supertest(app).post('/api/user/password/update?token=whatever')
    .send(password).end((err, res) => {
      assert.equal(res.body.error, 'Token authentication failure');
      assert.equal(res.statusCode, 401);
    });
    done();
  });
});
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
describe('Authenticate', () => {
  it('should detect if token is not provided', (done) => {
    supertest(app).get('/api/group').send().end((err, res) => {
      assert.equal(res.body.error, 'No token provided');
      assert.equal(res.statusCode, 400);
      done();
    });
  });
  it('should detect if token is invalid', (done) => {
    supertest(app).get('/api/group').set('x-access-token', 'invalid token')
    .send()
    .end((err, res) => {
      assert.equal(res.body.error, 'Token authentication failure');
      assert.equal(res.statusCode, 401);
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
