import React from 'react';
import 'mock-local-storage';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Dashboard } from '../../components/dashboard/Dashboard';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
describe('Dashboard component', () => {
  const store = mockStore({ groupReducer: {} });
  it('should render correctly', () => {
    const props = {
      getGroups: () => {},
      groups: [
        { id: 2,
          groupName: 'jazz levites',
          groupDescription: 'For the lovers of Jazz music',
          createdBy: 1,
          createdAt: '2017-11-29T11:29:42.706Z',
          messages: []
        }
      ]
    };
    const wrapper = shallow(<Dashboard {...props} store= {store}/>);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });
});
