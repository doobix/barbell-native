import React from 'react';
import PercentageView from './PercentageView';
import { shallow } from 'enzyme';
import { Button, Input } from 'native-base';

const defaultPropsGenerator = (overrides) => ({
  calculatedOneRepMaxWeights: [],
  inputOneRepMaxWeight: 100,
  isPercentagesCalculated: false,
  onChangeSetOneRepMaxWeight: jest.fn(),
  onPressCalculate: jest.fn(),
  ...overrides,
});

const setup = (props) => {
  return shallow(<PercentageView {...defaultPropsGenerator(props)} />);
}

describe('PercentageView', () => {
  it('invokes onChangeSetOneRepMaxWeight when Input is changed', () => {
    const onChangeSetOneRepMaxWeight = jest.fn();
    const wrapper = setup({ onChangeSetOneRepMaxWeight });
    expect(onChangeSetOneRepMaxWeight).toHaveBeenCalledTimes(0);
    wrapper.find(Input).simulate('changeText');
    expect(onChangeSetOneRepMaxWeight).toHaveBeenCalledTimes(1);
  });

  it('invokes onPressCalculate when Button is pressed', () => {
    const onPressCalculate = jest.fn();
    const wrapper = setup({ onPressCalculate });
    expect(onPressCalculate).toHaveBeenCalledTimes(0);
    wrapper.find(Button).simulate('press');
    expect(onPressCalculate).toHaveBeenCalledTimes(1);
  });

  it('passes correct properties to PercentageResults', () => {
    const calculatedOneRepMaxWeights = [
      { percentage: '100%', weight: '100' },
      { percentage: '50%', weight: '50' },
    ];
    const isPercentagesCalculated = true;
    const wrapper = setup({ calculatedOneRepMaxWeights, isPercentagesCalculated });
    expect(wrapper.find('PercentageResults').props()).toHaveProperty('calculatedOneRepMaxWeights', calculatedOneRepMaxWeights);
    expect(wrapper.find('PercentageResults').props()).toHaveProperty('isPercentagesCalculated', isPercentagesCalculated);
  });
});
