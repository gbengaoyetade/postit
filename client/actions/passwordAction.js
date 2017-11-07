import axios from 'axios';

export const userEmail = email => (
  {
    type: 'USER_EMAIL',
    email,
  }
);
export const emailSending = bool => (
  {
    type: 'EMAIL_SENDING',
    bool,
  }
);
export const passwordResetError = error => (
  {
    type: 'PASSWORD_ERROR',
    error,
  }
);
export const recoverPassword = email => (
  (dispatch) => {
    dispatch(passwordResetError(''));
    dispatch(emailSending(true));
    axios.post('api/user/password_reset',
    email)
    .then(() => {
      window.location.replace('/email_sent');
    })
    .catch((error) => {
      dispatch(emailSending(false));
      dispatch(passwordResetError(error.response.data.error));
    });
  }
);

export const updatePassword = (password, token) => (
  (dispatch) => {
    const headers = {
      'x-access-token': localStorage.postitToken,
    };
    axios.post(`api/user/password_update?token=${token}`,
    password, { headers })
    .then((response) => {
      localStorage.postitToken = response.data.token;
      window.location.replace('/dashboard');
    })
    .catch((error) => {
      dispatch(passwordResetError(error.response.data.error));
    });
  }
);
