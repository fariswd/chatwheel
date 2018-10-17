import React from 'react'
import { createStackNavigator } from 'react-navigation'

import IndexScreen from '../screen/IndexScreen'
import SettingScreen from '../screen/SettingScreen'

const stacks = {
  Home: {
    screen: IndexScreen,
  },
  Setting: {
    screen: SettingScreen,
  }
}

const stacksOpts = {}

const RootNavigation = createStackNavigator(stacks, stacksOpts)

export default RootNavigation