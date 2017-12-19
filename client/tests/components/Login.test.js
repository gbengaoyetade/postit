import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'mock-local-storage';
import Login from '../../components/authentication/Login';
import LoginForm from '../../components/authentication/LoginForm';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  authReducer: {},
  itemLoadingReducer: {},
});
describe('Login component', () => {
  const props = {
    user: {},
    setLoading: () => {},
    setLoginError: () => {},
    history: {},
    loginUser: () => {},
  };
  const wrapper = shallow(<Login {...props} store={store}/>);
  it('should render one LoginForm component', () => {
    expect(wrapper.dive().find(LoginForm).length).toBe(1);
  });
  it('should have a handleChange method', () => {
    const mockEvent = {
      target: {
        name: 'name',
        value: 'value'
      }
    };
    const handleChangeSpy = jest
    .spyOn(wrapper.dive().instance(), 'handleChange');
    wrapper.dive().instance().handleChange(mockEvent);
    expect(handleChangeSpy).toBeDefined();
  });
  it('should have a handleSubmit method', () => {
    const mockEvent = {
      preventDefault: () => {},
    };
    const handleSubmitSpy = jest
    .spyOn(wrapper.dive().instance(), 'handleSubmit');
    wrapper.dive().instance().handleSubmit(mockEvent);
    expect(handleSubmitSpy).toBeDefined();
  });
});

