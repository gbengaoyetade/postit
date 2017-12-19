import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { RecoverPassword } from '../../components/password/RecoverPassword';
import RecoverPasswordPage from '../../components/password/RecoverPasswordPage';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
describe('RecoverPassword component', () => {
  const props = {
    sendMail: () => {},
    error: {}
  };
  const store = mockStore({ passwordReducer: {}, itemLoadingReducer: {} });
  const wrapper = shallow(<RecoverPassword store={store} {...props} />);
  it('should render on RecoverPasswordPage component', () => {
    expect(wrapper.find(RecoverPasswordPage).length).toBe(1);
  });
  it('should have a handleChange function defined', () => {
    const mockEvent = {
      target: {
        name: 'name',
        value: 'value'
      }
    };
    const handleChangeSpy = jest
    .spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().handleChange(mockEvent);
    expect(handleChangeSpy).toHaveBeenCalled();
  });
});
