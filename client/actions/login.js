import axios from 'axios';

const loginUser = (user) => {
  return () => {
    axios.post('/api/user/singin',
     user)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response);
    });
  }  
};

export default loginUser;
