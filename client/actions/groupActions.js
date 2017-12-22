import axios from 'axios';


/**
 * @description unathorisedRedirect function
 *
 * @param { object } response -response object
 *
 * @returns { boolean } -returns a boolean
 */
const unauthorisedRedirect = (response) => {
  if (response.status === 401) {
    location.replace('/error');
  }
  return false;
};

/**
 *
 * @param { object } groups -groups object
 *
 * @returns { object } -return action object
 */
const getUserGroups = groups => (
  {
    type: 'GET_USER_GROUPS',
    groups,
  }
);

/**
 *
 * @param { object } message -message object
 *
 * @returns { object } -return action object
 */
export const postMessage = message => (
  {
    type: 'POST_MESSAGE',
    message,
  }
);

/**
 *
 * @param { object } messages -message object
 *
 * @returns { object } -return action object
 */
export const getUserGroupMessages = messages => (
  {
    type: 'GET_USER_GROUP_MESSAGES',
    messages,
  }
);

/**
 *
 * @param { boolean } payload -payload
 *
 * @returns { object } -return action object
 */
export const getUserGroupsSuccess = payload => (
  {
    type: 'GET_USER_GROUPS_SUCCESS',
    payload,
  }
);

/**
 *
 * @param { object } members -members object
 *
 * @returns { object } -return action object
 */
export const getGroupMembersAction = members => (
  {
    type: 'GET_GROUP_MEMBERS',
    members,
  }
);
/**
 *
 * @param { object } error -error message
 *
 * @returns { object } -return action object
 */
export const getUserGroupsError = error => (
  {
    type: 'GET_USER_GROUPS_ERROR',
    error,
  }
);

/**
 *
 * @param { boolean } memberAdded -memberAdded boolean input
 *
 * @returns { object } -return action object
 */
export const addMemberSuccess = memberAdded => (
  {
    type: 'ADD_MEMBER_SUCCESS',
    memberAdded,
  }
);

/**
 *
 * @param { boolean } messageSent -messageSent boolean input
 *
 * @returns { object } -return action object
 */
export const sendMessageSuccess = messageSent => (
  {
    type: 'SEND_MESSAGE_SUCCESS',
    messageSent,
  }
);

/**
 *
 * @param { boolean } leftGroup -leftGroup boolean input
 *
 * @returns { object } -return action object
 */
export const leaveGroupSuccess = leftGroup => (
  {
    type: 'LEAVE_GROUP_SUCCESS',
    leftGroup,
  }
);

/**
 *
 * @param { string } groupError - error message
 *
 * @returns { object } -return action object
 */
export const createGroupError = groupError => (
  {
    type: 'CREATE_GROUP_ERROR',
    groupError,
  }
);


/**
 * @description create group action
 *
 * @param { object } groupDetails -information about the group
 * @param { object } history -history object
 *
 * @returns { function } -returns a function
 */
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

/**
 * @description get groups a user belongs to
 *
 * @returns { function } -return function
 */
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

/**
 * @description get group messages
 *
 * @param { number } groupId -group Id
 *
 * @returns { function } -returns a function
 */
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

/**
 * @description get group members
 *
 * @param { number } groupId -group Id
 *
 * @returns { function } -returns a function
 */
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

/**
 * @description get group messages
 *
 * @param { number } userId -user Id
 * @param { number } groupId -group Id
 *
 * @returns { function } -returns a function
 */
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

/**
 * @description leave group
 *
 * @param { number } groupId -groupId
 *
 * @returns { function } -returns a function
 */
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

/**
 * @description get group messages
 *
 * @param { number } groupId -group id
 * @param { object } message -message object
 *
 * @returns { function } -returns a function
 */
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

