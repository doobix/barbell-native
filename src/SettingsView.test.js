import React from 'react';
import SettingsView from './SettingsView';
import { shallow } from 'enzyme';
import { CheckBox } from 'native-base';

const defaultPropsGenerator = (overrides) => ({
  toggleWeightCheckbox: jest.fn(),
  weights: [55, 45, 35],
  weightMap: {
    55: false,
    45: true,
    35: false,
  },
  ...overrides,
});

const setup = (props) => {
  return shallow(<SettingsView {...defaultPropsGenerator(props)} />);
}

describe('SettingsView', () => {
  it('renders CheckBoxes correctly', () => {
    const wrapper = setup();
    expect(wrapper.find(CheckBox)).toHaveLength(3);
    expect(wrapper.find(CheckBox).at(0).props()).toHaveProperty('checked', false);
    expect(wrapper.find(CheckBox).at(1).props()).toHaveProperty('checked', true);
    expect(wrapper.find(CheckBox).at(2).props()).toHaveProperty('checked', false);
  });

  it('invokes toggleWeightCheckbox when pressing a CheckBox', () => {
    const toggleWeightCheckbox = jest.fn();
    const wrapper = setup({ toggleWeightCheckbox });
    expect(toggleWeightCheckbox).not.toHaveBeenCalled();
    wrapper.find(CheckBox).at(0).simulate('press');
    expect(toggleWeightCheckbox).toHaveBeenCalledTimes(1);
  });
});
