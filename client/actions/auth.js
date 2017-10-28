import axios from 'axios';

export const loginLoading = isLoading => (
  {
    type: 'LOGIN_LOADING',
    isLoading,
  }
);
export const userLoginSuccess = user => (
  {
    type: 'USER_LOGIN_SUCCESS',
    user,
  }
);

export const signupLoading = isLoading => (
  {
    type: 'SIGNUP_LOADING',
    isLoading,
  }
);
export const signupHasErrored = payload => (
  {
    type: 'SIGNUP_ERROR',
    payload,
  }
);
export const loginError = error => (
  {
    type: 'LOGIN_ERROR',
    error,
  }
);

export const signupError = error => (
  {
    type: 'SIGNUP_ERROR',
    error,
  }
);
export const loginUser = (user, history) => (
  (dispatch) => {
    axios.post('/api/user/signin',
     user)
    .then((response) => {
      if (response.status === 200) {
        dispatch(userLoginSuccess(response.data));
        dispatch(loginLoading(false));
        localStorage.setItem('postitToken', response.data.token);
        localStorage.setItem('postitUser', response.data.user);
        history.push('/dashboard');
      }
    })
    .catch((error) => {
      dispatch(loginLoading(false));
      dispatch(loginError(error.response.data.error));
    });
  }
);
export const signupUser = (user, history) => (
  (dispatch) => {
    axios.post(
    '/api/user/signup', user)
    .then((response) => {
      if (response.status === 201) {
        dispatch(userLoginSuccess(user));
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('postitToken', response.data.user.token);
        history.push('/dashboard');
      }
    })
    .catch((error) => {
      dispatch(signupError(error.response.data.error || null));
      dispatch(signupLoading(false));
    });
  }
);
