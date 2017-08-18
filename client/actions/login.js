import axios from 'axios';
// import { withRouter } from 'react-router-dom';

const loginUser = (user) => {
  return () => {
    axios.post('/api/user/signin',
     user)
    .then((response) => {
      if (response.status === 200){
        window.sessionStorage.postitToken = response.data.token;
        window.location.replace('/dashboard');
        console.log(window.sessionStorage); 
      }
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response);
    });
  }  
};

export default loginUser;
