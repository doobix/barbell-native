import React from 'react';
import PercentageResults, { MAX_PERCENTAGES_MESSAGE, NO_PERCENTAGE_MESSAGE } from './PercentageResults';
import { shallow } from 'enzyme';
import { CardItem, Text } from 'native-base';

const MOCK_WEIGHT_PERCENTAGES = [
  { percentage: '100%', weight: '100' },
  { percentage: '50%', weight: '50' },
];

const defaultPropsGenerator = (overrides) => ({
  changeView: jest.fn(),
  isPercentagesCalculated: true,
  calculatedOneRepMaxWeights: [],
  setWeightAndCalculate: jest.fn(),
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
      calculatedOneRepMaxWeights: MOCK_WEIGHT_PERCENTAGES,
    });
    expect(wrapper.find(Text).children().at(0).text()).toBe(MAX_PERCENTAGES_MESSAGE);
    expect(wrapper.find(Text).children().at(1).text()).toBe('@ 100% = 100 lbs');
    expect(wrapper.find(Text).children().at(2).text()).toBe('@ 50% = 50 lbs');
  });

  it('calls setWeightAndCalculate and changeView functions when result is pressed', () => {
    const changeView = jest.fn();
    const setWeightAndCalculate = jest.fn();
    const wrapper = setup({
      calculatedOneRepMaxWeights: MOCK_WEIGHT_PERCENTAGES,
      changeView,
      setWeightAndCalculate,
    });
    expect(changeView).toHaveBeenCalledTimes(0);
    expect(setWeightAndCalculate).toHaveBeenCalledTimes(0);
    wrapper.find(CardItem).forEach((item, index) => {
      if (item.props().button) {
        item.simulate('press');
        const weight = MOCK_WEIGHT_PERCENTAGES[index - 1].weight;
        expect(changeView).toHaveBeenLastCalledWith('plates');
        expect(setWeightAndCalculate).toHaveBeenLastCalledWith(weight);
      }
    });
    expect(changeView).toHaveBeenCalledTimes(2);
    expect(setWeightAndCalculate).toHaveBeenCalledTimes(2);
  });
});
