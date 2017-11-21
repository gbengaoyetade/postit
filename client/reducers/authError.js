const authError = (state = {}, action) => {
  switch (action.type) {
    case 'SIGNUP_ERROR':
      return { ...state, signupError: action.error };
    case 'LOGIN_ERROR':
      return { ...state, loginError: action.error };
    default:
      return state;
  }
};
export default authError;

