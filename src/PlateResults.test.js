import { render, screen, fireEvent } from '@testing-library/react-native';
import PlateResults, { ADD_WEIGHT_MESSAGE, LEFTOVER_WEIGHT_MESSAGE, NO_WEIGHT_MESSAGE } from './PlateResults';

const defaultPropsGenerator = (overrides) => ({
  calculatedWeight: 0,
  calculatedWeights: [],
  isWeightsCalculated: true,
  leftoverWeight: 0,
  ...overrides,
});

const setup = (props) => {
  render(<PlateResults {...defaultPropsGenerator(props)} />);
}

describe('PlateResults', () => {
  it('renders nothing when isWeightsCalculated is false', () => {
    setup({ isWeightsCalculated: false });
    expect(screen.root).toBeUndefined();
  });

  it('renders message when calculatedWeights is empty', () => {
    setup();
    expect(screen.getAllByText(NO_WEIGHT_MESSAGE)).toHaveLength(1);
  });

  it('renders message when there are leftover weights', () => {
    const calculatedWeight = 51;
    const leftoverWeight = 1;
    setup({
      calculatedWeight,
      calculatedWeights: [
        { count: '1', weight: '2.5' },
      ],
      leftoverWeight,
    });
    const leftoverMessage = LEFTOVER_WEIGHT_MESSAGE
      .replace('{leftoverWeight}', leftoverWeight)
      .replace('{calculatedWeight}', calculatedWeight)
    expect(screen.getAllByText(leftoverMessage)).toHaveLength(1);
  });

  it('renders items from calculatedWeights', () => {
    setup({
      calculatedWeights: [
        { count: '2', weight: '45' },
        { count: '1', weight: '2.5' },
      ]
    });
    expect(screen.getAllByText(ADD_WEIGHT_MESSAGE)).toHaveLength(1);
    expect(screen.getAllByText('2 x 45 lbs')).toHaveLength(1);
    expect(screen.getAllByText('1 x 2.5 lbs')).toHaveLength(1);
  });
});
