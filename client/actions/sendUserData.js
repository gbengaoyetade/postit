import axios from 'axios';

const sendUserData = (user) => {
  return (dispatch) => {
    axios.post(
    '/api/user/signup', user)
    .then((response) => {
      if (response.status === 201) {
        window.sessionStorage.postitToken = response.data.user.token;
        window.location.replace('/dashboard');
        console.log(response);
      }
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response);
    });
  };
  
};
export default sendUserData;
