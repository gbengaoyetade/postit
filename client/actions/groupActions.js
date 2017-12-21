import axios from 'axios';


/**
 * -unathorisedRedirect function
 * @param {any} response -response object
 * @returns {bool} -returns a boolean
 */
const unauthorisedRedirect = (response) => {
  if (response.status === 401) {
    location.replace('/error');
  }
  return false;
};
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
export const getUserGroupsError = error => (
  {
    type: 'GET_USER_GROUPS_ERROR',
    error,
  }
);
export const addMemberSuccess = memberAdded => (
  {
    type: 'ADD_MEMBER_SUCCESS',
    memberAdded,
  }
);
export const sendMessageSuccess = messageSent => (
  {
    type: 'SEND_MESSAGE_SUCCESS',
    messageSent,
  }
);
export const leaveGroupSuccess = leftGroup => (
  {
    type: 'LEAVE_GROUP_SUCCESS',
    leftGroup,
  }
);
export const createGroupError = groupError => (
  {
    type: 'CREATE_GROUP_ERROR',
    groupError,
  }
);
export const createGroup = (groupDetails, history) => (
  (dispatch) => {
    axios.post('/api/group',
    groupDetails)
    .then(({ data }) => {
      // redirect user to the group he created
      history.push(`/group/${data.groupId}`);
    })
    .catch((error) => {
      if (
        error.response.data.error.groupName
        || error.response.data.error.groupDescription) {
        dispatch(createGroupError('Maximum character exceeded'));
      } else if (error.response.status === 409) {
        dispatch(createGroupError('Group already exist'));
      }
    });
  }
);

export const getGroups = () => (
  (dispatch) => {
    axios.get('/api/group/user')
    .then((groups) => {
      dispatch(getUserGroups(groups.data.groups));
    })
    .catch(() => {
      dispatch(getUserGroupsError(true));
    });
  }
);

export const getGroupMessages = groupId => (
  (dispatch) => {
    axios.get(`/api/group/${groupId}/messages`)
    .then((groups) => {
      dispatch(getUserGroupMessages(groups.data.messages));
    })
    .catch((error) => {
      unauthorisedRedirect(error.response);
    });
  }
);

export const getGroupMembers = groupId => (
  (dispatch) => {
    axios.get(`/api/group/${groupId}/users`)
    .then((members) => {
      dispatch(getGroupMembersAction(members.data));
    })
    .catch(() => {
    });
  }
);
export const addMember = (userId, groupId) => (
  (dispatch) => {
    axios.post(`/api/group/${groupId}/user`, { userId })
    .then(() => {
      // this is used to control automatic member
      // appearance on the groupMembers section of the page
      dispatch(addMemberSuccess(true));
    })
    .catch(() => {
    });
  }
);
export const leaveGroup = groupId => (
  (dispatch) => {
    dispatch(leaveGroupSuccess(false));
    axios.delete(`/api/group/${groupId}/leave`)
    .then(() => {
      dispatch(leaveGroupSuccess(true));
    })
    .catch(() => {
    });
  }
);

export const sendUserMessage = (groupId, message) => (
  (dispatch) => {
    const URL = `/api/group/${groupId}/message`;
    axios.post(URL, message)
    .then(() => {
      dispatch(sendMessageSuccess(true));
    })
    .catch(() => {
      dispatch(sendMessageSuccess(false));
    });
  }
);

