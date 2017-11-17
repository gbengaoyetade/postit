import axios from 'axios';

export const userEmail = email => (
  {
    type: 'USER_EMAIL',
    email,
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
    type: 'PASSWORD_ERROR',
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
    axios.post('/api/user/password/reset',
    email)
    .then(() => {
      location.replace('/email/sent');
    })
    .catch((error) => {
      dispatch(emailSending(false));
      dispatch(passwordResetError(error.response.data.error));
    });
  }
);

export const updatePassword = (password, token) => (
  (dispatch) => {
    console.log(token);
    axios.post(`/api/user/password/update?token=${token}`,
    password)
    .then((response) => {
      if (response.data.token) {
        location.replace('/login');
      }
    })
    .catch((error) => {
      dispatch(passwordResetError(error.response.data.error));
    });
  }
);
