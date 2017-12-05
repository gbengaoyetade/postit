import authReducer from '../../reducers/authReducer';

describe('authReducer', () => {
  const initialState = {};
  it('should render initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle AUTHENTICATE_USER', () => {
    const action = {
      type: 'AUTHENTICATE_USER',
      user: ''
    };
    expect(authReducer({}, action)).toEqual({ ...initialState, user: '' });
  });
  it('should handle SIGNUP_ERROR', () => {
    const action = {
      type: 'SIGNUP_ERROR',
      error: 'error'
    };
    expect(authReducer({}, action))
    .toEqual({ ...initialState, signupError: 'error' });
  });
  it('should handle LOGIN_ERROR', () => {
    const action = {
      type: 'LOGIN_ERROR',
      error: ''
    };
    expect(authReducer({}, action))
    .toEqual({ ...initialState, loginError: '' });
  });
});
