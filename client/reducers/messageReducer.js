import InitialState from '../reducers/InitialState';

/**
 * @description reducer for message actions
 *
 * @param {object} state -state object
 * @param {object} action -action object
 *
 * @returns {object} returns state object
 */
const messageReducer = (state = InitialState.message, action) => {
  switch (action.type) {
    case 'GET_USER_GROUP_MESSAGES':
      return { ...state, messages: action.messages };
    case 'GET_MESSAGES_SUCCESS':
      return { ...state, gotMessages: action.gotMessages };
    case 'SEND_MESSAGE_SUCCESS':
      return { ...state, messages: [...state.messages, action.messageDetails] };
    default:
      return state;
  }
};
export default messageReducer;

