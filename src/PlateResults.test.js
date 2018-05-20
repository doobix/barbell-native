import React from 'react';
import PlateResults, { ADD_WEIGHT_MESSAGE, LEFTOVER_WEIGHT_MESSAGE, NO_WEIGHT_MESSAGE } from './PlateResults';
import { shallow } from 'enzyme';
import { Text } from 'native-base';

const defaultPropsGenerator = (overrides) => ({
  calculatedWeight: 0,
  calculatedWeights: [],
  isWeightsCalculated: true,
  leftoverWeight: 0,
  ...overrides,
});

const setup = (props) => {
  return shallow(<PlateResults {...defaultPropsGenerator(props)} />);
}

describe('PlateResults', () => {
  it('renders nothing when isWeightsCalculated is false', () => {
    const wrapper = setup({ isWeightsCalculated: false });
    expect(wrapper.html()).toBeNull();
  });

  it('renders message when calculatedWeights is empty', () => {
    const wrapper = setup();
    expect(wrapper.find(Text).children().text()).toBe(NO_WEIGHT_MESSAGE);
  });

  it('renders message when there are leftover weights', () => {
    const calculatedWeight = 51;
    const leftoverWeight = 1;
    const wrapper = setup({
      calculatedWeight,
      calculatedWeights: [
        { count: '1', weight: '2.5' },
      ],
      leftoverWeight,
    });
    const leftoverMessage = LEFTOVER_WEIGHT_MESSAGE
      .replace('{leftoverWeight}', leftoverWeight)
      .replace('{calculatedWeight}', calculatedWeight)
    expect(wrapper.find(Text).children().at(0).text()).toBe(leftoverMessage);
  });

  it('renders items from calculatedWeights', () => {
    const wrapper = setup({
      calculatedWeights: [
        { count: '2', weight: '45' },
        { count: '1', weight: '2.5' },
      ]
    });
    expect(wrapper.find(Text).children().at(0).text()).toBe(ADD_WEIGHT_MESSAGE);
    expect(wrapper.find(Text).children().at(1).text()).toBe('2 x 45 lbs');
    expect(wrapper.find(Text).children().at(2).text()).toBe('1 x 2.5 lbs');
  });
});
