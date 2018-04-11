import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default class KeyPad extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          {this.renderButton('7')}
          {this.renderButton('8')}
          {this.renderButton('9')}
        </View>
        <View style={styles.row}>
          {this.renderButton('4')}
          {this.renderButton('5')}
          {this.renderButton('6')}
        </View>
        <View style={styles.row}>
          {this.renderButton('1')}
          {this.renderButton('2')}
          {this.renderButton('3')}
        </View>
        <View style={styles.row}>
          {this.renderButton()}
          {this.renderButton('0')}
          {this.renderButton()}
        </View>
      </View>
    );
  }

  renderButton = (number) => {
    const button = number ? (
      <Button
        onPress={() => this.onPressTest(number)}
        title={number}
        accessibilityLabel={number}
      />
    ) : null;

    return (
      <View style={styles.button}>
        {button}    
      </View>
    );
  }

  onPressTest = (value) => {
    console.log('test!', value);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
  },
});
