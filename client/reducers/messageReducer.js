export const postMessageReducer =
(state = { messagePriority: 'Normal' }, action) => {
  switch (action.type) {
    case 'POST_MESSAGE':
      return { ...state, message: action.message };
    default:
      return state;
  }
};
export const messageSendingReducer = (state = false, action) => {
  switch (action.type) {
    case 'MESSAGE_SENDING':
      return action.type;
    default:
      return state;
  }
};
export const sendMessageSuccess = (state = false, action) => {
  switch (action.type) {
    case 'SEND_MESSAGE_SUCCESS':
      return action.bool;
    default:
      return state;
  }
};
