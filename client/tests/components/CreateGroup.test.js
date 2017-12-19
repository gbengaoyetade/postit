import React from 'react';
import 'mock-local-storage';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CreateGroup from '../../components/group/CreateGroup';
import CreateGroupForm from '../../components/group/CreateGroupForm';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('CreateGroup component', () => {
  const store = mockStore({ groupReducer: {} });
  const props = {
    createGroup: () => {},
    createGroupError: () => {},
  };
  const wrapper = shallow(<CreateGroup {...props} store = {store}/>);
  it('should render one CreateGroupForm component', () => {
    expect(wrapper.dive().find(CreateGroupForm).length).toBe(1);
  });
});
