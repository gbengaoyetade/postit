import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'mock-local-storage';
import Signup from '../../components/authentication/Signup';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Signup component', () => {
  const store = mockStore({
    user: {},
    authReducer: {},
    itemLoadingReducer: {}
  });
  const props = {
    history: {}
  };
  const SignupWrapper = shallow(<Signup store={store} {...props}/>);
  it('should render correctly', () => {
    expect(SignupWrapper).toMatchSnapshot();
  });
  // it('should handle change event', () => {
  //   const mockEvent = {};
  //   console.log(SignupWrapper.instance());
  //   expect(SignupWrapper.dive().instance().handleClick(mockEvent)).toBe(true);
  // });
  it('should not submit when for contains errors', () => {
    
  });
});
