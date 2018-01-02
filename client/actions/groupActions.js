import axios from 'axios';
import { tokenRedirect } from './userAuthActions';


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
 * @param { object } memberDetails -memberAdded boolean input
 *
 * @returns { object } -return action object
 */
export const addMemberSuccess = memberDetails => (
  {
    type: 'ADD_MEMBER_SUCCESS',
    memberDetails,
  }
);

/**
 *
 * @param { object } messageDetails -messageSent boolean input
 *
 * @returns { object } -return action object
 */
export const sendMessageSuccess = messageDetails => (
  {
    type: 'SEND_MESSAGE_SUCCESS',
    messageDetails,
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
 *
 * @param { array } groupDetails -group details array
 *
 * @returns { object } -returns action
 */
export const createNewGroup = groupDetails => (
  {
    type: 'CREATE_NEW_GROUP',
    groupDetails
  }
);

/**
 *
 * @param { number } groupId -id of the group
 *
 * @returns { object } -returns action
 */
export const groupLeft = groupId => (
  {
    type: 'GROUP_LEFT',
    groupId,
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
  dispatch => (
   axios.post('/api/group',
    groupDetails)
    .then(({ data }) => {
      // redirect user to the group he created
      dispatch(createNewGroup(data.group));
      history.push(`/group/${data.group.groupId}`);
    })
    .catch(({ response }) => {
      tokenRedirect(response.data.error);
      if (response.status === 409) {
        dispatch(createGroupError('Group already exist'));
      }
    })
  )
);

/**
 * @description get groups a user belongs to
 *
 * @returns { function } -return function
 */
export const getGroups = () => (
  (dispatch) => {
    axios.get('/api/group/user')
    .then(({ data }) => {
      dispatch(getUserGroups(data.groups));
    })
    .catch(({ response }) => {
      tokenRedirect(response.data.error);
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
    .then(({ data }) => {
      dispatch(getGroupMembersAction(data.members));
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
    .then(({ data }) => {
      dispatch(addMemberSuccess(data.user));
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
    .then(({ data }) => {
      dispatch(leaveGroupSuccess(true));
      dispatch(groupLeft(data.groupId));
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
    .then(({ data }) => {
      dispatch(sendMessageSuccess(data.message));
    })
    .catch(() => {
      dispatch(sendMessageSuccess(false));
    });
  }
);

