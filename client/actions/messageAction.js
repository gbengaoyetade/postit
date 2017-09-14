import axios from 'axios';

export const postMessage = (message) => {
  return {
    type: 'POST_MESSAGE',
    message,
  };
};

export const messageSending = (bool) => {
  return {
    type: 'MESSAGE_SENDING',
    bool,
  };
};

export const sendUserMessage = (groupId, message) => {
  return (dispatch) => {

    const headers = {
      'x-access-token': window.sessionStorage.postitToken,
    };
    console.log(message);
    const URL = `/api/group/${groupId}/message`;
    axios.post(URL, message, { headers })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response);
    });
  };
};
