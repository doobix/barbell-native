import React from 'react';
import { Button, Card, CardItem, Input, Item, Label, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';
import PlateResults from './PlateResults';

export default class PlateView extends React.Component {
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
                <Text>Calculate Plates</Text>
              </Button>
            </View>
          </CardItem>
        </Card>
        <PlateResults
          calculatedWeights={this.props.calculatedWeights}
          calculatedWeight={this.props.calculatedWeight}
          isWeightsCalculated={this.props.isWeightsCalculated}
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
