import React from 'react';
import { Container, Content, Header, Body, Title, Form, Item, Label, Input, Button, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { StyleSheet, View } from 'react-native';
import KeyPad from './KeyPad';

export default class App extends React.Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Barbell Weight Calculator</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel last>
              <Label>Target barbell weight</Label>
              <Input keyboardType='numeric' />
            </Item>
          </Form>
          <View style={styles.calculateButton}>
            <Button primary>
              <Text>Calculate!</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  calculateButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
