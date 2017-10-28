import axios from 'axios';

axios.defaults.headers.common['x-access-token'] =
localStorage.getItem('postitToken');

export const searchResultSuccess = searchResult => (
  {
    type: 'USER_SEARCH_SUCCESS',
    searchResult,
  }
);

export const searchUser = (userInput, groupId) => (
  (dispatch) => {
    const headers = {
      'x-access-token': localStorage.postitToken,
    };
    axios.get(`/api/user/${groupId}/search?query=${userInput}`,
    { headers })
    .then((response) => {
      dispatch(searchResultSuccess({ users: response.data }));
    })
    .catch((error) => {
    });
  }
);
