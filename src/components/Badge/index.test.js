import React from 'react';
import { shallow } from 'enzyme';
import Badge from './';

it('Test example', () => {
  const wrapper = shallow(<Badge />);
  expect(wrapper.is('div')).toBeTruthy();
});
