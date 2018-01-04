import React from 'react';
import 'mock-local-storage';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedGroup, { CreateGroup }
from '../../components/group/CreateGroup';
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
  it('should render without crashing', () => {
    expect(wrapper.find(CreateGroupForm).length).toBe(1);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });
  it('should have a handleChange function', () => {
    const event = { target: { name: 'name', value: 'value' } };
    wrapper.instance().handleChange(event);
    expect(wrapper.state().name).toBe(event.target.value);
  });
});
describe('Connected CreateGroup', () => {
  const store = mockStore({
    groupReducer: { members: [] }
  });
  it('should render without crashing', () => {
    const wrapper = shallow(<ConnectedGroup store = {store}/>);
    expect(wrapper.length).toBe(1);
  });
});
