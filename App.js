import * as Expo from "expo";
import React from 'react';
import { AsyncStorage, Keyboard } from 'react-native';
import { Body, Container, Content, Footer, FooterTab, Header, Title } from 'native-base';
import FooterButton from './src/FooterButton';
import PercentageView from './src/PercentageView';
import PlateView from './src/PlateView';
import SettingsView from './src/SettingsView';

console.disableYellowBox = true;

const DEFAULT_BARBELL_WEIGHT = '45';
const DEFAULT_MAX_WEIGHT = '315';
const DEFAULT_WEIGHT = '310';
const DEFAULT_WEIGHTS = [55, 45, 35, 25, 10, 5, 2.5]
const DEFAULT_WEIGHT_MAP = {
  55: false,
  45: true,
  35: false,
  25: true,
  10: true,
  5: true,
  2.5: true,
};
const LAST_BARBELL_WEIGHT = 'lastBarbellWeight';
const LAST_INPUT_WEIGHT = 'lastInputWeight';
const LAST_MAX_WEIGHT = 'lastMaxWeight';
const LAST_WEIGHT_MAP = 'lastWeightMap';
const PERCENTAGES = [
  0.95, 0.90, 0.85, 0.80, 0.75, 0.70, 0.65, 0.60, 0.55, 0.50,
  0.45, 0.40, 0.35, 0.30, 0.25, 0.20, 0.15, 0.10, 0.05
];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFontLoaded: false,
      weights: DEFAULT_WEIGHTS,
      weightMap: DEFAULT_WEIGHT_MAP,
      barbellWeight: DEFAULT_BARBELL_WEIGHT,
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

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isFontLoaded: true });
  }

  componentDidMount() {
    AsyncStorage.multiGet([
      LAST_BARBELL_WEIGHT,
      LAST_INPUT_WEIGHT,
      LAST_MAX_WEIGHT,
      LAST_WEIGHT_MAP,
    ], (err, stores) => {
      let lastState = {};
      stores.map((result, i, store) => {
        let key = store[i][0];
        let value = store[i][1];
        if (!!value && key === LAST_BARBELL_WEIGHT) {
          lastState.barbellWeight = value;
        }
        if (!!value && key === LAST_INPUT_WEIGHT) {
          lastState.inputWeight = value;
        }
        if (!!value && key === LAST_MAX_WEIGHT) {
          lastState.inputOneRepMaxWeight = value;
        }
        if (!!value && key === LAST_WEIGHT_MAP) {
          lastState.weightMap = JSON.parse(value);
        }
      });
      this.setState(lastState);
    });
  }

  render() {
    if (!this.state.isFontLoaded) {
      return (
        <Expo.AppLoading />
      );
    }

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
              word='Percents'
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
          barbellWeight={this.state.barbellWeight}
          onChangeSetBarbellWeight={this.setBarbellWeight}
          toggleWeightCheckbox={this.toggleWeightCheckbox}
          weights={this.state.weights}
          weightMap={this.state.weightMap}
        />
      );
    } else if (this.state.currentView === 'percents') {
      return (
        <PercentageView
          calculatedOneRepMaxWeights={this.state.calculatedOneRepMaxWeights}
          changeView={this.onPressChangeView}
          inputOneRepMaxWeight={this.state.inputOneRepMaxWeight}
          isPercentagesCalculated={this.state.isPercentagesCalculated}
          onChangeSetOneRepMaxWeight={this.onChangeSetOneRepMaxWeight}
          onPressCalculate={this.onPressCalculate}
          setWeightAndCalculate={this.setWeightAndCalculate}
        />
      );
    }
    return (
      <PlateView
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
    Keyboard.dismiss();

    if (type === 'percents') {
      this.calculatePercentage();
    } else {
      this.calculateWeights();
    }
  }

  onPressChangeView = (currentView) => {
    this.setState({ currentView });
  }

  calculatePercentage() {
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

  setBarbellWeight = (barbellWeight) => {
    this.setState({ barbellWeight }, () => {
      AsyncStorage.setItem(LAST_BARBELL_WEIGHT, this.state.barbellWeight);
      this.calculateWeights();
    });
  }

  setWeightAndCalculate = (inputWeight) => {
    this.setState({ inputWeight }, () => {
      this.onPressCalculate();
    });
  }
}
