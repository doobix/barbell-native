import React from 'react';
import { Button, Card, CardItem, Input, Item, Label, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';
import WeightResults from './WeightResults';

export default class MainView extends React.Component {
  render() {
    return (
      <View>
        <Card>
          <CardItem>
            <Item floatingLabel>
              <Label>Target barbell weight</Label>
              <Input
                keyboardType='numeric'
                value={this.props.inputWeight}
                onChangeText={(text) => this.props.onChangeSetWeight(text)}
              />
            </Item>
          </CardItem>
          <CardItem>
            <View style={styles.calculateButton}>
              <Button
                primary
                onPress={() => this.props.onPressCalculate()}
              >
                <Text>Calculate!</Text>
              </Button>
            </View>
          </CardItem>
        </Card>,
        <WeightResults
          calculatedWeights={this.props.calculatedWeights}
          calculatedWeight={this.props.calculatedWeight}
          leftoverWeight={this.props.leftoverWeight}
        />
      </View>
    );
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
