import React from 'react';
import RecoverPasswordPage from '../../components/password/RecoverPasswordPage';
import Nav from '../../components/common/Nav';

describe('RecoverPasswordPage', () => {
  const props = {
    handleChange: () => {},
    handleSubmit: () => {}
  };
  const wrapper = shallow(<RecoverPasswordPage {...props} />);
  it('should render one Nav component', () => {
    expect(wrapper.find(Nav).length).toBe(1);
  });
  it('should render progressbar when sending email', () => {
    const updatedWrapper = shallow(
    <RecoverPasswordPage {...props} sending={true}/>);
    expect(updatedWrapper.find('div.indeterminate').length).toBe(1);
  });
});
