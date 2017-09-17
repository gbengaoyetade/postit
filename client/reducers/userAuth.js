const userAuth = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case 'CREATE_USER':
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    case 'USER_LOGIN_SUCCESS':
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    default:
      return state;
  }
};
export default userAuth;
