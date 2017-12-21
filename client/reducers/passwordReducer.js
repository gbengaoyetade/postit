const passwordReducer = (state =
{ passwordUpdated: false,
  emailError: ''
}, action) => {
  switch (action.type) {
    case 'EMAIL_ERROR':
      return { ...state, emailError: action.emailError };
    case 'PASSWORD_UPDATED':
      return { ...state, passwordUpdated: action.passwordUpdated };
    case 'PASSWORD_UPDATE_ERROR':
      return { ...state, passwordUpdateError: action.error };
    default:
      return state;
  }
};
export default passwordReducer;
