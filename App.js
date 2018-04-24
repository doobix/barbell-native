import React from 'react';
import { AsyncStorage } from 'react-native';
import { Body, Button, Container, Content, Footer, FooterTab, Header, Icon, Title, Text } from 'native-base';
import MainView from './MainView';
import SettingsView from './SettingsView';

console.disableYellowBox = true;

const DEFAULT_WEIGHT = '310';
const DEFAULT_WEIGHT_MAP = {
  55: false,
  45: true,
  35: false,
  25: true,
  10: true,
  5: true,
  2.5: true,
};
const LAST_INPUT_WEIGHT = 'lastInputWeight';
const LAST_WEIGHT_MAP = 'lastWeightMap';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weights: [55, 45, 35, 25, 10, 5, 2.5],
      weightMap: DEFAULT_WEIGHT_MAP,
      barbellWeight: 45,
      inputWeight: DEFAULT_WEIGHT,
      calculatedWeights: [],
      calculatedWeight: 0,
      leftoverWeight: 0,
      hasCalculatedWeights: false,
      currentView: 'calculator',
    };
  }

  async componentDidMount() {
    AsyncStorage.multiGet([LAST_INPUT_WEIGHT, LAST_WEIGHT_MAP], (err, stores) => {
      let lastState = {};
      stores.map((result, i, store) => {
        let key = store[i][0];
        let value = store[i][1];
        if (!!value && key === LAST_INPUT_WEIGHT) {
          lastState.inputWeight = value;
        }
        if (!!value && key === LAST_WEIGHT_MAP) {
          lastState.weightMap = JSON.parse(value);
        }
      });
      this.setState(lastState);
    });
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Barbell Weight Calculator</Title>
          </Body>
        </Header>
        <Content padder>
          {this.renderView()}
        </Content>
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={this.state.currentView === 'calculator'}
              onPress={() => this.onPressChangeView('calculator')}
            >
              <Icon name="calculator" />
              <Text>Calculator</Text>
            </Button>
            <Button
              vertical
              active={this.state.currentView === 'settings'}
              onPress={() => this.onPressChangeView('settings')}
            >
              <Icon name="settings" />
              <Text>Settings</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  renderView() {
    if (this.state.currentView === 'settings') {
      return (
        <SettingsView
          toggleWeightCheckbox={this.toggleWeightCheckbox}
          weights={this.state.weights}
          weightMap={this.state.weightMap}
        />
      );
    } 
    return (
      <MainView
        calculatedWeights={this.state.calculatedWeights}
        calculatedWeight={this.state.calculatedWeight}
        inputWeight={this.state.inputWeight}
        leftoverWeight={this.state.leftoverWeight}
        onChangeSetWeight={this.onChangeSetWeight}
        onPressCalculate={this.onPressCalculate}
      />
    );
  }

  onChangeSetWeight = (inputWeight) => {
    this.setState({ inputWeight });
  }

  onPressCalculate = () => {
    this.calculateWeights();
  }

  onPressChangeView(currentView) {
    this.setState({ currentView });
  }

  calculateWeights() {
    const calculatedWeights = [];
    let oneSideWeights = (this.state.inputWeight - this.state.barbellWeight) / 2;

    this.state.weights.forEach((weight) => {
      if (this.state.weightMap[weight]) {
        let count = 0;
        while (oneSideWeights - weight >= 0) {
          oneSideWeights -= weight;
          count++;
        }
        if (count) {
          calculatedWeights.push({
            weight,
            count,
          });
        }
      }
    });

    this.setState({
      calculatedWeights,
      calculatedWeight: this.state.inputWeight - (oneSideWeights * 2),
      leftoverWeight: oneSideWeights * 2,
    });

    AsyncStorage.setItem(LAST_INPUT_WEIGHT, this.state.inputWeight);
  }

  toggleWeightCheckbox = (weight) => {
    const weightMap = {
      ...this.state.weightMap,
      [weight]: !this.state.weightMap[weight],
    }
    this.setState({
      ...this.state,
      weightMap,
    }, () => {
      AsyncStorage.setItem(LAST_WEIGHT_MAP, JSON.stringify(this.state.weightMap));
      this.calculateWeights();
    });
  }
}
