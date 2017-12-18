import axios from 'axios';


/**
 *
 * @param { bool } isLoading
 *
 * @returns { object } -returns object
 */
export const loginLoading = isLoading => (
  {
    type: 'LOGIN_LOADING',
    isLoading,
  }
);

/**
 *
 * @param { object } user
 *
 * @returns { object } -returns object
 */
export const userAuthSuccess = user => (
  {
    type: 'AUTHENTICATE_USER',
    user,
  }
);

/**
 *
 * @param { bool } isLoading
 *
 * @returns { object } -returns object
 */
export const signupLoading = isLoading => (
  {
    type: 'SIGNUP_LOADING',
    isLoading,
  }
);

/**
 *
 * @param { object }  error
 *
 * @returns { object } -returns object
 */
export const loginError = error => (
  {
    type: 'LOGIN_ERROR',
    error,
  }
);

/**
 *
 * @param { string } error
 *
 * @returns { object } -returns object
 */
export const signupError = error => (
  {
    type: 'SIGNUP_ERROR',
    error,
  }
);

/**
 * @description stores user details
 *
 * @param { object } response -response object
 *
 * @returns { void } returns undefined
 */
const storeUserDetails = (response) => {
  localStorage.setItem('postitToken', response.data.user.token);
  localStorage.setItem('postitUser', JSON.stringify(response.data.user));
  axios.defaults.headers.common['x-access-token'] =
  localStorage.getItem('postitToken');
};

/**
 * @description login user
 *
 * @param { object } user
 * @param { object } history
 *
 * @returns { function } returns a function
 */
export const loginUser = (user, history) => (
  (dispatch) => {
    axios.post('/api/user/signin',
     user)
    .then((response) => {
      if (response.status === 200) {
        dispatch(userAuthSuccess(response.data));
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

/**
 * @description signs up user
 *
 * @param { object } user
 * @param { object } history
 *
 * @returns { function } returns a function
 */
export const signupUser = (user, history) => (
  (dispatch) => {
    axios.post(
    '/api/user/signup', user)
    .then((response) => {
      if (response.status === 201) {
        dispatch(userAuthSuccess(user));
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
