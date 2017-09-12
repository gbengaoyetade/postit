export const signupError = (state = [], action) => {
  switch (action.type) {
    case 'SIGNUP_ERROR':
      return action.error;
    default:
      return state;
  }
};

export const loginError = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return action.error;
    default:
      return state;
  }
};

