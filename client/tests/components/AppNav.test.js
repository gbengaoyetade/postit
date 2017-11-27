import React from 'react';
import AppNav from '../../components/common/AppNav';

describe('AppNav component ', () => {
  it('should render correctly', () => {
    expect(shallow(<AppNav />)).toMatchSnapshot();
  });
});
