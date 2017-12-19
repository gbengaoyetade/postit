import React from 'react';
import 'mock-local-storage';
import Routes from '../../components/Routes';

describe('Routes component', () => {
  const wrapper = shallow(<Routes />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
