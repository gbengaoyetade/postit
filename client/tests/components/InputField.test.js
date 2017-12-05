import React from 'react';
import InputField from '../../components/common/InputField';


describe('InputField component', () => {
  const props = {
    type: 'text',
    name: 'test',
    handleChange: () => {},
    labelValue: 'description',
    className: 'whatever'
  };
  const InputFieldWrapper = shallow(<InputField {...props} />);
  it('should render one div', () => {
    expect(InputFieldWrapper.find('div').length).toBe(1);
  });
  it('should contain only one input tag', () => {
    expect(InputFieldWrapper.find('input').length).toBe(1);
  });
});
