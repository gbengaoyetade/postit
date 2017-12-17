import React from 'react';
import MailSent from '../../components/password/MailSent';
import Nav from '../../components/common/Nav';

describe('MailSent', () => {
  const wrapper = shallow(<MailSent />);
  it('should render one Nav component', () => {
    expect(wrapper.find(Nav).length).toBe(1);
  });
});
