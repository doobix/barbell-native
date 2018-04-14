import React from 'react';
import { Container, Content, Header, Body, Title, Form, Item, Label, Input, Button, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';
import KeyPad from './KeyPad';

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
    };
  }

  async componentWillMount() {
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
        <Content>
          <Form>
            <Item floatingLabel last>
              <Label>Target barbell weight</Label>
              <Input keyboardType='numeric' value={this.state.inputWeight} onChangeText={(text) => this.onChangeSetWeight(text)} />
            </Item>
          </Form>
          <View style={styles.calculateButton}>
            <Button primary onPress={() => this.onPressCalculate()}>
              <Text>Calculate!</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }

  onChangeSetWeight(weight) {
    this.setState({inputWeight: weight});
  }

  onPressCalculate() {
    this.calculateWeights();
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
    padding: 10,
  },
});
