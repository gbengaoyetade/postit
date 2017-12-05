import searchReducer from '../../reducers/searchReducer';

describe('searchReducer', () => {
  const initialState = {};
  it('should render initial state', () => {
    expect(searchReducer(undefined, {}))
    .toEqual(initialState);
  });
  it('should handle USER_SEARCH_SUCCESS', () => {
    const action = {
      type: 'USER_SEARCH_SUCCESS',
      searchResult: ['']
    };
    expect(searchReducer({}, action))
    .toEqual({ ...initialState, searchResult: [''] });
  });
});
