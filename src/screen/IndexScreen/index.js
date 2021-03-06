import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Gestures from 'react-native-easy-gestures';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Sound from 'react-native-sound';

import TextWheel from './component/TextWheel'
import trackList from '../../constant/tracklist'
import setup from '../../constant/setup'

const {height, width} = Dimensions.get('window');

export default class IndexScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate('Setting')}
          style={{paddingHorizontal: 20}}>
          <FontAwesome style={{ fontSize: 20, color: 'white' }}>{Icons.cog}</FontAwesome>
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
      status: false,
      position: false,
      wheels: false,
      errorMsg: false,
    }
  }
  componentDidMount() {
    this.getData()
  }
  getData = async () => {
    try {
      const wheels = await AsyncStorage.getItem('wheels')
      if (wheels !== null) {
        this.setState({
          wheels: JSON.parse(wheels)
        })
      } else {
        this.setState({
          wheels: setup
        })
      }
    } catch (error) {
      this.setState({
        wheels: setup
      })
    }
  }
  playTrack = (status) => {
    const { wheels } = this.state
    if (status) {
      const url = trackList[wheels[status]].url
      const track = new Sound(url, null, (e) => {
        if (e) {
          console.log('error loading track:', e)
        } else {
          track.play()
        }
      })
    }
  }
  getPosition = (styles) => {
    let position = ''
    if(styles.top < -50) position = position+'top'
    if(styles.top > 50) position = position+'bottom'
    if(styles.left < -50) position = position+'left'
    if(styles.left > 50) position = position+'right'
    return position
  }
  onEnd = (event, styles) => {
    const position = this.getPosition(styles)
    this.playTrack(position)
    this.reset()
  }
  onChange = (event, styles) => {
    const position = this.getPosition(styles)
    this.setState({position})
  }
  reset = () => {
    this.gestures.reset()
    this.setState({position: ''})
  }
  render() {
    const { wheels } = this.state
    return (
      <View style={styles.container}>
        <ImageBackground resizeMode="cover" source={{uri: 'background'}} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {wheels && <View style={{height: 200, width: width}}>
            <TextWheel pos="top" state={this.state} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <TextWheel pos="topleft" state={this.state} />
                <TextWheel pos="left" state={this.state} />
                <TextWheel pos="bottomleft" state={this.state} />
              </View>
              <View style={{flex: 1.5, justifyContent: 'center', alignItems: 'center', padding: 10}}>
                <View style={styles.outterPad}>
                  <Gestures
                    ref={ref => this.gestures = ref}
                    onEnd={this.onEnd}
                    onChange={this.onChange}
                    >
                      <View style={styles.innerPad}>
                        <View style={styles.corePad}/>
                      </View>
                  </Gestures>
                </View>
              </View>
              <View style={{flex: 1}}>
                <TextWheel pos="topright" state={this.state} />
                <TextWheel pos="right" state={this.state} />
                <TextWheel pos="bottomright" state={this.state} />
              </View>
            </View>
            <TextWheel pos="bottom" state={this.state} />
          </View>}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  outterPad: {
    width: 120,
    height: 120,
    borderRadius: 125,
    margin: 10,
    backgroundColor: 'rgba(105,105,105, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  }, 
  innerPad: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  corePad: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0, 0.7)'
  },
});