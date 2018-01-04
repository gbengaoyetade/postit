import authReducer from '../../reducers/authReducer';
import initialState from '../../reducers/initialState';

describe('authReducer', () => {
  it('should render initial state when action type is unknown', () => {
    const action = {
      type: 'afdsfd',
    };
    const newState = authReducer(initialState.auth, action);
    expect(newState).toEqual(initialState.auth);
    expect(newState.user).toEqual({});
  });
  it('should handle AUTHENTICATE_USER action type', () => {
    const action = {
      type: 'AUTHENTICATE_USER',
      user: {
        username: 'test',
        email: 'test@gmail.com',
        password: 'test password',
        phoneNumber: '09088224456',
        fullName: 'test user'
      }
    };
    const newState = authReducer(initialState.auth, action);
    expect(newState).toEqual({ ...initialState.auth, user: action.user });
  });
  it('should handle SIGNUP_ERROR', () => {
    const action = {
      type: 'SIGNUP_ERROR',
      error: 'error'
    };
    const newState = authReducer(initialState.auth, action);
    expect(newState)
    .toEqual({ ...initialState.auth, signupError: action.error });
  });
  it('should handle LOGIN_ERROR', () => {
    const action = {
      type: 'LOGIN_ERROR',
      error: 'username unavailable'
    };
    const newState = authReducer(initialState.auth, action);
    expect(newState)
    .toEqual({ ...initialState.auth, loginError: action.error });
  });
});
