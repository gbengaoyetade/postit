import axios from 'axios';

axios.defaults.headers.common['x-access-token'] =
window.localStorage.getItem('postitToken');

/**
 * @param { object } searchResult
 *
 * @returns { object } -return an object
 */
export const searchResultSuccess = searchResult => (
  {
    type: 'USER_SEARCH_SUCCESS',
    searchResult,
  }
);
/**
 * @description search user
 *
 * @param { object } userInput
 * @param { number } offset
 *
 * @returns { function } returns a function
 */
export const searchUser = (userInput, offset) => (
  (dispatch) => {
    const headers = {
      'x-access-token': localStorage.postitToken,
    };
    axios.get(
      `/api/user/search?query=${userInput}&offset=${offset}&limit=${3}`,
    { headers })
    .then((response) => {
      dispatch(searchResultSuccess(
        {
          users: response.data.users,
          count: response.data.count,
          pageCount: response.data.pageCount,
        }
      ));
    })
    .catch(() => {
    });
  }
);
