const recoverPassword = (state = {}, action) => {
  switch (action.type) {
    case 'USER_EMAIL':
      return { ...state, email: action.email };
    case 'PASSWORD_UPDATED':
      return action.passwordUpdated;
    default:
      return state;
  }
};
export default recoverPassword;
