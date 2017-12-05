import React from 'react';
import 'mock-local-storage';

import SignupForm from '../../components/authentication/SignupForm';

describe('SignupForm component ', () => {
  it('should render correctly', () => {
    const props = {
      errors: {},
      handleChange: () => {},
      handleSubmit: () => {}
    };
    expect(shallow(
    <SignupForm {...props} />)).toMatchSnapshot();
  });
  it('should accept isLoading props', () => {
    const props = {
      errors: {},
      handleChange: () => {},
      handleSubmit: () => {},
      isLoading: true
    };
    const wrapper = mount(<SignupForm {...props} />);
    console.log(wrapper.prop('isLoading'), '------------------');
    expect(wrapper.prop('isLoading')).toEqual(true);
  });
});
