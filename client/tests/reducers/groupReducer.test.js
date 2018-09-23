import groupReducer from '../../reducers/groupReducer';
import InitialState from '../../reducers/InitialState';

describe('Group reducer', () => {
  it('should render initial state when action type is unknown', () => {
    const action = {
      type: 'adfdf'
    };
    const newstate = groupReducer(InitialState.group, action);
    expect(newstate).toEqual(InitialState.group);
  });
  it('should handle GET_GROUP_MEMBERS action', () => {
    const action = {
      type: 'GET_GROUP_MEMBERS',
      members: [
        {
          id: 1,
          username: 'michi',
          fullName: 'Amarachi Django',
          email: 'michis@gmail.com',
          phoneNumber: '08088641123',
          groupMembers: {
            userId: 1,
            addedBy: 1,
            groupId: 1,
            createdAt: '2018-01-02T08:09:12.382Z',
            updatedAt: '2018-01-02T08:09:12.382Z'
          }
        }
      ]
    };
    const newstate = groupReducer(InitialState.group, action);
    expect(newstate).toEqual({
      ...InitialState.group,
      members: action.members
    });
  });
  it('should handle ADD_MEMBER_SUCCESS action', () => {
    const action = {
      type: 'ADD_MEMBER_SUCCESS',
      memberDetails: {
        id: 3,
        username: 'etim',
        fullName: 'Etim Essien',
        email: 'essien@gmail.com',
        phoneNumber: '08088641124'
      }
    };
    const newstate = groupReducer(InitialState.group, action);
    expect(newstate).toEqual({
      ...InitialState.group,
      members: [action.memberDetails]
    });
  });
  it('should handle GET_USER_GROUPS action', () => {
    const action = {
      type: 'GET_USER_GROUPS',
      groups: [
        {
          id: 19,
          groupName: 'create group',
          groupDescription: 'new group',
          createdBy: 1,
          messages: []
        }
      ]
    };
    const newstate = groupReducer(InitialState.group, action);
    expect(newstate).toEqual({ ...InitialState.group, groups: action.groups });
  });
  it('should handle LEAVE_GROUP_SUCCESS action', () => {
    const action = {
      type: 'LEAVE_GROUP_SUCCESS',
      leftGroup: true
    };
    const newstate = groupReducer(InitialState.group, action);
    expect(newstate).toEqual({
      ...InitialState.group,
      leftGroup: action.leftGroup
    });
  });
  it('should handle CREATE_GROUP_ERROR action', () => {
    const action = {
      type: 'CREATE_GROUP_ERROR',
      groupError: 'error'
    };
    const newstate = groupReducer(InitialState.group, action);
    expect(newstate).toEqual({
      ...InitialState.group,
      groupError: action.groupError
    });
  });
  it('should handle CURRENT_GROUP action type', () => {
    const action = {
      type: 'CURRENT_GROUP',
      groupDetails: {
        id: 19,
        groupName: 'create group',
        groupDescription: 'new group',
        createdBy: 1
      }
    };
    const newstate = groupReducer(InitialState.group, action);
    expect(newstate).toEqual({
      ...InitialState.group,
      currentGroup: action.groupDetails
    });
  });
  it('should handle CREATE_NEW_GROUP action type', () => {
    const action = {
      type: 'CREATE_NEW_GROUP',
      groupDetails: {
        id: 19,
        groupName: 'create group',
        groupDescription: 'new group',
        createdBy: 1,
        messages: []
      }
    };
    const newstate = groupReducer(InitialState.group, action);
    expect(newstate).toEqual({
      ...InitialState.group,
      groups: [action.groupDetails]
    });
  });
});
