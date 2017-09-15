const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_SEARCH_SUCCESS':
      const newState = Object.assign({}, state);
      newState.searchResult = action.searchResult;
      return newState;
    default:
      return state;
  }
};
export default searchReducer;
