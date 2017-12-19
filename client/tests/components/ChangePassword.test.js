import React from 'react';
import thunk from 'redux-thunk';
import 'mock-local-storage';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { ChangePassword } from '../../components/password/ChangePassword';
import Nav from '../../components/common/Nav';

const mockStore = configureStore([thunk]);

describe('ChangePassword component', () => {
  const props = {
    location: {},
    updatePassword: () => {},
    error: {},
    updatePasswordSuccess: false,
    history: {}
  };
  const mockEvent = { target: {
    name: 'name',
    value: 'value'
  }
  };
  const store = mockStore({ passwordReducer: {} });
  const wrapper = shallow(<ChangePassword {...props} store={store} />);
  it('should render one Nav component', () => {
    expect(wrapper.find(Nav).length).toBe(1);
  });
  it('should have a handleChange method', () => {
    const handleChangeSpy = jest
    .spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().handleChange(mockEvent);
    expect(handleChangeSpy).toBeDefined();
  });
  it('should have a handle submit method', () => {
    const event = {
      preventDefault: () => {}
    };
    const handleSubmitSpy = jest
    .spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toBeDefined();
  });
  it('should validate input', () => {
    wrapper.setState({ password: 'passdffss' });
    wrapper.setState({ confirmPassword: 'passdddd' });
    wrapper.instance().validateForm();
    expect(wrapper.state().error).toEqual('Passwords did not match');
  });
});

