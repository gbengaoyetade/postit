const recoverPassword = (state = {}, action) => {
  switch (action.type) {
    case 'USER_EMAIL':
      return { ...state, email: action.email };
    case 'PASSWORD_UPDATED':
      return { ...state, passwordUpdated: action.passwordUpdated };
    case 'PASSWORD_UPDATE_ERROR':
      return { ...state, passwordUpdateError: action.error };
    default:
      return state;
  }
};
export default recoverPassword;
