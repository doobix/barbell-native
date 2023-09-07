import { useState } from 'react';
import { View } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import PercentageResults from './PercentageResults';

export default PercentageView = (props) => {
  const [inputWeight, setInputWeight] = useState(props.inputOneRepMaxWeight.toString());

  return (
    <>
      <Card>
        <Card.Content>
          <TextInput
            label="One rep max weight"
            value={inputWeight}
            onChangeText={setInputWeight}
            keyboardType="numeric"
          />
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => props.onPressCalculate(inputWeight)}>
            Calculate Percentages
          </Button>
        </Card.Actions>
      </Card>
      <View style={{ marginTop: 20 }}>
        <PercentageResults
          calculatedOneRepMaxWeights={props.calculatedOneRepMaxWeights}
          changeView={props.changeView}
          isPercentagesCalculated={props.isPercentagesCalculated}
          setWeightAndCalculate={props.setWeightAndCalculate}
        />
      </View>
    </>
  );
}
