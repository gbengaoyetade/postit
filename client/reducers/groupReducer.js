
const groupReducer = (state = { leftGroup: false, memberAdded: false }, action) => {
  switch (action.type) {
    case 'GET_GROUP_MEMBERS':
      return { ...state, members: action.members };
    case 'ADD_MEMBER_SUCCESS':
      return { ...state, memberAdded: action.memberAdded };
    case 'GET_USER_GROUPS':
      return { ...state, groups: action.groups };
    case 'LEAVE_GROUP_SUCCESS':
      return { ...state, leftGroup: action.leftGroup };
    default:
      return state;
  }
};
export default groupReducer;

