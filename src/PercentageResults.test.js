import React from 'react';
import PercentageResults, { MAX_PERCENTAGES_MESSAGE, NO_PERCENTAGE_MESSAGE } from './PercentageResults';
import { shallow } from 'enzyme';
import { Text } from 'native-base';

const defaultPropsGenerator = (overrides) => ({
  isPercentagesCalculated: true,
  calculatedOneRepMaxWeights: [],
  ...overrides,
});

const setup = (props) => {
  return shallow(<PercentageResults {...defaultPropsGenerator(props)} />);
}

describe('PercentageResults', () => {
  it('renders nothing when isPercentagesCalculated is false', () => {
    const wrapper = setup({ isPercentagesCalculated: false });
    expect(wrapper.html()).toBeNull();
  });

  it('renders message when calculatedOneRepMaxWeights is empty', () => {
    const wrapper = setup();
    expect(wrapper.find(Text).children().text()).toBe(NO_PERCENTAGE_MESSAGE);
  });

  it('renders items from calculatedOneRepMaxWeights', () => {
    const wrapper = setup({
      calculatedOneRepMaxWeights: [
        { percentage: '100%', weight: '100' },
        { percentage: '50%', weight: '50' },
      ]
    });
    expect(wrapper.find(Text).children().at(0).text()).toBe(MAX_PERCENTAGES_MESSAGE);
    expect(wrapper.find(Text).children().at(1).text()).toBe('@ 100% = 100 lbs');
    expect(wrapper.find(Text).children().at(2).text()).toBe('@ 50% = 50 lbs');
  });
});
