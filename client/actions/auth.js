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
        window.sessionStorage.postitToken = response.data.token;
        history.push('/dashboard');
      }
    })
    .catch((error) => {
      dispatch(loginLoading(false));
      let errorMessage;
      if (error.response.data.message || error.response.data.name) {
        if (error.response.data.name === 'SequelizeHostNotFoundError') {
          errorMessage = 'Internet connection error';
        } else if (error.response.data.name === 'TimeoutError') {
          errorMessage = 'Request timed out';
        }
        dispatch(
          loginError(error.response.data.message || errorMessage || error.response.data.name));
      }
      console.log(error.response);
    });
  }
);
export const signupUser = (user, history) => {
  return (dispatch) => {
    axios.post(
    '/api/user/signup', user)
    .then((response) => {
      if (response.status === 201) {
        dispatch(userLoginSuccess(user));
        window.sessionStorage.postitToken = response.data.user.token;
        history.push('/dashboard');
        console.log(response);
      }
      console.log(response);
    })
    .catch((error) => {
      dispatch(signupError(error.response.data.error || null));
      dispatch(signupLoading(false));
      console.log(error.response);
    });
  };
};
