import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Group } from '../../components/group/Group';

describe('Group component', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({ groupReducer: {} });
  const props = {
    getGroupMembers: () => {},
    getMessages: () => {},
    groupMembers: [],
    leaveGroup: () => {},
    history: {},
    leftGroup: false,
    leaveGroupSuccess: () => {},
    match: { params: { groupId: 1 } }
  };
  const wrapper = shallow(<Group store={store} {...props} />);
  it('should render correctly', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('ul#group-more').length).toBe(1);
  });
  it('should have componentWillUpdate method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'componentWillUpdate');
    wrapper.setProps({ leftGroup: true });
    wrapper.instance().componentWillUpdate();
    expect(spy).toBeDefined();
  });
  it('should have a leave group function', () => {
    const leaveGroupSpy = jest.spyOn(wrapper.instance(), 'leaveGroup');
    wrapper.instance().leaveGroup();
    expect(leaveGroupSpy).toHaveBeenCalled();
  });
});
