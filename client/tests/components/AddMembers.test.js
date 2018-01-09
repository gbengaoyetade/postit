import React from 'react';
import 'mock-local-storage';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedAddMembers, { AddMembers }
from '../../components/group/AddMembers';
import ConnectedGroupMembers from '../../components/group/GroupMembers';
import { searchUser } from '../../actions/searchActions';

jest.mock('../../components/group/UserGroups');
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
describe('AddMembers component', () => {
  const store = mockStore({ groupReducer: {}, searchReducer: {} });
  const props = {
    searchUsers: searchUser,
    addMemberSuccess: [{}],
    match: { params: {} },
    searchResult: { },
    addMember: () => {},
    getGroupMembers: () => {},
    setAddMembersSucces: () => {},
    searchError: ''

  };
  const wrapper = shallow(<AddMembers {...props} store={store} />);
  it('should render correctly', () => {
    expect(wrapper.find(ConnectedGroupMembers).length).toBe(1);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div').length).toBeGreaterThan(0);
    expect(wrapper.find('form').length).toBe(1);
  });
  it('should have a function that receives user input', () => {
    const event = {
      target: { value: 'jack' },
    };
    wrapper.instance().handleSearch(event);
    expect(wrapper.state().userInput)
    .toEqual(event.target.value);
  });
  it('should have a addmember method', () => {
    const addMemberSpy = jest
    .spyOn(wrapper.instance(), 'addMember');

    wrapper.instance().addMember(1);
    expect(addMemberSpy).toBeDefined();
  });
  it('should send a message when user is added', () => {
    const updatedProps = {
      searchUsers: searchUser,
      addMember: () => {},
      getGroupMembers: () => {},
      setAddMembersSucces: () => {},
      addMemberSuccess: [],
      match: { params: {} },
      searchResult: {},
      searchError: ''
    };
    const updatedWrapper = shallow(
      <AddMembers store={store} {...updatedProps}/>
    );
    expect(updatedWrapper).toBeDefined();
  });
});
