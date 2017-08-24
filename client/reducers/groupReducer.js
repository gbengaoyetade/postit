const createGroupReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_GROUP':
      const newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    default:
      return state;
  }
};
export default createGroupReducer;
