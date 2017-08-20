const loginError = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return action.error;
    default:
      return state;
  }
};
export default loginError;
