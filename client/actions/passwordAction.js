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
    .then((response) => {
      window.location.replace('/email_sent');
      console.log(response);
    })
    .catch((error) => {
      dispatch(emailSending(false));
      dispatch(passwordResetError(error.response.data.error));
      console.log(error.response);
    });
  }
);

export const updatePassword = (password, token) => (
  (dispatch) => {
    const headers = {
      'x-access-token': window.sessionStorage.postitToken,
    };
    console.log(token);
    axios.post(`api/user/password_update?token=${token}`,
    password, { headers })
    .then((response) => {
      console.log(response.data.token);
      window.sessionStorage.postitToken = response.data.token;
      window.location.replace('/dashboard');
    })
    .catch((error) => {
      dispatch(passwordResetError(error.response.data.error || ''));
      console.log(error.response);
    });
  }
);
