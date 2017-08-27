import axios from 'axios';
import userGroupsReducer from '../reducers/userGroupsReducer';

export const createGroup = (group) => {
  return {
    type: 'CREATE_GROUP',
    group,
  };
};

export const getUserGroups = (groups) => {
  return {
    type: 'GET_USER_GROUPS',
    groups,
  };
};

export const getUserGroupMessages = (messages) => {
  return {
    type: 'GET_USER_GROUP_MESSAGES',
    messages,
  };
};

export const getUserGroupsSuccess = (payload) => {
  return {
    type: 'GET_USER_GROUPS_SUCCESS',
    payload,
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
  };
};

export const getGroups = () => {
  const headers = {
      'x-access-token': window.sessionStorage.postitToken,
    };
  return (dispatch) => {
    axios.get('/api/group', 
      { headers })
    .then((groups) => {
      console.log(groups.data[0]);
      console.log(groups);
      dispatch(getUserGroups(groups.data[0].groups));
      dispatch(getUserGroupsSuccess(true)); 
    })
    .catch((error) => {
      console.log(error);
    });
  };
};
export const getGroupMessages = () => {
  const headers = {
      'x-access-token': window.sessionStorage.postitToken,
    };
  return (dispatch) => {
    axios.get('/api/group', 
      { headers })
    .then((groups) => {
      console.log(groups.data[0]);
      console.log(groups);
      dispatch(getUserGroups(groups.data[0].groups));
      dispatch(getUserGroupsSuccess(true)); 
    })
    .catch((error) => {
      console.log(error);
    });
  };
};