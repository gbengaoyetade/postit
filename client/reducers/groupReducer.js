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
export const getUserGroupSuccess = (state = false, action) => {
  switch (action.type) {
    case 'GET_USER_GROUPS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

