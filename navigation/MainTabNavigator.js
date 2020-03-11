import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { BottomNavigation, Text } from 'react-native-paper';


export default class MainTabNavigator extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'items', title: 'Items', icon: 'hanger', color: '#3F51B5'},
      { key: 'challenges', title: 'Challenges', icon: 'controller-classic',color: '#009688' },
      { key: 'stats', title: 'Stats', icon: 'clipboard',color: '#795548' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    challenges: LinksScreen,
    items: HomeScreen,
    stats: SettingsScreen,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}
