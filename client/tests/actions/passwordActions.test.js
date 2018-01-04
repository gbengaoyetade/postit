import moxios from 'moxios';
import 'mock-local-storage';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../../actions/passwordActions';

const mockStore = configureMockStore([
  thunk
]);
describe('Password Actions ', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('dispatches PASSWORD_UPDATED when update is successful', () => {
    moxios.stubRequest('/api/user/password/update?token=token', {
      status: 200,
      response: { token: 'token' }
    });
    const expectedActions = [
      { type: 'PASSWORD_UPDATED', passwordUpdated: true }
    ];
    const store = mockStore({});
    return store.dispatch(actions.updatePassword('password', 'token'))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('dispatches PASSWORD_UPDATE_ERROR when search is unsuccessful', () => {
    moxios.stubRequest('/api/user/password/update?token=token', {
      status: 400,
      response: { error: 'error' }
    });
    const expectedActions = [
      { type: 'PASSWORD_UPDATE_ERROR', error: 'error' }
    ];
    const store = mockStore({});
    return store.dispatch(actions.updatePassword('password', 'token'))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('dispatches PASSWORD_UPDATE_ERROR when recover password is successful',
  () => {
    moxios.stubRequest('/api/user/password/reset', {
      status: 200,
      response: {}
    });
    const expectedActions = [
      { type: 'PASSWORD_UPDATE_ERROR', error: '' },
      { type: 'EMAIL_SENDING', sendingMail: true },
      { type: 'EMAIL_ERROR', emailError: '' }
    ];
    const store = mockStore({});
    return store.dispatch(actions.recoverPassword('email'))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('dispatches EMAIL_ERROR when search is unsuccessful', () => {
    moxios.stubRequest('/api/user/password/reset', {
      status: 400,
      response: { error: 'error' }
    });
    const expectedActions = [
      { type: 'PASSWORD_UPDATE_ERROR', error: '' },
      { type: 'EMAIL_SENDING', sendingMail: true },
      { type: 'EMAIL_ERROR', emailError: '' },
      { type: 'EMAIL_SENDING', sendingMail: false },
      { type: 'EMAIL_ERROR', emailError: 'error' },

    ];
    const store = mockStore({});
    return store.dispatch(actions.recoverPassword('email'))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
