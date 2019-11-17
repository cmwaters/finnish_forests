import React from "react";
import { Text, View, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'List',
  };
  render() {
    return (
      <View style={{ flex: 1, margin: 40}}>
        <Text>The list of routes!{"\n"}{"\n"}
        </Text>
      </View>
    );
  }
}