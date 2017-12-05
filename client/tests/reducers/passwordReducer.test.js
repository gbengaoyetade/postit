import passwordReducer from '../../reducers/passwordReducer';

describe('passwordReducer', () => {
  const initialState = {
    passwordUpdated: false
  };
  it('should return an inital state', () => {
    expect(passwordReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle EMAIL_ERROR', () => {
    const action = {
      type: 'EMAIL_ERROR',
      emailError: ''
    };
    expect(passwordReducer(initialState, action))
    .toEqual({ ...initialState, emailError: '' });
  });
  it('should handle PASSWORD_UPDATED', () => {
    const action = {
      type: 'PASSWORD_UPDATED',
      passwordUpdated: true
    };
    expect(passwordReducer(initialState, action))
    .toEqual({ ...initialState, passwordUpdated: true });
  });
  it('should handle PASSWORD_UPDATE_ERROR', () => {
    const action = {
      type: 'PASSWORD_UPDATE_ERROR',
      error: true,
    };
    expect(passwordReducer(initialState, action))
    .toEqual({ ...initialState, passwordUpdateError: true });
  });
});
