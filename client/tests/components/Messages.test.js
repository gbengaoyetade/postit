import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'mock-local-storage';
import Messages from '../../components/message/Messages';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Messages component', () => {
  const store = mockStore({ messageReducer: {} });
  const props = {
    sendUserMessage: jest.fn(() => Promise.resolve()),
    groupId: 1,
    sendMessageSuccess: true,
    getMessages: () => {},
    messages: [{
      id: 1
    }],
  };
  const wrapper = shallow(<Messages {...props} store={store}/>);
  wrapper.setState({
    messageBody: '',
    messagePriority: 'Normal',
  });
  it('should contain handleChange function', () => {
    const event = {
      target: {
        value: 'This is the message body',
        name: 'message Body'
      }
    };
    const handleChangeSpy = jest
      .spyOn(wrapper.dive().instance(), 'handleChange');
    wrapper.dive().instance().handleChange(event);
    expect(handleChangeSpy).toBeDefined();
  });
  it('should have a handleSubmit function defined', () => {
    const event = {
      preventDefault: () => {},
    };
    const handleSubmitSpy = jest
    .spyOn(wrapper.dive().instance(), 'handleSubmit');
    wrapper.dive().instance().handleSubmit(event);
    expect(handleSubmitSpy).toBeDefined();
  });
});
