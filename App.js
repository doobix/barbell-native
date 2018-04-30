import React from 'react';
import { AsyncStorage } from 'react-native';
import { Body, Container, Content, Footer, FooterTab, Header, Title } from 'native-base';
import FooterButton from './FooterButton';
import MainView from './MainView';
import PercentageView from './PercentageView';
import SettingsView from './SettingsView';

console.disableYellowBox = true;

const DEFAULT_MAX_WEIGHT = '315';
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
const LAST_MAX_WEIGHT = 'lastMaxWeight';
const PERCENTAGES = [
  0.95, 0.90, 0.85, 0.80, 0.75, 0.70, 0.65, 0.60, 0.55, 0.50,
  0.45, 0.40, 0.35, 0.30, 0.25, 0.20, 0.15, 0.10, 0.05
];

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
      currentView: 'plates',
      inputOneRepMaxWeight: DEFAULT_MAX_WEIGHT,
      calculatedOneRepMaxWeights: [],
      isPlatesCalculated: false,
      isPercentagesCalculated: false,
    };
  }

  async componentDidMount() {
    AsyncStorage.multiGet([LAST_INPUT_WEIGHT, LAST_WEIGHT_MAP, LAST_MAX_WEIGHT], (err, stores) => {
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
        if (!!value && key === LAST_MAX_WEIGHT) {
          lastState.inputOneRepMaxWeight = value;
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
            <FooterButton
              currentView={this.state.currentView}
              onPress={this.onPressChangeView}
              word='Plates'
            />
            <FooterButton
              currentView={this.state.currentView}
              onPress={this.onPressChangeView}
              word='Percentages'
            />
            <FooterButton
              currentView={this.state.currentView}
              onPress={this.onPressChangeView}
              word='Settings'
            />
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
    } else if (this.state.currentView === 'percentages') {
      return (
        <PercentageView
          calculatedOneRepMaxWeights={this.state.calculatedOneRepMaxWeights}
          inputOneRepMaxWeight={this.state.inputOneRepMaxWeight}
          onChangeSetOneRepMaxWeight={this.onChangeSetOneRepMaxWeight}
          onPressCalculate={this.onPressCalculate}
          isPercentagesCalculated={this.state.isPercentagesCalculated}
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
        isWeightsCalculated={this.state.isWeightsCalculated}
        />
    );
  }

  onChangeSetOneRepMaxWeight = (inputOneRepMaxWeight) => {
    this.setState({ inputOneRepMaxWeight });
  }

  onChangeSetWeight = (inputWeight) => {
    this.setState({ inputWeight });
  }

  onPressCalculate = (type) => {
    if (type === 'percentage') {
      this.calculatePercentage();
    } else {
      this.calculateWeights();
    }
  }

  onPressChangeView = (currentView) => {
    this.setState({ currentView });
  }

  calculatePercentage () {
    const weightPercentages = [];
    PERCENTAGES.forEach((percentage) => {
      let weight = Math.round(this.state.inputOneRepMaxWeight * percentage);
      const weightRemainder = weight % 5;
      if (weightRemainder) {
        weight = weight + (5 - weightRemainder);
      }
      weightPercentages.push({
        percentage: `${(percentage * 100).toFixed(0)}%`,
        weight,
      });
    });

    this.setState({
      calculatedOneRepMaxWeights: weightPercentages,
      isPercentagesCalculated: true,
    });

    AsyncStorage.setItem(LAST_MAX_WEIGHT, this.state.inputOneRepMaxWeight);
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
      isWeightsCalculated: true,
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
