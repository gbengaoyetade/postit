import { getUserGroups } from '../actions/groupActions';

describe('getUserGroups actions', () => {
  const initialState = {
    group: undefined,
    type: 'GET_USER_GROUPS',
  };
  it('should return intial state', () => {
    expect(getUserGroups()).toEqual(initialState);
  });
});
