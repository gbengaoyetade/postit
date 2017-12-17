import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserGroups from '../../components/group/UserGroups';

describe('UserGroup component', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({ groupReducer: {} });
  const props = {
    getGroups: () => {},
    groups: [{}, {}],
    getMessages: () => {},
    getGroupMembers: () => {},
  };
  const wrapper = shallow(<UserGroups store={store} {...props} />);
  it('should render correctly', () => {
    expect(wrapper.dive().find('div').length).toBe(1);
  });
});
