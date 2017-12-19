import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'mock-local-storage';
import SignupWithStore, { Signup } from '../../components/authentication/Signup';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Signup component', () => {
  const store = mockStore({
    user: {},
    authReducer: {},
    itemLoadingReducer: {},
  });
  const props = {
    history: {},
    setLoading: () => {},
    signupUser: () => {}
  };
  const mockEvent = {
    preventDefault: () => {}
  };
  const SignupWrapper = shallow(<Signup {...props}/>);
  const SignupWithStoreWrapper = shallow(
  <SignupWithStore store={store} {...props}/>);
  it('should render correctly', () => {
    expect(SignupWrapper).toMatchSnapshot();
  });
  it('should render correctly when store is passed to it', () => {
    expect(SignupWithStoreWrapper).toMatchSnapshot();
  });
  it('should have signupUser function defined', () => {
    const spy = jest
    .spyOn(SignupWithStoreWrapper.dive().instance(), 'handleSubmit');
    expect(spy).toBeDefined();
  });
  it('should handle change method', () => {
    const mockChange = {
      target: {
        name: 'name',
        value: 'value'
      }
    };
    const handleChangeSpy = jest
    .spyOn(SignupWrapper.instance(), 'handleChange');
    SignupWrapper.instance().handleChange(mockChange);
    expect(handleChangeSpy).toBeDefined();
  });
  it('should not submit when form contains errors', () => {
    SignupWrapper.setState({
      username: 'name',
      email: 'username@gmail.com',
      password: 'pa',
      fullName: 'name',
      phoneNumber: '048',
    });
    SignupWrapper.instance().handleSubmit(mockEvent);
    expect(SignupWrapper.state().errors).toBeTruthy();
    expect(SignupWrapper.state().errors.password)
    .toBe('Password cannot be less than 6 characters');
  });
  it('should signup user if details are valid', () => {
    SignupWrapper.setState({
      username: 'name',
      email: 'username@gmail.com',
      password: 'password1',
      fullName: 'name',
      phoneNumber: '08025615561',
    });
    SignupWrapper.instance().handleSubmit(mockEvent);
    expect(SignupWrapper.state().errors).toEqual({});
  });
});
