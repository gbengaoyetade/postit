import React from 'react';
import Home from '../../components/Home';

describe('Home component', () => {
  const wrapper = shallow(<Home />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
