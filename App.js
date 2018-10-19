import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import IndexScreen from './src/screen/IndexScreen'
import RootNavigation from './src/navigation/RootNavigation'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RootNavigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
