/**
 * @description reducer for auth actions
 *
 * @param { object } state
 * @param { object } action
 *
 * @returns { object } returs state
 */
const authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'AUTHENTICATE_USER':
      return { ...state, user: action.user };
    case 'SIGNUP_ERROR':
      return { ...state, signupError: action.error };
    case 'LOGIN_ERROR':
      return { ...state, loginError: action.error };
    default:
      return state;
  }
};
export default authReducer;

