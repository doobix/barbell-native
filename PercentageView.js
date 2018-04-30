import React from 'react';
import { Button, Card, CardItem, Input, Item, Label, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';
import PercentageResults from './PercentageResults';

export default class PercentageView extends React.Component {
  render() {
    return (
      <View>
        <Card>
          <CardItem>
            <Item floatingLabel>
              <Label>One rep max weight</Label>
              <Input
                keyboardType='numeric'
                value={this.props.inputOneRepMaxWeight}
                onChangeText={(text) => this.props.onChangeSetOneRepMaxWeight(text)}
              />
            </Item>
          </CardItem>
          <CardItem>
            <View style={styles.calculateButton}>
              <Button
                primary
                onPress={() => this.props.onPressCalculate('percentage')}
              >
                <Text>Calculate Percentages</Text>
              </Button>
            </View>
          </CardItem>
        </Card>,
        <View>
        </View>
        <PercentageResults
          calculatedOneRepMaxWeights={this.props.calculatedOneRepMaxWeights}
          isPercentagesCalculated={this.props.isPercentagesCalculated}
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
