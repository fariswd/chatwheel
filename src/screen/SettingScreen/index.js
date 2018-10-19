import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  AsyncStorage,
} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';
import Sound from 'react-native-sound';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import setup from '../../constant/setup'
import tracklist from '../../constant/tracklist'

export default class SettingScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Settings',
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            navigation.dispatch(resetAction);
          }}
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
  constructor() {
    super()
    this.state = {
      wheels: false
    }
  }
  componentDidMount() {
    //get from async storage
    this.getData()
  }
  componentWillUnmount() {
    //set async storage
    this.putData()
  }
  getData = async () => {
    try {
      const wheels = await AsyncStorage.getItem('wheels');
      if (wheels !== null) {
        this.setState({
          wheels: JSON.parse(wheels)
        })
      } else {
        // using default
        this.setState({
          wheels: setup
        })
      }
    } catch (error) {
      // using default
      this.setState({
        wheels: setup
      })
    }
  }
  putData = async () => {
    try {
      await AsyncStorage.setItem('wheels', JSON.stringify(this.state.wheels));
    } catch (error) {
      
    }
  }
  play = (key) => {
    if (tracklist[key]) {
      const url = tracklist[key].url
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
    this.props.navigation.navigate('Choose', {
      keyName: key,
      position: pos,
      updateState: (position, trackName) => {
        const wheels = { ...this.state.wheels }
        wheels[position] = trackName
        this.setState({ wheels })
      }
    })
  }
  render() {
    const { wheels } = this.state
    return (
      <View style={styles.container}>
        <ScrollView>
          {wheels && (<View style={styles.content}>
            {Object.keys(wheels).map((pos, i) => (
              <View key={`${i}`} style={styles.lists}>
                <View>
                  <Text style={styles.title}>Position {pos}:</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 2 }}>
                    <Text>{tracklist[wheels[pos]].name}</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => this.play(wheels[pos])}
                      style={{ paddingHorizontal: 5 }}>
                      <FontAwesome style={{ fontSize: 18, color: '#666' }}>{Icons.play}</FontAwesome>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.change(pos, wheels[pos])}
                      style={{ paddingHorizontal: 5 }}>
                      <FontAwesome style={{ fontSize: 18, color: '#666' }}>{Icons.refresh}</FontAwesome>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>)}
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
    height: 60,
  },
  title: {
    fontSize: 10,
  }
})