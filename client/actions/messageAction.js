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

export const sendUserMessage = (message, groupId) => {
  return (dispatch) =>{
    const headers = {
      'x-access-token': window.sessionStorage.postitToken,
    };
    const URL = `api/group/${groupId}/message`;
    axios.post(URL, message, { headers })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response);
    });
  };
};
