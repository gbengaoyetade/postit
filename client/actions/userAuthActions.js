import axios from 'axios';

export const loginLoading = isLoading => (
  {
    type: 'LOGIN_LOADING',
    isLoading,
  }
);
export const userLoginSuccess = user => (
  {
    type: 'AUTHENTICATE_USER',
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
const storeUserDetails = (response) => {
  localStorage.setItem('postitToken', response.data.user.token);
  localStorage.setItem('postitUser', JSON.stringify(response.data.user));
  axios.defaults.headers.common['x-access-token'] =
  localStorage.getItem('postitToken');
  console.log(localStorage.getItem('postitToken'));
};
export const loginUser = (user, history) => (
  (dispatch) => {
    axios.post('/api/user/signin',
     user)
    .then((response) => {
      if (response.status === 200) {
        dispatch(userLoginSuccess(response.data));
        dispatch(loginLoading(false));
        storeUserDetails(response);
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
        storeUserDetails(response);
        history.push('/dashboard');
      }
    })
    .catch((error) => {
      dispatch(signupError(error.response.data.error));
      dispatch(signupLoading(false));
    });
  }
);
