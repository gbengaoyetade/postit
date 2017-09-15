export const createGroupReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_GROUP':
      const newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    default:
      return state;
  }
};
export const getUserGroupMessages = (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER_GROUP_MESSAGES':
      const newState = Object.assign({}, state);
      newState.messages = action.messages;
      return newState;
    default:
      return state;
  }
};
export const getGroupMembers = (state = {}, action) => {
  switch (action.type) {
    case 'GET_GROUP_MEMBERS':
      const newState = Object.assign({}, state);
      newState.members = action.members;
      return newState;
    default:
      return state;
  }
};
export const getUserGroupSuccess = (state = false, action) => {
  switch (action.type) {
    case 'GET_USER_GROUPS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};
export const getGroupMembersSuccess = (state = false, action) => {
  switch (action.type) {
    case 'GET_GROUP_MEMBERS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};
