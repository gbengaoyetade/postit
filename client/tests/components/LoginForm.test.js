import React from 'react';
import LoginForm from '../../components/authentication/LoginForm';

describe('LoginForm component ', () => {
  it('should render correctly', () => {
    const props = {
      handleChange: () => {},
      handleSubmit: () => {},
      loading: false,
    };
    const component = shallow(<LoginForm {...props} />);
    expect(component.length).toBe(1);
    expect(component.getElement().type).toBe('div');
  });
});
