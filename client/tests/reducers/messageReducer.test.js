import messageReducer from '../../reducers/messageReducer';

describe('messageReducer', () => {
  const initialState = {};
  it('should render initial state', () => {
    expect(messageReducer(undefined, {}))
    .toEqual(initialState);
  });
  it('should handle GET_USER_GROUP_MESSAGES', () => {
    const action = {
      type: 'GET_USER_GROUP_MESSAGES',
      messages: ''
    };
    expect(messageReducer({}, action))
    .toEqual({ ...initialState, messages: '' });
  });
  it('should handle SEND_MESSAGE_SUCCESS', () => {
    const action = {
      type: 'SEND_MESSAGE_SUCCESS',
      messageSent: true
    };
    expect(messageReducer({}, action))
    .toEqual({ ...initialState, messageSent: true });
  });
});
