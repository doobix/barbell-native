import { render, screen, fireEvent } from '@testing-library/react-native';
import PercentageView from './PercentageView';

const defaultPropsGenerator = (overrides) => ({
  calculatedOneRepMaxWeights: [],
  inputOneRepMaxWeight: 100,
  isPercentagesCalculated: false,
  changeView: jest.fn(),
  setWeightAndCalculate: jest.fn(),
  onPressCalculate: jest.fn(),
  ...overrides,
});

const setup = (props) => {
  render(<PercentageView {...defaultPropsGenerator(props)} />);
}

describe('PercentageView', () => {
  it('invokes onPressCalculate when button is pressed', () => {
    const onPressCalculate = jest.fn();
    setup({ onPressCalculate });
    expect(onPressCalculate).toHaveBeenCalledTimes(0);
    const button = screen.getByRole('button');
    fireEvent(button, 'onPress');
    expect(onPressCalculate).toHaveBeenCalledTimes(1);
    expect(onPressCalculate).toHaveBeenCalledWith('100');
  });
});
