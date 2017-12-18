/**
 * @description reducer for password actions
 *
 * @param { object } state
 * @param { object } action
 *
 * @returns { object } returns state object
 */
const passwordReducer = (state = { passwordUpdated: false }, action) => {
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
