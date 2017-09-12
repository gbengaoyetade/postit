const userGroupReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USER_GROUPS':
      const newState = Object.assign({}, state);
      newState.groups = action.groups;
      return newState;
    default:
      return state;
  }
};
export default userGroupReducer;
