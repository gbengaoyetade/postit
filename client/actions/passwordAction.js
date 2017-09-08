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
    const headers = {
      'x-access-token': window.sessionStorage.postitToken,
    };
    axios.post('api/user/password_reset',
    email, { headers })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      dispatch(passwordResetError(error.response.data.error));
      console.log(error.response);
    });
  }
);
