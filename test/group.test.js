import { assert } from 'chai';
import supertest from 'supertest';
import db from '../server/models/index';
import app from '../server/app';


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZnVsbE5hbWUiOiJnYmVuZ2EgT3lldGFkZSIsImVtYWlsIjoidGVzdF9zaWdudXBAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIrMjM0ODA2NDE0MDY5NTMzIiwiaWF0IjoxNTA4NjkzNTQ4LCJleHAiOjE1NDAyMjk1NDh9.NmVm9HklrmPDs67p-aC7moae5xgRQMY5emdhaWRM3V8';

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
    const groupData = {
      groupName: '  ',
      groupDescription: 'description',
      createdBy: 1 };
    supertest(app).post('/api/group').set('x-access-token', token)
    .send(groupData)
    .end((err, res) => {
      assert.equal(res.body.error.groupName, 'Field cannot be empty');
      assert.equal(res.statusCode, 400);
      done();
    });
  });
  it('Should not create group if group description is empty', (done) => {
    const groupData = {
      groupName: 'group name',
      groupDescription: ' ',
      createdBy: 1 };
    supertest(app).post('/api/group').set('x-access-token', token)
    .send(groupData)
    .end((err, res) => {
      assert.equal(res.body.error.groupDescription, 'Field cannot be empty');
      assert.equal(res.statusCode, 400);
      done();
    });
  });
  it('should create group when the right details are supplied', (done) => {
    const groupData = {
      groupName: 'test group 2',
      groupDescription: 'test group description',
      createdBy: 1 };
    supertest(app).post('/api/group').set('x-access-token', token)
    .send(groupData)
    .end((err, res) => {
      assert.equal(res.statusCode, 201);
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
  it('should return error when server cannot process request', (done) => {
    db.groups.find = () => Promise.reject('dsfafd');
    supertest(app).get('/api/group/1/users').set('x-access-token', token)
    .send()
    .end((err, res) => {
      assert.isOk(res.body.error);
      assert.equal(res.statusCode, 500);
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
      assert.equal(res.statusCode, 401);
      done();
    });
  });
  // it('should send a error when server can process request on leave group',
  // (done) => {
  //   db.groupMembers.findOne = () => Promise.reject('dsfafd');
  //   supertest(app).delete('/api/group/1/leave').set('x-access-token', token)
  //   .send()
  //   .end((err, res) => {
  //     // assert.isOk(res.body.err);
  //     assert.equal(res.statusCode, 500);
  //     done();
  //   });
  // });
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