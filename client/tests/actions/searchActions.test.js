import moxios from 'moxios';
import 'mock-local-storage';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../actions/searchActions';

const mockStore = configureMockStore([
  thunk
]);
const mockSearch = {
  users: [
    {
      id: 1,
      username: 'michi',
      fullName: 'Agbo amarachi',
      email: 'amarachi@gmail.com',
      phoneNumber: '08064140695'
    }
  ],
  count: 1,
  pageCount: 0
};
describe('Search Actions ', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('dispatches USER_SEARCH_SUCCESS when search is successful', () => {
    moxios.stubRequest('/api/user/search?query=ade&offset=0&limit=5', {
      status: 200,
      response: mockSearch
    });
    const expectedActions = [
      { type: 'USER_SEARCH_SUCCESS', searchResult: mockSearch }
    ];
    const store = mockStore({});
    return store.dispatch(actions.searchUser('ade', 0))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('dispatches SEARCH_ERROR when search is unsuccessful', () => {
    moxios.stubRequest('/api/user/search?query=ade&offset=0&limit=5', {
      status: 400,
      response: { error: 'error' }
    });
    const expectedActions = [
      { type: 'SEARCH_ERROR', error: 'error' }
    ];
    const store = mockStore({});
    return store.dispatch(actions.searchUser('ade', 0))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
