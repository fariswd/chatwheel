/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Gestures from 'react-native-easy-gestures';
import Sound from 'react-native-sound';

type Props = {};
export default class App extends Component<Props> {
  playTrack = (url) => {
    const track = new Sound(url, null, (e) => {
      if (e) {
        console.log('error loading track:', e)
      } else {
        track.play()
      }
    })
  }
  onEnd = (event, styles) => {
    //top
    if(styles.top < -60) this.playTrack('https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/b/bb/Chat_wheel_2018_ta_daaaa.mp3')
    //bottom
    if(styles.top > 60) this.playTrack('https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/6/60/Chat_wheel_2018_next_level.mp3')
    //left
    if(styles.left < -60) this.playTrack('https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/7/73/Chat_wheel_2018_echo_slama_jama.mp3')
    //right
    if(styles.left > 60) this.playTrack('https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/1/13/Chat_wheel_2018_easiest_money.mp3')
    this.gestures.reset()
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Lakad Matataaag! Normalin, Normalin.</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={{textAlign: 'right'}}>Echo Slamma Jamma!</Text>
          </View>
          <View style={{
            flex: 1,
            width: 100,
            height: 100,
            borderRadius: 125,
            margin: 10,
            backgroundColor: 'lightsalmon',
            justifyContent: 'center',
            alignItems: 'center'
            }}>
            <Gestures
              ref={ref => this.gestures = ref}
              onEnd={this.onEnd}>
              <View style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                backgroundColor: 'coral'
              }}/>
            </Gestures>
          </View>
          <View style={{flex: 1}}>
            <Text>Easiest money of my life!</Text>
          </View>
        </View>
        <Text>The next level play!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
