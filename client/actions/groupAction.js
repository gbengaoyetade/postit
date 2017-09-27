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
export const addMemberSuccess = bool => (
  {
    type: 'ADD_MEMBER_SUCCESS',
    bool,
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
      dispatch(getUserGroups(groups.data.groups));
    })
    .catch((error) => {
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
      dispatch(getUserGroupMessages(groups.data.messages));
    })
    .catch((error) => {
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
      dispatch(getGroupMembersAction(members.data));
    })
    .catch((error) => {
    });
  };
};
export const addMember = (userId, groupId) => {
  const headers = {
    'x-access-token': window.sessionStorage.postitToken,
  };
  return (dispatch) => {
    axios.post(`/api/group/${groupId}/user`, { userId }, { headers })
    .then((response) => {
      // this is used to control automatic member appearance on the groupMembers section of the page
      dispatch(addMemberSuccess(true));
    })
    .catch((error) => {
    });
  };
};
export const leaveGroup = (groupId, history) => {
  const headers = {
    'x-access-token': window.sessionStorage.postitToken,
  };
  return () => {
    axios.delete(`/api/group/${groupId}/user`, { headers })
    .then((response) => {
      history.push('/dashboard');
    })
    .catch((error) => {
    });
  };
};

export const sendUserMessage = (groupId, message) => {
  return (dispatch) => {
    const headers = {
      'x-access-token': window.sessionStorage.postitToken,
    };
    const URL = `/api/group/${groupId}/message`;
    axios.post(URL, message, { headers })
    .then((response) => {
      dispatch(sendMessageSuccess(true));
    })
    .catch((error) => {
      dispatch(sendMessageSuccess(false));
    });
  };
};

