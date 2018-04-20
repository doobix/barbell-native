import React from 'react';
import { Body, Card, CardItem, CheckBox, ListItem, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';

export default class WeightResults extends React.Component {
  render() {
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
    this.props.weights.forEach((weight) => {
      weightCheckboxes.push(
        <ListItem key={`checkbox-${weight}`}>
          <CheckBox
            checked={this.props.weightMap[weight]}
            onPress={() => this.props.toggleWeightCheckbox(weight)}
          />
          <Body>
            <Text>{weight} lbs</Text>
          </Body>
        </ListItem>
      );
    });
    return weightCheckboxes;
  }
}

const styles = StyleSheet.create({
  notice: {
    color: 'green',
  },
});
