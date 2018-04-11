import React from 'react';
import { StyleSheet, View } from 'react-native';
import KeyPad from './KeyPad';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <KeyPad />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
