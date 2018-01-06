import messageReducer from '../../reducers/messageReducer';
import InitialState from '../../reducers/InitialState';

describe('messageReducer', () => {
  it('should render initial state when action type is unknown', () => {
    const action = {
      type: 'adfdf'
    };
    const newstate = messageReducer(InitialState.message, action);
    expect(newstate).toEqual(InitialState.message);
  });
  it('should handle SEND_MESSAGE_SUCCESS action type', () => {
    const action = {
      type: 'SEND_MESSAGE_SUCCESS',
      messageDetails: {
        id: 25,
        messageBody: 'hello world ',
        messagePriority: 'Normal',
        groupId: 18,
        userId: 1,
        createdAt: '2018-01-03T07:48:12.987Z',
      }
    };
    const newstate = messageReducer(InitialState.message, action);
    expect(newstate)
    .toEqual({ ...InitialState.message, messages: [action.messageDetails] });
  });
  it('should handle GET_USER_GROUP_MESSAGES action type', () => {
    const action = {
      type: 'GET_USER_GROUP_MESSAGES',
      messages: [{
        id: 25,
        messageBody: 'hello world ',
        messagePriority: 'Normal',
        groupId: 18,
        userId: 1,
        createdAt: '2018-01-03T07:48:12.987Z',
      }]
    };
    const newstate = messageReducer(InitialState.message, action);
    expect(newstate)
    .toEqual({ ...InitialState.message, messages: action.messages });
  });
});
