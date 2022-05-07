import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigator from "./app/routes/WelcomeBackScreenStack";
import {decode, encode} from 'base-64';
import { LoginScreen, HomeScreen, RegistrationScreen } from './app/firescreens'
//import HomeScreen from "./hila/HomeScreen";
import MyActivities from "./app/screens/MyActivities";
import ProfileMatching from "./app/screens/ProfileMatching";
import ChooseActivityBubbles from "./app/screens/ChooseActivityBubbles";
import MainMenu from "./app/screens/MainMenu";
import MatchesScreen from "./app/screens/MatchesScreen";
import NewActivityForm from "./app/screens/NewActivityForm.js";
import ApproveActivity from "./app/screens/ApproveActivity";

const Stack = createNativeStackNavigator();
export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>

    // <MatchesScreen />

    // <NavigationContainer>
    //    <Stack.Navigator>
    //       <Stack.Screen name="ChooseActivity" component={MyActivities} />
    //       <Stack.Screen name="profileMatching" component={ProfileMatching} />
    //    </Stack.Navigator>
    // </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
