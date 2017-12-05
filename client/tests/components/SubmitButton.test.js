import React from 'react';
import SubmitButton from '../../components/common/SubmitButton';

describe('SubmitButton', () => {
  const props = {
    submitValue: 'submit',
    disabled: ''
  };
  const SubmitButtonWrapper = shallow(<SubmitButton {...props}/>);
  it('should render correctly', () => {
    expect(SubmitButtonWrapper).toMatchSnapshot();
  });
});
