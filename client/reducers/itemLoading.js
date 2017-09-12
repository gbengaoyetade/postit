export const loginLoading = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN_LOADING':
      return action.isLoading;
    default:
      return state;
  }
};

export const signupLoading = (state = false, action) => {
  switch (action.type) {
    case 'SIGNUP_LOADING':
      return action.isLoading;
    default:
      return state;
  }
};

