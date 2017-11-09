const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_SEARCH_SUCCESS':
      return { ...state, searchResult: action.searchResult };
    default:
      return state;
  }
};
export default searchReducer;
