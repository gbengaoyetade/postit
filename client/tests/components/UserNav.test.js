import React from 'react';
import 'mock-local-storage';
import UserNav from '../../components/common/UserNav';

describe('UserNav component', () => {
  it('should contain one nav tag', () => {
    const UserNavWrapper = shallow(<UserNav />);
    expect(UserNavWrapper.find('nav').length).toBe(1);
  });
});
