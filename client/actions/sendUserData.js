import axios from 'axios';
import { signupError, signupLoading } from './auth';

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
      dispatch(signupError(error.response.data.error || null));
      dispatch(signupLoading(false));
      console.log(error.response);
    });
  };
  
};
export default sendUserData;
