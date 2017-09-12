const recoverPassword = (state = {}, action) => {
  switch (action.type) {
    case 'USER_EMAIL':
      const newState = Object.assign({}, state);
      newState.email = action.email;
      return newState;
    default:
      return state;
  }
};
export default recoverPassword;
