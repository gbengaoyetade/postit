export const createGroupReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_GROUP':
      return [...state, action.user];
    default:
      return state;
  }
};
export const getUserGroupMessages = (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER_GROUP_MESSAGES':
      return [...state, action.messages];
    default:
      return state;
  }
};
export const getGroupMembers = (state = {}, action) => {
  switch (action.type) {
    case 'GET_GROUP_MEMBERS':
      return [...state, action.members];
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
