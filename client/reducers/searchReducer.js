import InitialState from '../reducers/InitialState';
/**
 * @description reducer for search actions
 *
 * @param {object} state -state object
 * @param {object} action -action object
 *
 * @returns {object} returns state object
 */

const searchReducer = (state = InitialState.search, action) => {
  switch (action.type) {
    case 'USER_SEARCH_SUCCESS':
      return { ...state, searchResult: action.searchResult };
    case 'SEARCH_ERROR':
      return { ...state, searchError: action.error };
    default:
      return state;
  }
};
export default searchReducer;
