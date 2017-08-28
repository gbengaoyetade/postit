export const postMessageReducer = (state = {}, action) => {
  switch(action.type){
    case 'POST_MESSAGE':
      const newState = Object.assign({}, state);
      newState.message = action.message;
      return newState;
    default:
      return state;
  }
};
export const messageSendingReducer = (state = false, action) => {
  switch(action.type){
    case 'MESSAGE_SENDING':
      return action.type;
    default:
      return state;
  }
};
