import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigator from "./app/routes/WelcomeBackScreenStack";
import { decode, encode } from "base-64";
import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  MoreInfo1Screen,
  MoreInfo2Screen,
} from "./app/firescreens";

import MyActivities from "./app/screens/MyActivities";
import ProfileMatching from "./app/screens/ProfileMatching";
import ChooseActivityBubbles from "./app/screens/ChooseActivityBubbles";
import MainMenu from "./app/screens/MainMenu";
import MatchesScreen from "./app/screens/MatchesScreen";
import NewActivityForm from "./app/screens/NewActivityForm";
import ApproveActivity from "./app/screens/ApproveActivity";
import BubblesCategories from "./app/screens/BubblesCategories";
import ChooseOutdoorsActivity from "./app/screens/ChooseOutdoorsActivity";
import ChooseIndoorsActivity from "./app/screens/ChooseIndoorsActivity";
import NewHomeScreen from "./hila/NewHomeScreen";
import LandPage from "./app/screens/LandPage";
import NewActivitiesScreen from "./hila/NewActivitiesScreen";
import NewNewActivityForm from "./hila/NewNewActivityForm";
import NewBubblesCategories from "./hila/NewBubblesCategories";
import NewApproveActivity from "./hila/NewApproveActivity";
import Tabs from "./app/navigation/Tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconButton, Colors } from "react-native-paper";
import { I18nManager } from "react-native"; // force left to right layout of app
import { firebase } from "./app/firebase/config";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  console.log("hello app2.js");
  // Left to right layout force
  I18nManager.forceRTL(false);
  I18nManager.allowRTL(false);
  // the basic code to connect the firebase to the app was taken from: https://www.freecodecamp.org/news/react-native-firebase-tutorial/

  // this commented out code should guerentee that a loged in user
  // wont need to login each time he/she enters the app. it still doesnt work
  // properly, and thus its commented out
  // the code was taken from the tutotrial at: https://www.freecodecamp.org/news/react-native-firebase-tutorial/
  // if (loading) {
  //   return <></>;
  // }

  // useEffect(() => {
  //   const usersRef = firebase.firestore().collection("users");
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       usersRef
  //         .doc(user.uid)
  //         .get()
  //         .then((document) => {
  //           const userData = document.data();
  //           setLoading(false);
  //           setUser(userData);
  //         })
  //         .catch((error) => {
  //           setLoading(false);
  //         });
  //     } else {
  //       setLoading(false);
  //     }
  //   });
  // }, []);
  const [authenticated, setAuthenticated] = useState(true);

  //TODO: continue from here
  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
        console.log("authenticated: ");
        console.log(user);
        setUser(user);
      } else {
        setAuthenticated(false);
      }
    });
  }, []);
  console.log("newHomeScreen : ");
  console.log(user);
  return <NavigationContainer>{InitialNavigation(user)}</NavigationContainer>;
}

function TabsNav(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "rgb(52, 175, 183)",
        tabBarInactiveTintColor: "gray",
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          // backgroundColor: "red",
          height: 90,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        // style={{ color: "black" }}
        component={MainNavigation}
        props={props.user}
        options={{
          tabBarOptions: {
            activeTintColor: "rgb(52, 175, 183)",
            inactiveTintColor: "#fff",
            // Colors: "red",
          },
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="home-outline"
              // color="#BFD9CD"
              // color="rgb(52, 175, 183)"
              // size={12}
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
              // color="#BFD9CD"
              color="black"
              // size={12}
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
              icon="account-outline"
              // color="#BFD9CD"
              color="black"
              // size={12}
            />
          ),
        }}
      />

      <Tab.Screen
        name="settings"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="cog-outline"
              // color="#BFD9CD"
              color="black"
              // size={12}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function MainNavigation(props) {
  // const StackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen
					name="Tabs"
					component={Tabs}
					options={{ headerShown: false }}
				/> */}
      <Stack.Screen name="MainMenu">
        {(props) => <NewHomeScreen {...props} extraData={props.user} />}
      </Stack.Screen>
      {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
      {/* <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} /> */}
      <Stack.Screen name="MoreInfo1Screen" component={MoreInfo1Screen} />
      <Stack.Screen name="MoreInfo2Screen" component={MoreInfo2Screen} />

      {/* <Stack.Screen name="BubblesCategories" component={BubblesCategories} /> */}
      <Stack.Screen name="MyActivities" component={MyActivities} />
      {/* <Stack.Screen name="NewActivityForm" component={NewActivityForm} /> */}
      {/* <Stack.Screen name="NewApproveActivity" component={NewApproveActivity} /> */}
      <Stack.Screen name="MatchesScreen" component={MatchesScreen} />
      <Stack.Screen name="ProfileMatching" component={ProfileMatching} />
      <Stack.Screen
        name="ChooseOutdoorsActivity"
        component={ChooseOutdoorsActivity}
      />
      <Stack.Screen
        name="ChooseIndoorsActivity"
        component={ChooseIndoorsActivity}
      />

      {/* <Stack.Screen name="NewHomeScreen" component={NewHomeScreen} /> */}
      <Stack.Screen
        name="NewBubblesCategories"
        component={NewBubblesCategories}
      />
      <Stack.Screen name="NewApproveActivity" component={NewApproveActivity} />
      <Stack.Screen
        name="NewActivitiesScreen"
        component={NewActivitiesScreen}
      />
      <Stack.Screen name="NewNewActivityForm" component={NewNewActivityForm} />
    </Stack.Navigator>
  );
}
function InitialNavigation(user) {
  return (
    <Stack.Navigator
      initialRouteName={user ? "Tabs" : "LandPage"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LandPage" component={LandPage} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      <Stack.Screen name="Tabs" component={TabsNav} props={user} />
      <Stack.Screen name="MoreInfo2Screen" component={MoreInfo2Screen} />
      <Stack.Screen name="MoreInfo1Screen" component={MoreInfo1Screen} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
