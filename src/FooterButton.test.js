import React from 'react';
import FooterButton from './FooterButton';
import { mount, shallow } from 'enzyme';
import { Button, Icon } from 'native-base';

const defaultPropsGenerator = (overrides) => ({
  word: 'Plates',
  currentView: 'plates',
  onPress: jest.fn(),
  ...overrides,
});

const setup = (props) => {
  return shallow(<FooterButton {...defaultPropsGenerator(props)} />);
}

it('renders plates button as active', () => {
  const wrapper = setup();
  expect(wrapper.find(Button).props()).toHaveProperty('active', true);
});

it('renders plates button as not active', () => {
  const wrapper = setup({ currentView: 'settings' });
  expect(wrapper.find(Button).props()).toHaveProperty('active', false);
});

it('invokes onPress callback when button is pressed', () => {
  const onPress = jest.fn();
  const wrapper = setup({ onPress });
  expect(onPress).not.toHaveBeenCalled();
  wrapper.find(Button).simulate('press');
  expect(onPress).toHaveBeenCalled();
});
