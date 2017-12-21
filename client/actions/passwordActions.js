import axios from 'axios';

export const userEmailError = emailError => (
  {
    type: 'EMAIL_ERROR',
    emailError,
  }
);
export const emailSending = sendingMail => (
  {
    type: 'EMAIL_SENDING',
    sendingMail,
  }
);
export const passwordResetError = error => (
  {
    type: 'PASSWORD_UPDATE_ERROR',
    error,
  }
);
export const updatePasswordSuccess = passwordUpdated => (
  {
    type: 'PASSWORD_UPDATED',
    passwordUpdated
  }
);
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
