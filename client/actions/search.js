import axios from 'axios';

export const searchResultSuccess = searchResult => (
  {
    type: 'USER_SEARCH_SUCCESS',
    searchResult,
  }
);

export const searchUser = (userInput, groupId) => (
  (dispatch) => {
    const headers = {
      'x-access-token': window.sessionStorage.postitToken,
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
