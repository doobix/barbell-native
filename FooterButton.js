import React from 'react';
import { Button, Icon, Text } from 'native-base';

export default class FooterButton extends React.Component {
  render() {
    const word = this.props.word;
    return (
      <Button
        vertical
        active={this.props.currentView === word.toLowerCase()}
        onPress={() => this.props.onPress(word.toLowerCase())}
      >
        {this.wordToIcon(word)}
        <Text>{word}</Text>
      </Button>
    );
  }

  wordToIcon = (word) => {
    word = word.toLowerCase();
    if (word === 'plates') {
      return <Icon type='MaterialIcons' name={'fitness-center'} />;
    } else if (word === 'settings') {
      return <Icon type='MaterialCommunityIcons' name={'settings'} />;
    } else if (word === 'percentage') {
      return <Icon type='MaterialCommunityIcons' name={'percent'} />;
    }
  }
}
