import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileMatching from "../screens/ProfileMatching";
import MyActivities from "../screens/MyActivities";

import { IconButton } from "react-native-paper";
import { HomeScreen } from "../firescreens";

const Tab = createBottomTabNavigator();
function Tabs(props) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "red",
          height: 90,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="home-outline"
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileMatching}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="account-circle-outline"
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="activities"
        component={MyActivities}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="format-list-checkbox"
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="notifications"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="bell-outline"
              color="black"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: "red",
  },
});

export default Tabs;