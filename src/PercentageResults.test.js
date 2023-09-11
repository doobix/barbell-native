import { render, screen, fireEvent } from '@testing-library/react-native';
import PercentageResults, { MAX_PERCENTAGES_MESSAGE, NO_PERCENTAGE_MESSAGE } from './PercentageResults';

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
  render(<PercentageResults {...defaultPropsGenerator(props)} />);
}

describe('PercentageResults', () => {
  it('renders nothing when isPercentagesCalculated is false', () => {
    setup({ isPercentagesCalculated: false });
    expect(screen.root).toBeUndefined();
  });

  it('renders message when calculatedOneRepMaxWeights is empty', () => {
    setup();
    expect(screen.getAllByText(NO_PERCENTAGE_MESSAGE)).toHaveLength(1);
  });

  it('renders items from calculatedOneRepMaxWeights', () => {
    setup({
      calculatedOneRepMaxWeights: MOCK_WEIGHT_PERCENTAGES,
    });
    expect(screen.getAllByText(MAX_PERCENTAGES_MESSAGE)).toHaveLength(1);
    expect(screen.getAllByText('@ 100% = 100 lbs')).toHaveLength(1);
    expect(screen.getAllByText('@ 50% = 50 lbs')).toHaveLength(1);
  });

  it('calls setWeightAndCalculate and changeView functions when result is pressed', () => {
    const changeView = jest.fn();
    const setWeightAndCalculate = jest.fn();
    setup({
      calculatedOneRepMaxWeights: MOCK_WEIGHT_PERCENTAGES,
      changeView,
      setWeightAndCalculate,
    });
    expect(changeView).toHaveBeenCalledTimes(0);
    expect(setWeightAndCalculate).toHaveBeenCalledTimes(0);
    const buttons = screen.getAllByTestId('percentage-result');
    buttons.forEach((button, index) => {
      fireEvent(button, 'onPress');
      const weight = MOCK_WEIGHT_PERCENTAGES[index].weight;
      expect(setWeightAndCalculate).toHaveBeenLastCalledWith(weight);
      expect(changeView).toHaveBeenLastCalledWith(0);
    });
    expect(changeView).toHaveBeenCalledTimes(2);
    expect(setWeightAndCalculate).toHaveBeenCalledTimes(2);
  });
});
