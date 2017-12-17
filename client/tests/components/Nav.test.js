import React from 'react';
import 'mock-local-storage';
import Nav from '../../components/common/Nav';

describe('Nav component', () => {
  it('should contain one nav tag', () => {
    const NavWrapper = shallow(<Nav />);
    expect(NavWrapper.find('nav').length).toBe(1);
  });
});
