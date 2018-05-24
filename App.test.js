import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import PercentageView from './src/PercentageView';
import PlateView from './src/PlateView';
import SettingsView from './src/SettingsView';

const setup = (props) => {
  return shallow(<App />);
}

describe('App', () => {
  it('renders PlateView by default', () => {
    const wrapper = setup();
    wrapper.setState({ isFontLoaded: true })
    expect(wrapper.find(PercentageView)).toHaveLength(0);
    expect(wrapper.find(PlateView)).toHaveLength(1);
    expect(wrapper.find(SettingsView)).toHaveLength(0);
  });

  it('renders PercentageView when currentView = percents', () => {
    const wrapper = setup();
    wrapper.setState({ isFontLoaded: true, currentView: 'percents' })
    expect(wrapper.find(PercentageView)).toHaveLength(1);
    expect(wrapper.find(PlateView)).toHaveLength(0);
    expect(wrapper.find(SettingsView)).toHaveLength(0);
  });

  it('renders SettingsView when currentView = settings', () => {
    const wrapper = setup();
    wrapper.setState({ isFontLoaded: true, currentView: 'settings' })
    expect(wrapper.find(PercentageView)).toHaveLength(0);
    expect(wrapper.find(PlateView)).toHaveLength(0);
    expect(wrapper.find(SettingsView)).toHaveLength(1);
  });
});
