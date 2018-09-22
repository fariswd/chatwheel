import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import IndexScreen from './src/screen/IndexScreen'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <IndexScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
