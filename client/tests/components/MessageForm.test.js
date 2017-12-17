import React from 'react';
import MessageForm from '../../components/message/MessageForm';

describe('MessageForm component ', () => {
  const props = {
    handleChange: () => {},
    handleSubmit: () => {},
    messageBody: 'this is a message',
  };
  it('should render correctly', () => {
    expect(shallow(<MessageForm { ...props}/>)).toMatchSnapshot();
  });
});
