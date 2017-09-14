const createAccount = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      let newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    case 'LOGIN_USER':
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    default:
      return state;
  }
};
export default createAccount;
