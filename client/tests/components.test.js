import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextInput from '../components/common/TextInput';
import SubmitButton from '../components/common/SubmitButton';

configure({ adapter: new Adapter() });

describe('TextInput component', () => {
  const props = {
    type: 'text',
    name: 'test',
    handleChange: () => {},
    description: 'description',
    className: 'whatever'
  };
  const TextInputWrapper = shallow(<TextInput {...props} />);
  it('should render one div', () => {
    expect(TextInputWrapper.find('div').length).toBe(1);
  });
  it('should render correctly', () => {
    expect(TextInputWrapper).toMatchSnapshot();
  });
});
describe('Submit button', () => {
  const props = {
    submitValue: 'create group'
  };
  const wrapper = shallow(<SubmitButton {...props} />);
  it('should render without exploding', () => {
    expect(wrapper.length).toBe(1);
  });
});
