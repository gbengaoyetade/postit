import axios from 'axios';

/**
 * @param { string } emailError
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
 * @param { boolean } sendingMail
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
 * @param { string } error
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
 * @param { boolean } passwordUpdated
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
 * @param { string } email
 *
 * @returns { function } -action object
 */
export const recoverPassword = email => (
  (dispatch) => {
    dispatch(passwordResetError(''));
    dispatch(emailSending(true));
    dispatch(userEmailError(''));
    axios.post('/api/user/password/reset',
    email)
    .then(() => {
      location.replace('/email/sent');
    })
    .catch((error) => {
      dispatch(emailSending(false));
      dispatch(userEmailError(error.response.data.error));
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
  (dispatch) => {
    axios.post(`/api/user/password/update?token=${token}`,
    password)
    .then((response) => {
      if (response.data.token) {
        dispatch(updatePasswordSuccess(true));
      }
    })
    .catch((error) => {
      dispatch(passwordResetError(error.response.data.error));
    });
  }
);
