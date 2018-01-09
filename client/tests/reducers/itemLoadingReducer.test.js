import itemLoadingReducer from '../../reducers/itemLoadingReducer';
import InitialState from '../../reducers/InitialState';

describe('itemLoadingReducer', () => {
  it('should render initial state when action type is unknown', () => {
    const action = {
      type: 'adfdf'
    };
    const newstate = itemLoadingReducer(InitialState.item, action);
    expect(newstate).toEqual(InitialState.item);
  });
  it('should handle LOGIN_LOADING action type', () => {
    const action = {
      type: 'LOGIN_LOADING',
      isLoading: true
    };
    const newstate = itemLoadingReducer(InitialState.item, action);
    expect(newstate)
    .toEqual({ ...InitialState.item, loginLoading: action.isLoading });
  });
  it('should handle SIGNUP_LOADING action type', () => {
    const action = {
      type: 'SIGNUP_LOADING',
      isLoading: true
    };
    const newstate = itemLoadingReducer(InitialState.item, action);
    expect(newstate)
    .toEqual({ ...InitialState.item, signupLoading: action.isLoading });
  });
  it('should handle EMAIL_SENDING action type', () => {
    const action = {
      type: 'EMAIL_SENDING',
      sendingMail: true
    };
    const newstate = itemLoadingReducer(InitialState.item, action);
    expect(newstate)
    .toEqual({ ...InitialState.item, sendingMail: action.sendingMail });
  });
});
