import axios from 'axios';

export const createGroup = (group) => {
  return {
    type: 'CREATE_GROUP',
    group,
  };
};

export const sendGroupDetails = (groupDetails) => {
  return () => {
    const headers = {
      'x-access-token': window.sessionStorage.postitToken,
    };
    axios.post('/api/group',
    groupDetails,
    { headers })
    .then((group) => {
      console.log(group);
    })
    .catch((error) => {
      console.log(error.response);
    });
  }
  
};
