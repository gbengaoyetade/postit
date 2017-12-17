import groupReducer from '../../reducers/groupReducer';

describe('Group reducer', () => {
  const initialState = {
    leftGroup: false,
    memberAdded: false
  };
  it('should return initial state', () => {
    expect(groupReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle GET_GROUP_MEMBERS action', () => {
    const action = {
      type: 'GET_GROUP_MEMBERS',
      members: ['names']
    };
    expect(groupReducer(undefined, action))
    .toEqual({ ...initialState, members: ['names'] });
  });
  it('should handle ADD_MEMBER_SUCCESS action', () => {
    const action = {
      type: 'ADD_MEMBER_SUCCESS',
      memberAdded: true
    };
    expect(groupReducer(undefined, action))
    .toEqual({ ...initialState, memberAdded: true });
  });
  it('should handle GET_USER_GROUPS action', () => {
    const action = {
      type: 'GET_USER_GROUPS',
      groups: []
    };
    expect(groupReducer(undefined, action))
    .toEqual({ ...initialState, groups: [] });
  });
  it('should handle LEAVE_GROUP_SUCCESS action', () => {
    const action = {
      type: 'LEAVE_GROUP_SUCCESS',
      leftGroup: true
    };
    expect(groupReducer(undefined, action))
    .toEqual({ ...initialState, leftGroup: true });
  });
  it('should handle CREATE_GROUP_ERROR action', () => {
    const action = {
      type: 'CREATE_GROUP_ERROR',
      groupError: 'error'
    };
    expect(groupReducer(undefined, action))
    .toEqual({ ...initialState, groupError: 'error' });
  });
});
