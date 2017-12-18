/**
 * @description reducer for search actions
 *
 * @param { object } state
 * @param { object } action
 *
 * @returns { object } returns state object
 */
const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_SEARCH_SUCCESS':
      return { ...state, searchResult: action.searchResult };
    default:
      return state;
  }
};
export default searchReducer;
