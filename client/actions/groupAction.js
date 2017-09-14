import axios from 'axios';

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
export const getGroupMembersSuccess = (payload) => {
  return {
    type: 'GET_GROUP_MEMBERS_SUCCESS',
    payload,
  };
};
export const getGroupMembersAction = (members) => {
  return {
    type: 'GET_GROUP_MEMBERS',
    members,
  };
};
export const getUserGroupsError = (payload) => {
  return {
    type: 'GET_USER_GROUPS_ERROR',
    payload,
  };
};

export const sendGroupDetails = (groupDetails, history) => {
  return () => {
    const headers = {
      'x-access-token': window.sessionStorage.postitToken,
    };
    axios.post('/api/group',
    groupDetails,
    { headers })
    .then(() => {
      history.push('/dashboard');
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
    axios.get('/api/group/user',
      { headers })
    .then((groups) => {
      console.log(groups.data[0]);
      console.log(groups);
      dispatch(getUserGroups(groups.data.groups));
    })
    .catch((error) => {
      console.log(error);
      dispatch(getUserGroupsError(true));
    });
  };
};
export const getGroupMessages = (groupId) => {
  const headers = {
    'x-access-token': window.sessionStorage.postitToken,
  };
  return (dispatch) => {
    axios.get(`/api/group/${groupId}/messages`,
      { headers })
    .then((groups) => {
      console.log(groups.data);
      dispatch(getUserGroupMessages(groups.data));
      dispatch(getUserGroupsSuccess(true));
    })
    .catch((error) => {
      console.log(error);
    });
  };
};
export const getGroupMembers = (groupId) => {
  const headers = {
    'x-access-token': window.sessionStorage.postitToken,
  };
  return (dispatch) => {
    axios.get(`/api/group/${groupId}/users`,
      { headers })
    .then((members) => {
      console.log(members.data);
      dispatch(getGroupMembersAction(members.data));
      dispatch(getGroupMembersSuccess(true));
    })
    .catch((error) => {
      console.log(error);
    });
  };
};
export const leaveGroup = (groupId) => {
  const headers = {
    'x-access-token': window.sessionStorage.postitToken,
  };
  return () => {
    axios.delete(`/api/group/${groupId}/user`, { headers })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response);
    });
  }
}
