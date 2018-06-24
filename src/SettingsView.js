import React from 'react';
import { Body, Card, CardItem, CheckBox, Icon, Input, Item, Label, ListItem, Text } from 'native-base';
import { Linking, StyleSheet, View } from 'react-native';

export default class WeightResults extends React.Component {
  render() {
    return (
      <View>
        <Card>
          <CardItem>
            <Item floatingLabel>
              <Label>Default Barbell Weight</Label>
              <Input
                keyboardType='numeric'
                value={this.props.barbellWeight}
                onChangeText={(text) => this.props.onChangeSetBarbellWeight(text)}
              />
            </Item>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>Available Weights</Text>
          </CardItem>
          {this.renderWeightCheckboxes()}
        </Card>

        <View style={styles.github}>
          <Text onPress={this.onPressGitHub}><Icon name="logo-github" /></Text>
        </View>
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

  onPressGitHub() {
    Linking.openURL('https://www.github.com/doobix/barbell-native');
  }
}

const styles = StyleSheet.create({
  github: {
    alignSelf: 'center',
    paddingTop: 10,
  },
});
