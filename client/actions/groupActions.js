import axios from 'axios';
import toastr from 'toastr';
import { tokenRedirect } from './userAuthActions';


/**
 * @description unathorisedRedirect function
 *
 * @param {object} response -response object
 *
 * @returns {boolean} -returns a boolean
 */
const unauthorisedRedirect = (response) => {
  if (response.status === 401) {
    location.replace('/error');
  }
  return false;
};

/**
 *
 * @param {object} groups -groups object
 *
 * @returns {object} -return action object
 */
const getUserGroups = groups => (
  {
    type: 'GET_USER_GROUPS',
    groups,
  }
);

/**
 *
 * @param {object} message -message object
 *
 * @returns {object} -return action object
 */
export const postMessage = message => (
  {
    type: 'POST_MESSAGE',
    message,
  }
);

/**
 *
 * @param {object} messages -message object
 *
 * @returns {object} -return action object
 */
export const getUserGroupMessages = messages => (
  {
    type: 'GET_USER_GROUP_MESSAGES',
    messages,
  }
);

/**
 *
 * @param {boolean} payload -payload
 *
 * @returns {object} -return action object
 */
export const getUserGroupsSuccess = payload => (
  {
    type: 'GET_USER_GROUPS_SUCCESS',
    payload,
  }
);

/**
 *
 * @param {object} members -members object
 *
 * @returns {object} -return action object
 */
export const getGroupMembersAction = members => (
  {
    type: 'GET_GROUP_MEMBERS',
    members,
  }
);
/**
 *
 * @param {object} error -error message
 *
 * @returns {object} -return action object
 */
export const getUserGroupsError = error => (
  {
    type: 'GET_USER_GROUPS_ERROR',
    error,
  }
);

/**
 *
 * @param {object} memberDetails -memberAdded boolean input
 *
 * @returns {object} -return action object
 */
export const addMemberSuccess = memberDetails => (
  {
    type: 'ADD_MEMBER_SUCCESS',
    memberDetails,
  }
);

/**
 *
 * @param {object} messageDetails -messageSent boolean input
 *
 * @returns {object} -return action object
 */
export const sendMessageSuccess = messageDetails => (
  {
    type: 'SEND_MESSAGE_SUCCESS',
    messageDetails,
  }
);

/**
 *
 * @param {boolean} leftGroup -leftGroup boolean input
 *
 * @returns {object} -return action object
 */
export const leaveGroupSuccess = leftGroup => (
  {
    type: 'LEAVE_GROUP_SUCCESS',
    leftGroup,
  }
);

/**
 *
 * @param {string} groupError -error message
 *
 * @returns {object} -return action object
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
 * @returns {object} -returns action
 */
export const createNewGroup = groupDetails => (
  {
    type: 'CREATE_NEW_GROUP',
    groupDetails
  }
);

/**
 *
 * @param {object} groupDetails -details of the group
 *
 * @returns {object} -returns action
 */
const currentGroup = groupDetails => (
  {
    type: 'CURRENT_GROUP',
    groupDetails
  }
);
/**
 *
 * @param {number} groupId -id of the group
 *
 * @returns {object} -returns action
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
 * @param {object} groupDetails -information about the group
 * @param {object} history -history object
 *
 * @returns {promise} -returns a promise
 */
export const createGroup = (groupDetails, history) => (
  dispatch => axios.post('/api/group',
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
      } else if (response.data.error.groupDescription) {
        toastr.error(response.data.error.groupDescription);
      } else if (response.data.error.groupName) {
        toastr.error(response.data.error.groupName);
      } else {
        toastr.error(response.data.error);
      }
    })
);

/**
 * @description get groups a user belongs to
 *
 * @returns {promise} -return function
 */
export const getGroups = () => (
  dispatch => (
    axios.get('/api/group/user')
    .then(({ data }) => {
      dispatch(getUserGroups(data.groups));
    })
    .catch(({ response }) => {
      tokenRedirect(response.data.error);
      dispatch(getUserGroupsError(true));
    })
  )
);

/**
 * @description get group messages
 *
 * @param {number} groupId -group Id
 *
 * @returns {promise} -returns a promise
 */
export const getGroupMessages = groupId => (
  dispatch => (
    axios.get(`/api/group/${groupId}/messages`)
    .then((groups) => {
      dispatch(getUserGroupMessages(groups.data.messages));
    })
    .catch(({ response }) => {
      unauthorisedRedirect(response);
      toastr.error(response.data.error);
    })
  )
);

/**
 * @description get group members
 *
 * @param {number} groupId -group Id
 *
 * @returns {promise} -returns a promise
 */
export const getGroupMembers = groupId => (
  dispatch => (
    axios.get(`/api/group/${groupId}/users`)
    .then(({ data }) => {
      dispatch(getGroupMembersAction(data.members));
      dispatch(currentGroup(data.group));
    })
    .catch(({ response }) => {
      unauthorisedRedirect(response);
      toastr.error(response.data.error);
    })
  )
);

/**
 * @description get group messages
 *
 * @param {number} userId -user Id
 * @param {number} groupId -group Id
 *
 * @returns {promise} -returns a promise
 */
export const addMember = (userId, groupId) => (
  dispatch => (
    axios.post(`/api/group/${groupId}/user`, { userId })
    .then(({ data }) => {
      dispatch(addMemberSuccess(data.user));
    })
    .catch(({ response }) => {
      toastr.error(response.data.error);
    })
  )
);

/**
 * @description leave group
 *
 * @param {number} groupId -groupId
 *
 * @returns {promise} -returns a promise
 */
export const leaveGroup = groupId => (
  (dispatch) => {
    dispatch(leaveGroupSuccess(false));
    return axios.delete(`/api/group/${groupId}/leave`)
    .then(({ data }) => {
      dispatch(leaveGroupSuccess(true));
      dispatch(groupLeft(data.groupId));
    })
    .catch(({ response }) => {
      toastr.error(response.data.error);
    });
  }
);

/**
 * @description get group messages
 *
 * @param {number} groupId -group id
 * @param {object} message -message object
 *
 * @returns {promise} -returns a promise
 */
export const sendUserMessage = (groupId, message) => (
  (dispatch) => {
    const URL = `/api/group/${groupId}/message`;
    return axios.post(URL, message)
    .then(({ data }) => {
      dispatch(sendMessageSuccess(data.message));
    })
    .catch(({ response }) => {
      dispatch(sendMessageSuccess(false));
      toastr.error(response.data.error);
    });
  }
);

