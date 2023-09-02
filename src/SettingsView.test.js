import { render, screen, fireEvent } from '@testing-library/react-native';
import SettingsView from './SettingsView';

const defaultPropsGenerator = (overrides) => ({
  barbellWeight: '45',
  onChangeSetBarbellWeight: jest.fn(),
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
  render(<SettingsView {...defaultPropsGenerator(props)} />);
}

describe('SettingsView', () => {
  it('renders CheckBoxes correctly', () => {
    setup();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
    expect(checkboxes.at(0).props.accessibilityState.checked).toBeFalsy();
    expect(checkboxes.at(1).props.accessibilityState.checked).toBeTruthy();
    expect(checkboxes.at(2).props.accessibilityState.checked).toBeFalsy();
  });

  it('invokes toggleWeightCheckbox when pressing a Checkbox', () => {
    const toggleWeightCheckbox = jest.fn();
    setup({ toggleWeightCheckbox });
    expect(toggleWeightCheckbox).not.toHaveBeenCalled();
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent(checkboxes.at(0), 'onPress');
    expect(toggleWeightCheckbox).toHaveBeenCalledTimes(1);
  });

  it('invokes onPressSaveDefaultWeight when save button is pressed', () => {
    const onPressSaveDefaultWeight = jest.fn();
    setup({ onPressSaveDefaultWeight });
    expect(onPressSaveDefaultWeight).toHaveBeenCalledTimes(0);
    const button = screen.getByRole('button');
    fireEvent(button, 'onPress');
    expect(onPressSaveDefaultWeight).toHaveBeenCalledTimes(1);
  });
});
