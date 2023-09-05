import { render, screen, fireEvent } from '@testing-library/react-native';
import PlateView from './PlateView';

const defaultPropsGenerator = (overrides) => ({
  calculatedWeight: 0,
  calculatedWeights: [],
  inputWeight: 0,
  isWeightsCalculated: false,
  leftoverWeight: 0,
  onPressCalculate: jest.fn(),
  ...overrides,
});

const setup = (props) => {
  render(<PlateView {...defaultPropsGenerator(props)} />);
}

describe('PlateView', () => {
  it('invokes onPressCalculate when button is pressed', () => {
    const onPressCalculate = jest.fn();
    setup({ onPressCalculate });
    expect(onPressCalculate).toHaveBeenCalledTimes(0);
    const button = screen.getByRole('button');
    fireEvent(button, 'onPress');
    expect(onPressCalculate).toHaveBeenCalledTimes(1);
  });
});
