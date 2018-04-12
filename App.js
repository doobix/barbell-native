import React from 'react';
import { Container, Content, Header, Body, Title } from 'native-base';
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
          <KeyPad />
        </Content>
      </Container>
    );
  }
}
