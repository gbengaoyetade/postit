import React from 'react';
import AuthHoc from '../../components/authentication/AuthHoc';
import Home from '../../components/Home';
import { Dashboard } from '../../components/dashboard/Dashboard';

jest.mock('../../components/authentication/AuthHoc');
describe('AuthHoc component', () => {
  it('should always return the componet passed to it', () => {
    const wrappedComponent = mount(AuthHoc(<Home />));
    expect(wrappedComponent).toEqual(shallow(<Home />));
  });
  it('should should render correctly', () => {
    const Component = AuthHoc(Dashboard);
    const wrapper = shallow(<Component />);
    expect(wrapper).toMatchSnapshot();
  });
});
