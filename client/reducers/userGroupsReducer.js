const userGroupReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER_GROUPS':
      return { ...state, groups: action.groups };
    case 'LEAVE_GROUP_SUCCESS':
      return { ...state, leftGroup: action.leftGroup };
    default:
      return state;
  }
};
export default userGroupReducer;
