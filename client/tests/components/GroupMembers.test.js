import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import ConnectedGroupMembers, { GroupMembers }
from '../../components/group/GroupMembers';

const mockStore = configureMockStore([
  thunk
]);

describe('GroupMembers component', () => {
  const props = {
    getGroupMembers: () => {},
    groupId: 1,
    groupMembers: [{
      id: 1,
      username: 'michi',
      fullName: 'Agbo amarachi',
      email: 'amarachi@gmail.com',
      phoneNumber: '08064140695',
      groupMembers: {
        userId: 1,
        addedBy: 1,
        groupId: 1,
        createdAt: '2018-01-04T11:53:50.773Z',
        updatedAt: '2018-01-04T11:53:50.773Z'
      }
    }],
  };
  const wrapper = shallow(<GroupMembers {...props} />);
  it('should render group members when groupmembers are at least 1',
  () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('.group-members-list').length).toBe(1);
  });
});
describe('Connect GroupMembers', () => {
  const store = mockStore({
    groupReducer: { members: [] }
  });
  it('should render without crashing', () => {
    const wrapper = shallow(<ConnectedGroupMembers store = {store}/>);
    expect(wrapper.length).toBe(1);
  });
});
