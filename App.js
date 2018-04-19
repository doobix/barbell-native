import React from 'react';
import { Card, CardItem, Container, Content, Header, Body, Title, Item, Label, Input, Button, Text, Footer, FooterTab, Icon, ListItem, CheckBox } from 'native-base';
import { StyleSheet, View } from 'react-native';
import WeightResults from './WeightResults';

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
      return this.renderSettingsView();
    } 
    return this.renderMainView();
  }

  renderMainView() {
    return (
      <View>
        <Card>
          <CardItem>
            <Item floatingLabel>
              <Label>Target barbell weight</Label>
              <Input keyboardType='numeric' value={this.state.inputWeight} onChangeText={(text) => this.onChangeSetWeight(text)} />
            </Item>
          </CardItem>
          <CardItem>
            <View style={styles.calculateButton}>
              <Button primary onPress={() => this.onPressCalculate()}>
                <Text>Calculate!</Text>
              </Button>
            </View>
          </CardItem>
        </Card>,
        <WeightResults
          calculatedWeights={this.state.calculatedWeights}
          calculatedWeight={this.state.calculatedWeight}
          leftoverWeight={this.state.leftoverWeight}
        />
      </View>
    );
  }

  renderSettingsView() {
    return (
      <View>
        <Card>
          <CardItem header bordered>
            <Text>Available Weights</Text>
          </CardItem>
          {this.renderWeightCheckboxes()}
        </Card>
      </View>
    );
  }

  renderWeightCheckboxes() {
    const weightCheckboxes = [];
    this.state.weights.forEach((weight) => {
      weightCheckboxes.push(
        <ListItem key={`checkbox-${weight}`}>
          <CheckBox checked={this.state.weightMap[weight]} onPress={() => this.toggleWeightCheckbox(weight)} />
          <Body>
            <Text>{weight} lbs</Text>
          </Body>
        </ListItem>
      );
    });
    return weightCheckboxes;
  }

  toggleWeightCheckbox(weight) {
    const weightMap = {
      ...this.state.weightMap,
      [weight]: !this.state.weightMap[weight],
    }
    this.setState({
      ...this.state,
      weightMap,
    });
  }

  onChangeSetWeight(inputWeight) {
    this.setState({ inputWeight });
  }

  onPressCalculate() {
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
  }
}

const styles = StyleSheet.create({
  calculateButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
