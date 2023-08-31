import { useState } from 'react';
import { View } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import PlateResults from './PlateResults';

export default PlateView = (props) => {
  const [inputWeight, setInputWeight] = useState(props.inputWeight);

  return (
    <>
      <Card>
        <Card.Content>
          <TextInput
            label="Target barbell weight"
            value={inputWeight}
            onChangeText={setInputWeight}
            keyboardType="numeric"
          />
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => props.onPressCalculate(inputWeight)}>
            Calculate Plates
          </Button>
        </Card.Actions>
      </Card>
      <View style={{ marginTop: 20 }}>
        <PlateResults
          calculatedWeights={props.calculatedWeights}
          calculatedWeight={props.calculatedWeight}
          isWeightsCalculated={props.isWeightsCalculated}
          leftoverWeight={props.leftoverWeight}
        />
      </View>
    </>
  );
}
