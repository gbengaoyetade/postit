export default (state = false, action) => {
  switch (action.type) {
    case 'SEND_MESSAGE_SUCCESS':
      return action.messageSent;
    default:
      return state;
  }
};
