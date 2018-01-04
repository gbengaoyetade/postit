import passwordReducer from '../../reducers/passwordReducer';
import initialState from '../../reducers/initialState';


describe('passwordReducer', () => {
  it('should render initial state when action type is unknown', () => {
    const action = {
      type: 'adfdf'
    };
    const newstate = passwordReducer(initialState.password, action);
    expect(newstate).toEqual(initialState.password);
  });
  it('should handle EMAIL_ERROR action type', () => {
    const action = {
      type: 'EMAIL_ERROR',
      emailError: 'email error'
    };
    const newstate = passwordReducer(initialState.password, action);
    expect(newstate)
    .toEqual({ ...initialState.password, emailError: action.emailError });
  });
  it('should handle PASSWORD_UPDATED action type', () => {
    const action = {
      type: 'PASSWORD_UPDATED',
      passwordUpdated: true
    };
    const newstate = passwordReducer(initialState.password, action);
    expect(newstate)
    .toEqual({
      ...initialState.password,
      passwordUpdated: action.passwordUpdated });
  });
  it('should handle PASSWORD_UPDATE_ERROR action type', () => {
    const action = {
      type: 'PASSWORD_UPDATE_ERROR',
      error: 'password error'
    };
    const newstate = passwordReducer(initialState.password, action);
    expect(newstate)
    .toEqual({ ...initialState.password, passwordUpdateError: action.error });
  });
});
