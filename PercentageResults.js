import React from 'react';
import { Card, CardItem, Text } from 'native-base';
import { StyleSheet } from 'react-native';

export const NO_PERCENTAGE_MESSAGE = 'Please add a valid one rep max weight and press Calculate Percentages.';
export const MAX_PERCENTAGES_MESSAGE = 'Max percentages:'

export default class PercentageResults extends React.Component {
  render() {
    if (this.props.calculatedOneRepMaxWeights.length === 0) {
      return (
        <Card>
          <CardItem>
            <Text style={styles.notice}>
              {NO_PERCENTAGE_MESSAGE}
            </Text>
          </CardItem>
        </Card>
      );
    }

    let percentageElements = [];
    this.props.calculatedOneRepMaxWeights.forEach((percentObj) => {
      percentageElements.push(
        <CardItem key={`percent-results-${percentObj.percentage}`} bordered>
          <Text>
            @ {percentObj.percentage} = {percentObj.weight} lbs
          </Text>
        </CardItem>
      );
    });

    return (
      <React.Fragment>
        <Card>
          <CardItem header bordered>
            <Text>{MAX_PERCENTAGES_MESSAGE}</Text>
          </CardItem>
          {percentageElements}
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
