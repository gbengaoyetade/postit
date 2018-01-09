import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { UserGroups } from '../../components/group/UserGroups';

describe('UserGroup component', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({ groupReducer: {} });
  const props = {
    getGroups: () => {},
    groups: [{
      id: 5,
      groupName: 'add',
      groupDescription: 'fdfd',
      createdBy: 1,
      messages: []
    },
    {
      id: 6,
      groupName: 'group',
      groupDescription: 'desc',
      createdBy: 1,
      messages: []
    }],
    getMessages: () => {},
    getGroupMembers: () => {},
  };
  const wrapper = shallow(<UserGroups store={store} {...props} />);
  it('should render groups in a collection', () => {
    expect(wrapper.find('.collection').length).toBe(1);
    expect(wrapper.find('.collection-item').length).toBe(2);
  });
  it('should have a function that gets groupData',
  () => {
    const getGroupSpy = jest.spyOn(wrapper.instance(), 'getGroupData');
    wrapper.instance().getGroupData(1);
    expect(getGroupSpy).toHaveBeenCalledTimes(1);
  });
});
