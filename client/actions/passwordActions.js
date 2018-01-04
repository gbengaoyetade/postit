import axios from 'axios';

/**
 * @param { string } emailError -emailError string
 *
 * @returns { object } -action object
 */
export const userEmailError = emailError => (
  {
    type: 'EMAIL_ERROR',
    emailError,
  }
);

/**
 * @param { boolean } sendingMail -sendingMail boolean
 *
 * @returns { object } -action object
 */
export const emailSending = sendingMail => (
  {
    type: 'EMAIL_SENDING',
    sendingMail,
  }
);

/**
 * @param { string } error -password update error
 *
 * @returns { object } -action object
 */
export const passwordResetError = error => (
  {
    type: 'PASSWORD_UPDATE_ERROR',
    error,
  }
);

/**
 * @param { boolean } passwordUpdated -passwordUpdated boolean
 *
 * @returns { object } -action object
 */
export const updatePasswordSuccess = passwordUpdated => (
  {
    type: 'PASSWORD_UPDATED',
    passwordUpdated
  }
);

/**
 * @description recover user password
 *
 * @param { string } email -user email
 *
 * @returns { function } -action object
 */
export const recoverPassword = email => (
  (dispatch) => {
    dispatch(passwordResetError(''));
    dispatch(emailSending(true));
    dispatch(userEmailError(''));
    return axios.post('/api/user/password/reset',
    email)
    .then(() => {
      location.replace('/email/sent');
    })
    .catch(({ response }) => {
      dispatch(emailSending(false));
      dispatch(userEmailError(response.data.error));
    });
  }
);

/**
 * @description recover user password
 *
 * @param { string } password -user password
 * @param { string } token -user token
 *
 * @returns { function } -action object
 */
export const updatePassword = (password, token) => (
  dispatch =>
    axios.post(`/api/user/password/update?token=${token}`,
    password)
    .then(({ data }) => {
      if (data.token) {
        dispatch(updatePasswordSuccess(true));
      }
    })
    .catch((error) => {
      dispatch(passwordResetError(error.response.data.error));
    })
);
