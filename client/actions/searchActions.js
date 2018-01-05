import axios from 'axios';

axios.defaults.headers.common['x-access-token'] =
localStorage.getItem('postitToken');

/**
 * @param {object} searchResult -result from the search
 *
 * @returns {object} -returns action
 */
export const searchResultSuccess = searchResult => (
  {
    type: 'USER_SEARCH_SUCCESS',
    searchResult,
  }
);

/**
 * @param {string} error -error message
 *
 * @returns {object} -returns action
 */
const searchError = error => (
  {
    type: 'SEARCH_ERROR',
    error,
  }
);
/**
 * @description search user
 *
 * @param {object} userInput - userInput object
 * @param {number} offset -offset integer
 *
 * @returns {promise} -returns a promise
 */
export const searchUser = (userInput, offset) => (
  (dispatch) => {
    const headers = {
      'x-access-token': localStorage.postitToken,
    };
    return axios.get(
      `/api/user/search?query=${userInput}&offset=${offset}&limit=${5}`,
    { headers })
    .then(({ data }) => {
      dispatch(searchResultSuccess(
        {
          users: data.users,
          count: data.count,
          pageCount: data.pageCount,
        }
      ));
    })
    .catch(({ response }) => {
      dispatch(searchError(response.data.error));
    });
  }
);
