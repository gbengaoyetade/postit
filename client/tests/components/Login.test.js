import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'mock-local-storage';
import Login from '../../components/authentication/Login';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  authReducer: {},
  itemLoadingReducer: {},
});
describe('Login component', () => {
  const props = {
    user: {},
    setLoading: () => {},
    setLoginError: () => {},
    history: {},
    loginUser: () => {},
  };
  it('should render correctly', () => {
    const wrapper = shallow(<Login {...props} store={store}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
