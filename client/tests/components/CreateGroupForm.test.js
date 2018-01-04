import React from 'react';
import CreateGroupForm from '../../components/group/CreateGroupForm';
import SubmitButton from '../../components/common/SubmitButton';

describe('CreateGroupForm component ', () => {
  const props = {
    handleChange: () => {},
    handleSubmit: () => {},
  };
  const wrapper = shallow(<CreateGroupForm  {...props}/>);
  it('should render correctly', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find(SubmitButton).length).toBe(1);
  });
});
