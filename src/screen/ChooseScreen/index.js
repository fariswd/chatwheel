import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import tracklist from '../../constant/tracklist'
import Sound from 'react-native-sound';

export default class SettingScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Choose Tracklist',
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: 20 }}>
          <FontAwesome style={{ fontSize: 20, color: 'black' }}>{Icons.arrowLeft}</FontAwesome>
        </TouchableOpacity>
      ),
      headerTransparent: true,
      headerStyle: {
        borderBottomWidth: 0,
      }
    }
  }
  play = (key) => {
    if (key) {
      const { url } = key
      const track = new Sound(url, null, (e) => {
        if (e) {
          console.log('error loading track:', e)
        } else {
          track.play()
        }
      })
    }
  }
  change = (pos, key) => {
    const { updateState } = this.props.navigation.state.params
    updateState(pos, key)
    this.props.navigation.goBack()
  }
  render() {
    const { position } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
          {Object.keys(tracklist).map((key, i) => (
            <View key={`${i}`} style={styles.lists}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 2 }}>
                  <Text>{tracklist[key].name}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => this.play(tracklist[key])}
                    style={{ paddingHorizontal: 5 }}>
                    <FontAwesome style={{ fontSize: 18, color: '#666' }}>{Icons.play}</FontAwesome>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.change(position, key)}
                    style={{ paddingHorizontal: 5 }}>
                    <FontAwesome style={{ fontSize: 18, color: '#666' }}>{Icons.check}</FontAwesome>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          </View>
        </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 57,
  },
  content: {
    paddingHorizontal: 10,
  },
  lists: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 5,
    height: 50,
  },
})