import axios from 'axios';

const sendUserData = (user) => {
  return (dispatch) => {
    axios.post(
    '/api/user/signup', user)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response);
    });
  };
  
};
export default sendUserData;
