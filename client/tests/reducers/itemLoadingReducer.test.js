import itemLoadingReducer from '../../reducers/itemLoadingReducer';

describe('itemLoadingReducer', () => {
  const initialState = {
    loginLoading: false,
    signupLoading: false,
    sendingMail: false,
  };
  it('should render initial state', () => {
    expect(itemLoadingReducer(undefined, {}))
    .toEqual(initialState);
  });
  it('should handle LOGIN_LOADING', () => {
    const action = {
      type: 'LOGIN_LOADING',
      isLoading: true
    };
    expect(itemLoadingReducer(initialState, action))
    .toEqual({ ...initialState, loginLoading: true });
  });
  it('should handle SIGNUP_LOADING', () => {
    const action = {
      type: 'SIGNUP_LOADING',
      isLoading: true
    };
    expect(itemLoadingReducer(initialState, action))
    .toEqual({ ...initialState, signupLoading: true });
  });
  it('should handle EMAIL_SENDING', () => {
    const action = {
      type: 'EMAIL_SENDING',
      sendingMail: true
    };
    expect(itemLoadingReducer(initialState, action))
    .toEqual({ ...initialState, sendingMail: true });
  });
});
