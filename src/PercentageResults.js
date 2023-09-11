import { View } from 'react-native';
import { Card, List, Text } from 'react-native-paper';

export const NO_PERCENTAGE_MESSAGE = 'Please add a valid one rep max weight and press Calculate Percentages.';
export const MAX_PERCENTAGES_MESSAGE = 'Max percentages:'

export default PercentageResults = (props) => {
  if (!props.isPercentagesCalculated) {
    return null;
  }

  if (
    props.calculatedOneRepMaxWeights.length === 0
    || !props.calculatedOneRepMaxWeights.filter((percentage) => percentage.weight).length
  ) {
    return (
      <View style={{ marginBottom: 20 }}>
        <Card>
          <Card.Content>
            <Text style={{ color: 'green' }}>
              {NO_PERCENTAGE_MESSAGE}
            </Text>
          </Card.Content>
        </Card>
      </View>
    );
  }

  let percentageElements = [];
  props.calculatedOneRepMaxWeights.forEach((percentObj, idx) => {
    const percentage = `@ ${percentObj.percentage} = ${percentObj.weight} lbs`;
    const setWeightAndChangeView = () => {
      props.setWeightAndCalculate(`${percentObj.weight}`);
      props.changeView(0); // plates view
    }
    percentageElements.push(
      <List.Item
        key={idx}
        onPress={setWeightAndChangeView}
        title={percentage}
        testID="percentage-result"
      />
    );
  });

  return (
    <Card>
      <Card.Title title={MAX_PERCENTAGES_MESSAGE} />
      {percentageElements}
    </Card>
  );
}
