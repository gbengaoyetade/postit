import React from 'react';
import 'mock-local-storage';
import Nav from '../../components/common/Nav';

describe('Nav component', () => {
  it('should render correctly', () => {
    const NavWrapper = shallow(<Nav />);
    expect(NavWrapper).toMatchSnapshot();
  });
});
