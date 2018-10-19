import React from 'react'
import { createStackNavigator } from 'react-navigation'

import IndexScreen from '../screen/IndexScreen'
import SettingScreen from '../screen/SettingScreen'
import ChooseScreen from '../screen/ChooseScreen'

const stacks = {
  Home: {
    screen: IndexScreen,
  },
  Setting: {
    screen: SettingScreen,
  },
  Choose: {
    screen: ChooseScreen,
  }
}

const stacksOpts = {}

const RootNavigation = createStackNavigator(stacks, stacksOpts)

export default RootNavigation