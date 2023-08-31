import { View } from 'react-native';
import { Card, List, Text } from 'react-native-paper';

export const NO_WEIGHT_MESSAGE = 'Please add a valid target barbell weight and press Calculate!';
export const LEFTOVER_WEIGHT_MESSAGE = 'Note: No weights available to add {leftoverWeight} lbs. Calculating {calculatedWeight} lbs instead.';
export const ADD_WEIGHT_MESSAGE = 'Weights per side:'

export default PlateResults = (props) => {
  if (!props.isWeightsCalculated) {
    return null;
  }

  if (props.calculatedWeights.length === 0) {
    return (
      <Card>
        <Card.Content>
          <Text style={{ color: 'green' }}>
            {NO_WEIGHT_MESSAGE}
          </Text>
        </Card.Content>
      </Card>
    );
  }

  let weightElements = [];
  props.calculatedWeights.forEach((weightObj, idx) => {
    const weight = `${weightObj.count} x ${weightObj.weight} lbs`;
    weightElements.push(
      <List.Item
        key={idx}
        title={weight}
      />
    );
  });

  let leftoverWeightElement = null;
  if (props.leftoverWeight) {
    leftoverWeightElement = (
      <View style={{ marginBottom: 20 }}>
        <Card>
          <Card.Content bordered>
            <Text style={{ color: 'green' }}>
              {LEFTOVER_WEIGHT_MESSAGE
                .replace('{leftoverWeight}', props.leftoverWeight)
                .replace('{calculatedWeight}', props.calculatedWeight)
              }
            </Text>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <>
      {leftoverWeightElement}
      <Card>
        <Card.Title title={ADD_WEIGHT_MESSAGE} />
        {weightElements}
      </Card>
    </>
  );
}
