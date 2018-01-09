import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../actions/groupActions';

const mockStore = configureMockStore([
  thunk
]);
const mockGroup = {
  groupId: 19,
  groupName: 'create group',
  groupDescription: 'new group',
  createdBy: 1,
};
const mockGroups = [{
  groupId: 19,
  groupName: 'create group',
  groupDescription: 'new group',
  createdBy: 1,
}];
const mockMessages = [
  {
    id: 2,
    messageBody: 'hello ',
    messagePriority: 'Normal',
    groupId: 1,
    userId: 1,
    createdAt: '2018-01-04T12:05:52.798Z',
    user: {
      id: 1,
      username: 'michi',
      fullName: 'Agbo amarachi',
      email: 'amarachi@gmail.com',
      phoneNumber: '08064140695'
    },
  }
];
const mockMembers = {
  id: 1,
  username: 'michi',
  fullName: 'Agbo amarachi',
  email: 'amarachi@gmail.com',
  phoneNumber: '08064140695',
  groupMembers: {
    userId: 1,
    addedBy: 1,
    groupId: 1,
    createdAt: '2018-01-04T11:53:50.773Z',
    updatedAt: '2018-01-04T11:53:50.773Z'
  }
};
const mockHistory = {
  push: () => {}
};
const mockError = 'Group already exist';
describe('Group Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('dispatches CREATE_NEW_GROUP when create group is successful', () => {
    moxios.stubRequest('/api/group', {
      status: 200,
      response: { group: mockGroup }
    });
    const expectedActions = [
      { type: 'CREATE_NEW_GROUP', groupDetails: mockGroup }
    ];
    const store = mockStore({});
    return store.dispatch(actions.createGroup({}, mockHistory))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('dispatches CREATE_GROUP_ERROR when group exists', () => {
    moxios.stubRequest('/api/group', {
      status: 409,
      response: { error: mockError }
    });
    const expectedActions = [
      { type: 'CREATE_GROUP_ERROR', groupError: mockError }
    ];
    const store = mockStore({});
    return store.dispatch(actions.createGroup({}, mockHistory))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('dispatches GET_USER_GROUPS when get groups is successful', () => {
    moxios.stubRequest('/api/group/user', {
      status: 200,
      response: { groups: mockGroups }
    });
    const expectedActions = [
      { type: 'GET_USER_GROUPS', groups: mockGroups }
    ];
    const store = mockStore({});
    return store.dispatch(actions.getGroups({}))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('dispatches GET_USER_GROUPS_ERROR when get groups fails', () => {
    moxios.stubRequest('/api/group/user', {
      status: 400,
      response: { groups: mockGroups }
    });
    const expectedActions = [
      { type: 'GET_USER_GROUPS_ERROR', error: true }
    ];
    const store = mockStore({});
    return store.dispatch(actions.getGroups({}))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('dispatches GET_USER_GROUP_MESSAGES when get message is successful',
  () => {
    moxios.stubRequest('/api/group/1/messages', {
      status: 200,
      response: { messages: mockMessages }
    });
    const expectedActions = [
      { type: 'GET_MESSAGES_SUCCESS', gotMessages: false },
      { type: 'GET_MESSAGES_SUCCESS', gotMessages: true },
      { type: 'GET_USER_GROUP_MESSAGES', messages: mockMessages }
    ];
    const store = mockStore({});
    return store.dispatch(actions.getGroupMessages(1))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('dispatches  GET_GROUP_MEMBERS when get group members is successful',
  () => {
    moxios.stubRequest('/api/group/1/users', {
      status: 200,
      response: { members: mockMembers, group: mockGroup }
    });
    const expectedActions = [
      { type: 'GET_GROUP_MEMBERS', members: mockMembers },
      { type: 'CURRENT_GROUP', groupDetails: mockGroup }
    ];
    const store = mockStore({});
    return store.dispatch(actions.getGroupMembers(1))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('dispatches ADD_MEMBER_SUCCESS when add member is successful',
  () => {
    moxios.stubRequest('/api/group/1/user', {
      status: 200,
      response: { user: mockMessages }
    });
    const expectedActions = [
      { type: 'ADD_MEMBER_SUCCESS', memberDetails: mockMessages },
    ];
    const store = mockStore({});
    return store.dispatch(actions.addMember(1, 1))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('dispatches LEAVE_GROUP_SUCCESS and GROUP_LEFT when add member is successful',
  () => {
    moxios.stubRequest('/api/group/1/leave', {
      status: 200,
      response: { groupId: 1 }
    });
    const expectedActions = [
      { type: 'LEAVE_GROUP_SUCCESS', leftGroup: false },
      { type: 'LEAVE_GROUP_SUCCESS', leftGroup: true },
      { type: 'GROUP_LEFT', groupId: 1 }
    ];
    const store = mockStore({});
    return store.dispatch(actions.leaveGroup(1))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
