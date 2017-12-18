import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Group from '../../components/group/Group';
import AppNav from '../../components/common/AppNav';

describe('Group component', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({ groupReducer: {} });
  const props = {
    getGroupMembers: () => {},
    getMessages: () => {},
    groupMembers: {},
    leaveGroup: () => {},
    history: {},
    leftGroup: false,
    leaveGroupSuccess: () => {},
    match: { params: { groupId: 1 } }
  };
  const wrapper = shallow(<Group store={store} {...props} />);
  it('should render correctly', () => {
    expect(wrapper.dive().find(AppNav).length).toBe(1);
    expect(wrapper.dive().find('ul#group-more').length).toBe(1);
  });
  it.only('should have componentWillUpdate method', () => {
    const spy = jest.spyOn(wrapper.dive().instance(), 'componentWillUpdate');
    wrapper.setProps({ leftGroup: true });
    wrapper.instance().componentWillUpdate();
    wrapper.setState({ name: 'gbenga' });
    expect(spy).toBeDefined();
  });
});
