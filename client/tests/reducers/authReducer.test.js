import authReducer from '../../reducers/authReducer';
import InitialState from '../../reducers/InitialState';

describe('authReducer', () => {
  it('should render initial state when action type is unknown', () => {
    const action = {
      type: 'afdsfd',
    };
    const newState = authReducer(InitialState.auth, action);
    expect(newState).toEqual(InitialState.auth);
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
    const newState = authReducer(InitialState.auth, action);
    expect(newState).toEqual({ ...InitialState.auth, user: action.user });
  });
  it('should handle SIGNUP_ERROR', () => {
    const action = {
      type: 'SIGNUP_ERROR',
      error: 'error'
    };
    const newState = authReducer(InitialState.auth, action);
    expect(newState)
    .toEqual({ ...InitialState.auth, signupError: action.error });
  });
  it('should handle LOGIN_ERROR', () => {
    const action = {
      type: 'LOGIN_ERROR',
      error: 'username unavailable'
    };
    const newState = authReducer(InitialState.auth, action);
    expect(newState)
    .toEqual({ ...InitialState.auth, loginError: action.error });
  });
});
