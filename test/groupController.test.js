import { assert } from 'chai';
import supertest from 'supertest';
import app from '../server/app';
import { tokens, seedDatabase } from './testIncludes';

const appHolder = supertest(app);
// Test for the group controller
const { firstUserToken, secondUserToken } = tokens();
describe('Create group', () => {
  before((done) => {
    seedDatabase();
    done();
  });
  it('should send error message when required fields are missing',
  (done) => {
    supertest(app).post('/api/group').set('x-access-token', firstUserToken).send()
    .end((err, res) => {
      assert.equal(res.statusCode, 400);
      assert.equal(res.body.error.groupName, 'groupName field is required');
      assert.equal(res.body.error.groupDescription,
      'groupDescription field is required');
      done();
    });
  });
  it('should send error message when groupName field is empty', (done) => {
    const groupData = {
      groupName: '  ',
      groupDescription: 'description',
      createdBy: 1 };
    supertest(app).post('/api/group').set('x-access-token', firstUserToken)
    .send(groupData)
    .end((err, res) => {
      assert.equal(res.body.error.groupName, 'Expects a string of alphabets');
      assert.equal(res.statusCode, 400);
      done();
    });
  });
  it('Should send error message when group description field is not provided',
  (done) => {
    const groupData = { groupName: 'react leaders' };
    supertest(app).post('/api/group').set('x-access-token', firstUserToken)
    .send(groupData)
    .end((err, res) => {
      assert.equal(res.body.error.groupDescription,
      'groupDescription field is required');
      done();
    });
  });
  it('Should not create group if group description is empty', (done) => {
    const groupData = {
      groupName: 'group name',
      groupDescription: ' ' };
    supertest(app).post('/api/group').set('x-access-token', firstUserToken)
    .send(groupData)
    .end((err, res) => {
      assert.equal(res.statusCode, 400);
      assert.equal(res.body.error.groupDescription,
        'Expects a string of alphabets');
      done();
    });
  });
  it('should create group when valid details are supplied', (done) => {
    const groupData = {
      groupName: 'test group 2',
      groupDescription: 'test group description' };
    supertest(app).post('/api/group').set('x-access-token', firstUserToken)
    .send(groupData)
    .end((err, res) => {
      assert.equal(res.statusCode, 201);
      assert.equal(res.body.group.groupName, groupData.groupName);
      assert.equal(res.body.group.groupDescription, groupData.groupDescription);
      assert.equal(res.body.message, 'Group created successfully');
      done();
    });
  });
  it('should return error when group name already exist', (done) => {
    const groupData = {
      groupName: 'test group 2',
      groupDescription: 'description' };
    supertest(app).post('/api/group').set('x-access-token', firstUserToken)
    .send(groupData)
    .end((err, res) => {
      assert.equal(res.statusCode, 409);
      assert.equal(res.body.error, 'group name already exist');
      done();
    });
  });
});
describe('getGroupMembers', () => {
  it('should send error when groupId is not a number', (done) => {
    supertest(app).get('/api/group/k/users').set('x-access-token', firstUserToken)
    .send()
    .end((err, res) => {
      assert.equal(res.statusCode, 400);
      assert.equal(res.body.error, 'groupId is not a number');
      done();
    });
  });
  it('should return group members when inputs are valid', (done) => {
    supertest(app).get('/api/group/2/users').set('x-access-token', secondUserToken)
    .send()
    .end((err, res) => {
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.members[0].id, 2);
      assert.equal(res.body.members[0].fullName, 'Gbenga Oyetade');
      done();
    });
  });
});
describe('Add member', () => {
  it('should send error message when user does not exist', (done) => {
    const groupData = { userId: 56 };
    supertest(app).post('/api/group/1/user').set('x-access-token', firstUserToken)
    .send(groupData)
    .end((err, res) => {
      assert.equal(res.statusCode, 404);
      assert.equal(res.body.error, 'User does not exist');
      done();
    });
  });
  it('should add user to a group when inputs are valid',
  (done) => {
    const groupData = { userId: 2 };
    supertest(app).post('/api/group/3/user').set('x-access-token', firstUserToken)
    .send(groupData)
    .end((err, res) => {
      assert.equal(res.body.message, 'User successfully added to group');
      assert.equal(res.body.member.groupId, 3);
      assert.equal(res.body.member.userId, 2);
      assert.equal(res.body.member.addedBy, 1);
      done();
    });
  });
  it('should send error message when user is already a member of the group',
  (done) => {
    const groupData = { userId: 2 };
    supertest(app).post('/api/group/3/user').set('x-access-token', firstUserToken)
    .send(groupData)
    .end((err, res) => {
      assert.equal(res.statusCode, 409);
      assert.equal(res.body.error, 'User already a member of this group');
      done();
    });
  });
  it('should send error message when groupId not a number', (done) => {
    supertest(app).get('/api/group/3ttt/users').set('x-access-token', firstUserToken)
    .send()
    .end((err, res) => {
      assert.isOk(res.body.error);
      assert.equal(res.statusCode, 400);
      assert.equal(res.body.error, 'groupId is not a number');
      done();
    });
  });
});

describe('Delete group', () => {
  it('should send error message when user is not the group creator', (done) => {
    appHolder.delete('/api/group/3/delete').set('x-access-token', token2)
    .send()
    .end((err, res) => {
      assert.equal(res.statusCode, 403);
      assert.equal(res.body.error, 'You did not create this group');

      done();
    });
  });
  it('should delete group when all conditions are satisfied', (done) => {
    supertest(app).delete('/api/group/3/delete').set('x-access-token', token1)
    .send()
    .end((err, res) => {
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.message, 'Group deleted successfully');
      done();
    });
  });
});

describe('Leave group', () => {
  it('should send error message when group does not exist', (done) => {
    supertest(app).delete('/api/group/10789/leave')
    .set('x-access-token', firstUserToken).send()
    .end((err, res) => {
      assert.equal(res.statusCode, 404);
      assert.equal(res.body.error, 'Group does not exist');
      done();
    });
  });

  it('should send error message when user does not belong to group', (done) => {
    supertest(app).delete('/api/group/2/leave')
    .set('x-access-token', firstUserToken).send()
    .end((err, res) => {
      assert.equal(res.statusCode, 403);
      assert.equal(res.body.error, 'User not a member of the group');
      done();
    });
  });

  it('should remove user from group if he belongs to the group',
  (done) => {
    supertest(app).delete('/api/group/2/leave').set('x-access-token', secondUserToken)
    .send()
    .end((err, res) => {
      assert.equal(res.body.message, 'User left group');
      assert.equal(res.statusCode, 200);
      done();
    });
  });

  it('should send error message when user is not a group member',
  (done) => {
    supertest(app).delete('/api/group/2/leave').set('x-access-token', firstUserToken)
    .send()
    .end((err, res) => {
      assert.equal(res.body.error, 'User not a member of the group');
      assert.equal(res.statusCode, 403);
      done();
    });
  });
});
