import React from 'react';
import { Keyboard, ScrollView } from 'react-native';
import { Appbar, BottomNavigation, PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PercentageView from './src/PercentageView';
import PlateView from './src/PlateView';
import SettingsView from './src/SettingsView';

console.disableYellowBox = true;

const DEFAULT_BARBELL_WEIGHT = '45';
const DEFAULT_MAX_WEIGHT = '315';
const DEFAULT_WEIGHT = '310';
const DEFAULT_WEIGHTS = [55, 45, 35, 25, 15, 10, 5, 2.5]
const DEFAULT_WEIGHT_MAP = {
  55: false,
  45: true,
  35: false,
  25: true,
  15: false,
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
      weights: DEFAULT_WEIGHTS,
      weightMap: DEFAULT_WEIGHT_MAP,
      barbellWeight: DEFAULT_BARBELL_WEIGHT,
      inputWeight: DEFAULT_WEIGHT,
      calculatedWeights: [],
      calculatedWeight: 0,
      leftoverWeight: 0,
      inputOneRepMaxWeight: DEFAULT_MAX_WEIGHT,
      calculatedOneRepMaxWeights: [],
      isPlatesCalculated: false,
      isPercentagesCalculated: false,
      routeIndex: 0,
      routes: [
        { key: 'plates', title: 'Plates', focusedIcon: 'dumbbell', unfocusedIcon: 'dumbbell' },
        { key: 'percentages', title: 'Percentages', focusedIcon: 'percent', unfocusedIcon: 'percent' },
        { key: 'settings', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog' },
      ],
    };
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
    return (
      <PaperProvider>
        <Appbar.Header mode="center-aligned">
          <Appbar.Content title="Barbell Weight Calculator" />
        </Appbar.Header>
        <BottomNavigation
          navigationState={{ index: this.state.routeIndex, routes: this.state.routes }}
          onIndexChange={(routeIndex) => this.setState({routeIndex})}
          renderScene={BottomNavigation.SceneMap({
            plates: () => (
              <ScrollView contentContainerStyle={{ padding: 20}}>
                <PlateView
                  calculatedWeights={this.state.calculatedWeights}
                  calculatedWeight={this.state.calculatedWeight}
                  inputWeight={this.state.inputWeight}
                  leftoverWeight={this.state.leftoverWeight}
                  onPressCalculate={this.onPressCalculateWeights}
                  isWeightsCalculated={this.state.isWeightsCalculated}
                />
              </ScrollView>
            ),
            percentages: () => (
              <ScrollView contentContainerStyle={{ padding: 20}}>
                <PercentageView
                  calculatedOneRepMaxWeights={this.state.calculatedOneRepMaxWeights}
                  changeView={this.onPressChangeView}
                  inputOneRepMaxWeight={this.state.inputOneRepMaxWeight}
                  isPercentagesCalculated={this.state.isPercentagesCalculated}
                  onPressCalculate={this.onPressCalculatePercentages}
                  setWeightAndCalculate={this.setWeightAndCalculate}
                />
              </ScrollView>
            ),
            settings: () => (
              <ScrollView contentContainerStyle={{ padding: 20}}>
                <SettingsView
                  barbellWeight={this.state.barbellWeight}
                  onPressSaveDefaultWeight={this.onPressSaveDefaultWeight}
                  toggleWeightCheckbox={this.toggleWeightCheckbox}
                  weights={this.state.weights}
                  weightMap={this.state.weightMap}
                />
              </ScrollView>
            ),
          })}
        />
      </PaperProvider>
    );
  }

  onChangeSetOneRepMaxWeight = (inputOneRepMaxWeight) => {
    this.setState({ inputOneRepMaxWeight });
  }

  onChangeSetWeight = (inputWeight) => {
    this.setState({ inputWeight });
  }

  onPressCalculateWeights = (weight) => {
    Keyboard.dismiss();
    this.calculateWeights(weight);
  }

  onPressCalculatePercentages = (weight) => {
    Keyboard.dismiss();
    this.calculatePercentage(weight);
  }

  onPressSaveDefaultWeight = (weight) => {
    Keyboard.dismiss();
    this.setBarbellWeight(weight);
  }

  onPressChangeView = (routeIndex) => {
    this.setState({ routeIndex });
  }

  calculatePercentage(inputWeight) {
    const weightPercentages = [];
    PERCENTAGES.forEach((percentage) => {
      let weight = Math.round(inputWeight * percentage);
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
      inputOneRepMaxWeight: inputWeight,
    });

    AsyncStorage.setItem(LAST_MAX_WEIGHT, inputWeight);
  }

  calculateWeights(inputWeight) {
    const calculatedWeights = [];
    let oneSideWeights = (inputWeight - this.state.barbellWeight) / 2;

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
      calculatedWeight: inputWeight - (oneSideWeights * 2),
      leftoverWeight: oneSideWeights * 2,
      isWeightsCalculated: true,
      inputWeight,
    });

    AsyncStorage.setItem(LAST_INPUT_WEIGHT, inputWeight);
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
      this.calculateWeights(this.state.inputWeight);
    });
  }

  setBarbellWeight = (barbellWeight) => {
    this.setState({ barbellWeight }, () => {
      AsyncStorage.setItem(LAST_BARBELL_WEIGHT, this.state.barbellWeight);
      this.calculateWeights(this.state.inputWeight);
    });
  }

  setWeightAndCalculate = (inputWeight) => {
    this.setState({ inputWeight }, () => {
      this.onPressCalculateWeights(this.state.inputWeight);
    });
  }
}
