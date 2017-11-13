import axios from 'axios';

export const createGroup = group => (
  {
    type: 'CREATE_GROUP',
    group,
  }
);

export const getUserGroups = groups => (
  {
    type: 'GET_USER_GROUPS',
    groups,
  }
);
export const postMessage = message => (
  {
    type: 'POST_MESSAGE',
    message,
  }
);
export const messageSending = bool => (
  {
    type: 'MESSAGE_SENDING',
    bool,
  }
);
export const getUserGroupMessages = messages => (
  {
    type: 'GET_USER_GROUP_MESSAGES',
    messages,
  }
);

export const getUserGroupsSuccess = payload => (
  {
    type: 'GET_USER_GROUPS_SUCCESS',
    payload,
  }
);
export const getGroupMembersAction = members => (
  {
    type: 'GET_GROUP_MEMBERS',
    members,
  }
);
export const getUserGroupsError = payload => (
  {
    type: 'GET_USER_GROUPS_ERROR',
    payload,
  }
);
export const addMemberSuccess = memberAdded => (
  {
    type: 'ADD_MEMBER_SUCCESS',
    memberAdded,
  }
);
export const sendMessageSuccess = bool => (
  {
    type: 'SEND_MESSAGE_SUCCESS',
    bool,
  }
);

export const sendGroupDetails = (groupDetails, history) => {
  return () => {
    axios.post('/api/group',
    groupDetails)
    .then(() => {
      history.push('/dashboard');
    })
    .catch((error) => {
    });
  };
};

export const getGroups = () => (
  (dispatch) => {
    axios.get('/api/group/user')
    .then((groups) => {
      dispatch(getUserGroups(groups.data.groups));
    })
    .catch((error) => {
      dispatch(getUserGroupsError(true));
    });
  }
);
export const getGroupMessages = (groupId, history) => {
  return (dispatch) => {
    axios.get(`/api/group/${groupId}/messages`)
    .then((groups) => {
      dispatch(getUserGroupMessages(groups.data.messages));
    })
    .catch((error) => {
      // if (error.response.data.error) {
      //   history.push('/error');
      // }
    });
  };
};

export const getGroupMembers = (groupId) => {
  return (dispatch) => {
    axios.get(`/api/group/${groupId}/users`)
    .then((members) => {
      dispatch(getGroupMembersAction(members.data));
    })
    .catch((error) => {
    });
  };
};
export const addMember = (userId, groupId) => {
  return (dispatch) => {
    axios.post(`/api/group/${groupId}/user`, { userId })
    .then((response) => {
      // this is used to control automatic member
      // appearance on the groupMembers section of the page
      dispatch(addMemberSuccess(true));
    })
    .catch((error) => {
    });
  };
};
export const leaveGroup = (groupId, history) => {
  return () => {
    axios.delete(`/api/group/${groupId}/user`)
    .then((response) => {
      history.push('/dashboard');
    })
    .catch((error) => {
    });
  };
};

export const sendUserMessage = (groupId, message) => {
  return (dispatch) => {
    const URL = `/api/group/${groupId}/message`;
    axios.post(URL, message)
    .then((response) => {
      console.log(response)
      dispatch(sendMessageSuccess(true));
    })
    .catch((error) => {
      console.log(error.response);
      dispatch(sendMessageSuccess(false));
    });
  };
};

