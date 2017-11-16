import axios from 'axios';

axios.defaults.headers.common['x-access-token'] =
localStorage.getItem('postitToken');

export const searchResultSuccess = searchResult => (
  {
    type: 'USER_SEARCH_SUCCESS',
    searchResult,
  }
);

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
    .catch((error) => {
    });
  }
);
