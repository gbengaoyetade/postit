import axios from 'axios';
import store from '../store';

export const itemLoading = (isLoading) => {
  return {
    type: 'ITEM_LOADING',
    isLoading,
  };
};

export const itemHasErrored = (payload) => {
  return {
    type: 'ITEM_ERROR',
    payload,
  };
};

export const loginError = (error) => {
  return {
    type: 'LOGIN_ERROR',
    error,
  };
};

export const loginUser = (user) => {
  return (dispatch) => {
    axios.post('/api/user/signin',
     user)
    .then((response) => {
      if (response.status === 200) {
        window.sessionStorage.postitToken = response.data.token;
        window.location.replace('/dashboard'); 
      }
    })
    .catch((error) => {
      dispatch(itemLoading(false));
      if (error.response.data.message) {
        dispatch(loginError(error.response.data.message));
      }
      console.log(error.response);
    });
  }  
};