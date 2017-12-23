/**
 * @description reducer for search actions
 *
 * @param { object } state -state object
 * @param { object } action -action object
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
