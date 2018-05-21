import React from 'react';
import PlateView from './PlateView';
import { shallow } from 'enzyme';
import { Button, Input } from 'native-base';

const defaultPropsGenerator = (overrides) => ({
  calculatedWeight: 0,
  calculatedWeights: [],
  inputWeight: 0,
  isWeightsCalculated: false,
  leftoverWeight: 0,
  onChangeSetWeight: jest.fn(),
  onPressCalculate: jest.fn(),
  ...overrides,
});

const setup = (props) => {
  return shallow(<PlateView {...defaultPropsGenerator(props)} />);
}

describe('PlateView', () => {
  it('invokes onChangeSetWeight when Input is changed', () => {
    const onChangeSetWeight = jest.fn();
    const wrapper = setup({ onChangeSetWeight });
    expect(onChangeSetWeight).toHaveBeenCalledTimes(0);
    wrapper.find(Input).simulate('changeText');
    expect(onChangeSetWeight).toHaveBeenCalledTimes(1);
  });

  it('invokes onPressCalculate when Button is pressed', () => {
    const onPressCalculate = jest.fn();
    const wrapper = setup({ onPressCalculate });
    expect(onPressCalculate).toHaveBeenCalledTimes(0);
    wrapper.find(Button).simulate('press');
    expect(onPressCalculate).toHaveBeenCalledTimes(1);
  });

  it('passes correct properties to PlateResults', () => {
    const calculatedWeight = 55;
    const calculatedWeights = [{ count: '1', weight: '5' }];
    const isWeightsCalculated = true;
    const leftoverWeight = 1;
    const wrapper = setup({
      calculatedWeight,
      calculatedWeights,
      isWeightsCalculated,
      leftoverWeight,
    });
    expect(wrapper.find('PlateResults').props()).toHaveProperty('calculatedWeight', calculatedWeight);
    expect(wrapper.find('PlateResults').props()).toHaveProperty('calculatedWeights', calculatedWeights);
    expect(wrapper.find('PlateResults').props()).toHaveProperty('isWeightsCalculated', isWeightsCalculated);
    expect(wrapper.find('PlateResults').props()).toHaveProperty('leftoverWeight', leftoverWeight);
  });
});
