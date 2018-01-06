import searchReducer from '../../reducers/searchReducer';
import InitialState from '../../reducers/InitialState';

describe('searchReducer', () => {
  it('should render initial state when action type is unknown', () => {
    const action = {
      type: 'adfdf'
    };
    const newstate = searchReducer(InitialState.search, action);
    expect(newstate).toEqual(InitialState.search);
  });
  it('should handle USER_SEARCH_SUCCESS', () => {
    const action = {
      type: 'USER_SEARCH_SUCCESS',
      searchResult: {
        users: [
          {
            id: 3,
            username: 'etim',
            fullName: 'Etim Essien',
            email: 'essien@gmail.com',
            phoneNumber: '08088641124',
          }
        ],
        count: 6,
        pageCount: 1,
      }
    };
    const newstate = searchReducer(InitialState.search, action);
    expect(newstate).toEqual({
      ...InitialState.search,
      searchResult: action.searchResult });
  });
  it('should handle SEARCH_ERROR', () => {
    const action = {
      type: 'SEARCH_ERROR',
      error: 'search error'
    };
    const newstate = searchReducer(InitialState.search, action);
    expect(newstate).toEqual({ ...InitialState.search,
      searchError: action.error });
  });
});
