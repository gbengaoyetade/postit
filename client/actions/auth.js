import axios from 'axios';

export const loginLoading = isLoading => (
  {
    type: 'LOGIN_LOADING',
    isLoading,
  }
);

export const signupLoading = isLoading => (
  {
    type: 'SIGNUP_LOADING',
    isLoading,
  }
);

export const loginHasErrored = payload => (
  {
    type: 'LOGIN_ERROR',
    payload,
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
export const loginUser = user => (
  (dispatch) => {
    axios.post('/api/user/signin',
     user)
    .then((response) => {
      if (response.status === 200) {
        window.sessionStorage.postitToken = response.data.token;
        window.location.replace('/dashboard');
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
