import moxios from 'moxios';
import 'mock-local-storage';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../actions/userAuthActions';

const mockStore = configureMockStore([
  thunk
]);
const mockHistory = {
  push: () => {}
};
const mockUser = {
  id: 1,
  username: 'michi',
  fullName: 'Agbo amarachi',
  email: 'amarachi@gmail.com',
  phoneNumber: '08064140695',
  token: 'token'
};
describe('User Auth Actions ', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('dispatches AUTHENTICATE_USER when login is successful', () => {
    moxios.stubRequest('/api/user/signin', {
      status: 201,
      response: { user: mockUser }
    });
    const expectedActions = [
      { type: 'AUTHENTICATE_USER', user: { user: mockUser } },
      { type: 'LOGIN_LOADING', isLoading: false }
    ];
    const store = mockStore({});
    return store.dispatch(actions.loginUser({}, mockHistory))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('dispatches LOGIN_ERROR when login is unsuccessful', () => {
    moxios.stubRequest('/api/user/signin', {
      status: 400,
      response: { error: 'error' }
    });
    const expectedActions = [
      { type: 'LOGIN_LOADING', isLoading: false },
      { type: 'LOGIN_ERROR', error: 'error' },
    ];
    const store = mockStore({});
    return store.dispatch(actions.loginUser({}, mockHistory))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('dispatches AUTHENTICATE_USER when signup is successful', () => {
    moxios.stubRequest('/api/user/signup', {
      status: 201,
      response: { user: mockUser }
    });
    const expectedActions = [
      { type: 'AUTHENTICATE_USER', user: { user: mockUser } },
    ];
    const store = mockStore({});
    return store.dispatch(actions.signupUser({ user: mockUser }, mockHistory))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('dispatches SIGNUP_ERROR when signup is successful', () => {
    moxios.stubRequest('/api/user/signup', {
      status: 400,
      response: { error: 'error' }
    });
    const expectedActions = [
      { type: 'SIGNUP_LOADING', isLoading: false },
      { type: 'SIGNUP_ERROR', error: 'error' },
    ];
    const store = mockStore({});
    return store.dispatch(actions.signupUser({ user: mockUser }, mockHistory))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
