import React from 'react';
import 'mock-local-storage';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AddMembers from '../../components/group/AddMembers';
import AppNav from '../../components/common/AppNav';
import { searchUser } from '../../actions/searchActions';

jest.mock('../../components/group/UserGroups');
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
describe('AddMembers component', () => {
  const store = mockStore({ groupReducer: {}, searchReducer: {} });
  const props = {
    searchUsers: searchUser,
    addMemberSuccess: '',
    match: { params: {} },
    searchResult: { },
    addMember: () => {},
    getGroupMembers: () => {},
    setAddMembersSucces: () => {},

  };
  const wrapper = shallow(<AddMembers {...props} store={store} />);
  it('should render one AppNav component', () => {
    expect(wrapper.dive().find(AppNav).length).toBe(1);
  });
  it.only('should have a function that receives user input', () => {
    const event = {
      target: { value: 'jack' },
    };
    expect(wrapper.find(AddMembers).children().state().userInput)
    .toEqual(event.target.value);
  });
  it('should have a addmember method', () => {
    const addMemberSpy = jest
    .spyOn(wrapper.instance(), 'addMember');

    wrapper.dive().instance().addMember(1);
    expect(addMemberSpy).toBeDefined();
  });
  it('should send a message when user is added', () => {
    const updatedProps = {
      searchUsers: searchUser,
      addMember: () => {},
      getGroupMembers: () => {},
      setAddMembersSucces: () => {},
      addMemberSuccess: true,
      match: { params: {} },
      searchResult: {}
    };
    const updatedWrapper = shallow(
      <AddMembers store={store} {...updatedProps}/>
    );
    expect(updatedWrapper).toBeDefined();
  });
});
