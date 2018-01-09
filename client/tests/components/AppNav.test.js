import React from 'react';
import AppNav from '../../components/common/AppNav';
import UserGroups from '../../components/group/UserGroups';

describe('AppNav component ', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<AppNav/>);
    expect(wrapper.find(UserGroups).length).toBe(1);
    expect(wrapper.find('ul').length).toBe(1);
  });
});
