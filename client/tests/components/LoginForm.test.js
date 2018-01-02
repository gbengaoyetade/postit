import React from 'react';
import LoginForm from '../../components/authentication/LoginForm';
import Nav from '../../components/common/Nav';
import SubmitButton from '../../components/common/SubmitButton';

describe('LoginForm component ', () => {
  it('should render correctly', () => {
    const props = {
      handleChange: () => {},
      handleSubmit: () => {},
      loading: false,
    };
    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find(Nav).length).toBe(1);
  });
  it('should render differently when loading props is true', () => {
    const props = {
      handleChange: () => {},
      handleSubmit: () => {},
      loading: true,
    };
    const wrapper = shallow(<LoginForm {...props} />);
  });
});
