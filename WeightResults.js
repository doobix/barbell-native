import React from 'react';
import { Card, CardItem, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';

export const NO_WEIGHT_MESSAGE = 'Please add a valid target barbell weight and press Calculate!';
export const LEFTOVER_WEIGHT_MESSAGE = 'Notice: No plates available for adding {leftoverWeight} lbs.';
export const ADD_WEIGHT_MESSAGE = 'Weights to add per side for {calculatedWeight} lbs:'

export default class WeightResults extends React.Component {
  render() {
    if (this.props.calculatedWeights.length === 0) {
      return (
        <Card>
          <CardItem>
            <Text style={styles.notice}>
              {NO_WEIGHT_MESSAGE}
            </Text>
          </CardItem>
        </Card>
      );
    }

    let weightElements = [];
    this.props.calculatedWeights.forEach((weightObj) => {
      weightElements.push(
        <CardItem key={`results-${weightObj.weight}`}>
          <Text>
            {weightObj.count} x {weightObj.weight} lbs
          </Text>
        </CardItem>
      );
    });

    let leftoverWeightElement = null;
    if (this.props.leftoverWeight) {
      leftoverWeightElement = (
        <Card>
          <CardItem bordered>
            <Text style={styles.notice}>
              {LEFTOVER_WEIGHT_MESSAGE.replace('{leftoverWeight}', this.props.leftoverWeight)}
            </Text>
          </CardItem>
        </Card>
      );
    }

    return (
      <React.Fragment>
        {leftoverWeightElement}
        <Card>
          <CardItem header bordered>
            <Text>{ADD_WEIGHT_MESSAGE.replace('{calculatedWeight}', this.props.calculatedWeight)}</Text>
          </CardItem>
          {weightElements}
        </Card>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  notice: {
    color: 'green',
  },
});
