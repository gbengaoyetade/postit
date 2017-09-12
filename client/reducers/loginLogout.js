const loginLogout = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      const newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    default:
      return state;
  }
};
export default loginLogout;
