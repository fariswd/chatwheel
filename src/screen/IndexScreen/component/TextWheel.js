import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import trackList from '../../../constant/tracklist'
import setup from '../../../constant/setup'

export default ({pos, state}) => {
  const {position} = state
  switch (pos) {
    case 'top':
      return (
        <View style={{flexWrap: 'wrap', height: 20}}>
          <Text style={[
            styles.textNormal,
            {
              textAlign: 'center'
            },
            position == pos && styles.selected,
            ]}>
            {trackList[setup[pos]].name}
          </Text>
        </View>
      )
    case 'topleft':
      return (
        <View style={styles.textContainer}>
          <Text style={[
            styles.textNormal,
            {
              textAlign: 'right',
              marginRight: -20,
              justifyContent: 'center'
            },
            position == pos && styles.selected
            ]}>
              {trackList[setup[pos]].name}
          </Text>
        </View>
      )
    case 'left':
      return (
        <View style={styles.textContainer}>
          <Text style={[
            styles.textNormal,
            {
              textAlign: 'right',
              justifyContent: 'center',
            },
            position == 'left' && styles.selected
            ]}>
              {trackList[setup[pos]].name}
          </Text>
        </View>
      )
    case 'bottomleft':
      return (
        <View style={styles.textContainer}>
          <Text style={[
            styles.textNormal,
            {
              textAlign: 'right',
              marginRight: -20,
              justifyContent: 'center',
            },
            position == pos && styles.selected
            ]}>
              {trackList[setup[pos]].name}
          </Text>
        </View>
      )
    case 'topright':
      return (
        <View style={styles.textContainer}>
          <Text style={[
            styles.textNormal,
            {
              marginLeft: -20,
            },
            position == pos && styles.selected
            ]}>
              {trackList[setup[pos]].name}
          </Text>
        </View>
      )
    case 'right':
      return (
        <View style={styles.textContainer}>
          <Text style={[
            styles.textNormal,
            {},
            position == pos && styles.selected]}>
              {trackList[setup[pos]].name}
          </Text>
        </View>
      )
    case 'bottomright':
      return (
        <View style={styles.textContainer}>
          <Text style={[
            styles.textNormal,
            {
              marginLeft: -20
            },
            position == pos && styles.selected
            ]}>
              {trackList[setup[pos]].name}
          </Text>
        </View>
      )
    case 'bottom':
      return (
        <View style={{flexWrap: 'wrap', height: 20}}>
          <Text style={[
            styles.textNormal,
            {textAlign: 'center'}, position == pos && styles.selected]}>
            {trackList[setup[pos]].name}
          </Text>
        </View>
      )
    default:
      return null
  }
}

const styles = StyleSheet.create({
  selected: {
    fontWeight: '600',
    fontSize: 13,
    color: 'white',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textNormal: {
    fontSize: 10,
    color: 'white',
  }
});