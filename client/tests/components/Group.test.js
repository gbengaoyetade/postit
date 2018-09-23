/* eslint-disable prettier */
import React from 'react';
import 'mock-local-storage';
import Group from '../../components/group/Group';

global.window = {};

window.localStorage = global.localStorage;
localStorage.setItem('postitUser', JSON.stringify({}));
describe('Group component', () => {
  const props = {
    getGroupMembers: () => {},
    getMessages: () => {},
    groupMembers: [],
    leaveGroup: () => {},
    history: {},
    leftGroup: false,
    leaveGroupSuccess: () => {},
    match: { params: { groupId: 1 } },
    currentGroup: {}
  };
  const wrapper = shallow(<Group.WrappedComponent {...props} />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
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
