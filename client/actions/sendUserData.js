import axios from 'axios';
import loginUser from './login';

const sendUserData = (user) => {
  return (dispatch) => {
    const myUser = user;
    axios.post(
    '/api/user/signup', user)
    .then((response) => {
      if (response.status === 201) {
        console.log(response);
        console.log(myUser);
      }
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response);
    });
  };
  
};
export default sendUserData;
