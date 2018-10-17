import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class SettingScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Settings',
      headerTransparent: true,
      headerStyle: {
        borderBottomWidth: 0,
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>this is settings</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 57,
  }
})