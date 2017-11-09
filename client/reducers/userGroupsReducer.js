const userGroupReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USER_GROUPS':
      return { state, groups: action.groups };
    default:
      return state;
  }
};
export default userGroupReducer;
