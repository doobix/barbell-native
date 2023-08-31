import { useState} from 'react';
import { Linking, View } from 'react-native';
import { Button, Card, Checkbox, Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default WeightResults = (props) => {
  const [defaultWeight, setDefaultWeight] = useState(props.barbellWeight);

  const renderWeightCheckboxes = () => {
    const weightCheckboxes = [];
    props.weights.forEach((weight) => {
      const status = props.weightMap[weight] ? 'checked' : 'unchecked';
      weightCheckboxes.push(
        <Text key={`checkbox-${weight}`}>
          <Checkbox.Item
            label={`${weight} lbs`}
            status={status}
            onPress={() => props.toggleWeightCheckbox(weight)}
            position="leading"
          />
        </Text>
      );
    });
    return weightCheckboxes;
  }

  const onPressGitHub = () => {
    Linking.openURL('https://www.github.com/doobix/barbell-native');
  }

  return (
    <>
      <Card>
        <Card.Content>
          <TextInput
            label="Default Barbell Weight"
            value={defaultWeight}
            onChangeText={setDefaultWeight}
            keyboardType="numeric"
          />
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => props.onPressSaveDefaultWeight(defaultWeight)}>
            Save default barbell weight
          </Button>
        </Card.Actions>
      </Card>

      <View style={{ marginTop: 20 }}>
        <Card>
          <Card.Title title="Available Weights:" />
          <Card.Content>
            {renderWeightCheckboxes()}
          </Card.Content>
        </Card>
      </View>

      <View style={{
        alignSelf: 'center',
        marginTop: 20,
      }}>
        <Text onPress={onPressGitHub}><Icon name="github" size={30} /></Text>
      </View>
    </>
  );
}
