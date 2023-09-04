import { render, screen, fireEvent } from '@testing-library/react-native';
import App from './App';

jest.mock('@react-native-async-storage/async-storage', () => ({
  multiGet: jest.fn,
}));

const setup = () => {
  render(<App />);
}

describe('App', () => {
  it('renders PlateView by default', () => {
    setup();
    const input = screen.getAllByText('Target barbell weight');
    expect(input.length).not.toBe(0);
  });

  it('renders PercentageView', () => {
    setup();
    const navigation = screen.getByRole('button', { name: 'Percentages' });
    fireEvent(navigation, 'onClick');
    const input = screen.getAllByText('One rep max weight');
    expect(input.length).not.toBe(0);
  });

  it('renders SettingsView', () => {
    setup();
    const navigation = screen.getByRole('button', { name: 'Settings' });
    fireEvent(navigation, 'onClick');
    const input = screen.getAllByText('Default Barbell Weight');
    expect(input.length).not.toBe(0);
  });
});
