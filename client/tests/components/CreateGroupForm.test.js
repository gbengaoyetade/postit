import React from 'react';
import CreateGroupForm from '../../components/group/CreateGroupForm';

describe('CreateGroupForm component ', () => {
  const props = {
    handleChange: () => {},
    handleSubmit: () => {},
  };
  it('should render correctly', () => {
    expect(shallow(<CreateGroupForm {...props}/>)).toMatchSnapshot();
  });
});
