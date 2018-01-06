import InitialState from '../reducers/InitialState';

/**
 * @description reducer for items loading in the app
 *
 * @param {object} state -state object
 * @param {object} action -action object
 *
 * @returns {object} returns state object
 */
const itemLoadingReducer = (state = InitialState.item, action) => {
  switch (action.type) {
    case 'LOGIN_LOADING':
      return { ...state, loginLoading: action.isLoading };
    case 'SIGNUP_LOADING':
      return { ...state, signupLoading: action.isLoading };
    case 'EMAIL_SENDING':
      return { ...state, sendingMail: action.sendingMail };
    default:
      return state;
  }
};
export default itemLoadingReducer;

