
export const getUserGroupMessages = (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER_GROUP_MESSAGES':
      return { ...state, messages: action.messages };
    default:
      return state;
  }
};
export const getGroupMembers = (state = {}, action) => {
  switch (action.type) {
    case 'GET_GROUP_MEMBERS':
      return { ...state, members: action.members };
    default:
      return state;
  }
};
export const addMemberSuccess = (state = false, action) => {
  switch (action.type) {
    case 'ADD_MEMBER_SUCCESS':
      return action.memberAdded;
    default:
      return state;
  }
};
