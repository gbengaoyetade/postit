const createAccount = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      const newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    default:
      return state;
  }
};
export default createAccount;
