import * as actions from '../../actions/groupActions';

describe('Group Actions', () => {
  it('should have an action that get groups', () => {
    const groups = [''];
    const expectedResult = {
      type: 'GET_USER_GROUPS',
      groups,
    };
    expect(actions.getUserGroups(groups)).toEqual(expectedResult);
  });
  it('should have a post message action', () => {
    const message = [''];
    const expectedResult = {
      type: 'POST_MESSAGE',
      message,
    };
    expect(actions.postMessage(message)).toEqual(expectedResult);
  });
  it('should have an action that checks if message was sent successfully',
  () => {
    const messageSent = [''];
    const expectedResult = {
      type: 'SEND_MESSAGE_SUCCESS',
      messageSent,
    };
    expect(actions.sendMessageSuccess(messageSent)).toEqual(expectedResult);
  });
  it('should have an action that gets user group messages', () => {
    const messages = [''];
    const expectedResult = {
      type: 'GET_USER_GROUP_MESSAGES',
      messages,
    };
    expect(actions.getUserGroupMessages(messages)).toEqual(expectedResult);
  });
  it('should have an action that get groups', () => {
    const payload = true;
    const expectedResult = {
      type: 'GET_USER_GROUPS_SUCCESS',
      payload,
    };
    expect(actions.getUserGroupsSuccess(payload)).toEqual(expectedResult);
  });
  it('should have an action that get group members', () => {
    const members = [''];
    const expectedResult = {
      type: 'GET_GROUP_MEMBERS',
      members,
    };
    expect(actions.getGroupMembersAction(members)).toEqual(expectedResult);
  });
  it('should have an action sets getting groups error', () => {
    const error = [''];
    const expectedResult = {
      type: 'GET_USER_GROUPS_ERROR',
      error,
    };
    expect(actions.getUserGroupsError(error)).toEqual(expectedResult);
  });
  it('should have an action that show group member was added', () => {
    const memberAdded = '';
    const expectedResult = {
      type: 'ADD_MEMBER_SUCCESS',
      memberAdded,
    };
    expect(actions.addMemberSuccess(memberAdded)).toEqual(expectedResult);
  });
  it('should have an action sets create group error', () => {
    const groupError = '';
    const expectedResult = {
      type: 'CREATE_GROUP_ERROR',
      groupError,
    };
    expect(actions.createGroupError(groupError)).toEqual(expectedResult);
  });
  it('should have an action shows group has been left', () => {
    const leftGroup = '';
    const expectedResult = {
      type: 'LEAVE_GROUP_SUCCESS',
      leftGroup,
    };
    expect(actions.leaveGroupSuccess(leftGroup)).toEqual(expectedResult);
  });
});
