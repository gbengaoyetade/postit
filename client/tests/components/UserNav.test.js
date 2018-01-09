import React from 'react';
import 'mock-local-storage';
import UserNav from '../../components/common/UserNav';

describe('UserNav component', () => {
  const UserNavWrapper = shallow(<UserNav />);
  it('should contain one nav tag', () => {
    expect(UserNavWrapper.find('nav').length).toBe(1);
  });
  it('should call the logout function when logout button is clicked', () => {
    const spy = jest.spyOn(location, 'replace');
    UserNavWrapper.find('#logout').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
