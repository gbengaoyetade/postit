import React from 'react';
import 'mock-local-storage';
import { StaticRouter } from 'react-router-dom';

import SignupForm from '../../components/authentication/SignupForm';
import SubmitButton from '../../components/common/SubmitButton';

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
  it('should render differently when props loading is true', () => {
    const props = {
      errors: {},
      handleChange: () => {},
      handleSubmit: () => {},
      loading: true
    };
    const wrapper = mount(
      <StaticRouter>
        <SignupForm {...props} />
      </StaticRouter>
    );
    expect(wrapper.find('input[type="submit"]').props().disabled)
    .toEqual('disabled');
    expect(wrapper.find('input[type="submit"]').props().value)
    .toEqual('Signing up...');
  });
});
