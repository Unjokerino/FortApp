import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomNavigation, Text, Appbar } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./MainTabNavigator";
import DetailItemsScreen from "../screens/DetailItemsScreen";
import HomeScreen from "../screens/HomeScreen";


const Stack = createStackNavigator();

export default function StuckNaviagtor(){

    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              options={{
                  headerShown: false
              }}
              name="Home"
              component={MainTabNavigator}
          />
          <Stack.Screen
              options={{
                  headerShown: true
              }}
              name="DetailItemsScreen"
              component={HomeScreen}
          />
          </Stack.Navigator>
    </NavigationContainer>
    )
}

