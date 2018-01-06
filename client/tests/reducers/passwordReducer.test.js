import passwordReducer from '../../reducers/passwordReducer';
import InitialState from '../../reducers/InitialState';


describe('passwordReducer', () => {
  it('should render initial state when action type is unknown', () => {
    const action = {
      type: 'adfdf'
    };
    const newstate = passwordReducer(InitialState.password, action);
    expect(newstate).toEqual(InitialState.password);
  });
  it('should handle EMAIL_ERROR action type', () => {
    const action = {
      type: 'EMAIL_ERROR',
      emailError: 'email error'
    };
    const newstate = passwordReducer(InitialState.password, action);
    expect(newstate)
    .toEqual({ ...InitialState.password, emailError: action.emailError });
  });
  it('should handle PASSWORD_UPDATED action type', () => {
    const action = {
      type: 'PASSWORD_UPDATED',
      passwordUpdated: true
    };
    const newstate = passwordReducer(InitialState.password, action);
    expect(newstate)
    .toEqual({
      ...InitialState.password,
      passwordUpdated: action.passwordUpdated });
  });
  it('should handle PASSWORD_UPDATE_ERROR action type', () => {
    const action = {
      type: 'PASSWORD_UPDATE_ERROR',
      error: 'password error'
    };
    const newstate = passwordReducer(InitialState.password, action);
    expect(newstate)
    .toEqual({ ...InitialState.password, passwordUpdateError: action.error });
  });
});
