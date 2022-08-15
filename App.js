import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  NavigationContainer,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigator from "./app/routes/WelcomeBackScreenStack";
import { decode, encode } from "base-64";
import {
  LoginScreen,
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
import HomeScreen from "./app/screens/HomeScreen";

import LandPage from "./app/screens/LandPage";
import ActivitiesScreen from "./app/screens/ActivitiesScreen";
import OccurringActivityPreview from "./app/screens/OccurringActivityPreview";
import UploadedActivityPreview from "./app/screens/UploadedActivityPreview";
import Tabs from "./app/navigation/Tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconButton, Colors } from "react-native-paper";
import { I18nManager } from "react-native"; // force left to right layout of app
import { firebase } from "./app/firebase/config";
import colors from "./app/config/colors";
import { getAuth, signOut } from "firebase/auth";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
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
  // const [authenticated, setAuthenticated] = useState(false);
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
  return (
    // <NavigationContainer>{InitialNavigation({ user })}</NavigationContainer>
    <NavigationContainer>
      {!authenticated ? (
        <InitialNavigation user={user} auth={authenticated} />
      ) : (
        <TabsNav user={user} />
      )}
    </NavigationContainer>
  );
}

function TabsNav(props) {
  // this function logs user out
  const logoutFunc = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // props.navigation.popToTop();
        // props.navigation.navigate("LoginScreen");
        // navigate to login-screen
      })
      .catch((error) => alert(error));
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.TabBar },
        tabBarActiveTintColor: colors.Secondary,
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
            activeTintColor: colors.TabBarText,
            inactiveTintColor: colors.TabBarText,
            // Colors: "red",
          },
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="home-outline"
              // color="#BFD9CD"
              color={colors.TabBarText}
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
              color={colors.TabBarText}
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
              color={colors.TabBarText}
              // size={12}
            />
          ),
        }}
      />

      <Tab.Screen
        name="logout"
        component={HomeScreen}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            // logout current user
            logoutFunc();
          },
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="logout"
              // color="#BFD9CD"
              color={colors.TabBarText}
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
        animation: "slide_from_right",
      }}
    >
      {/* <Stack.Screen
					name="Tabs"
					component={Tabs}
					options={{ headerShown: false }}
				/> */}
      <Stack.Screen name="MainMenu">
        {(props) => <HomeScreen {...props} extraData={props.user} />}
      </Stack.Screen>
      {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
      {/* <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} /> */}
      <Stack.Screen name="MoreInfo1Screen" component={MoreInfo1Screen} />
      <Stack.Screen name="MoreInfo2Screen" component={MoreInfo2Screen} />

      {/* <Stack.Screen name="ActivityPreview" component={ActivityPreview} /> */}

      <Stack.Screen
        name="OccurringActivityPreview"
        component={OccurringActivityPreview}
      />
      <Stack.Screen
        name="UploadedActivityPreview"
        component={UploadedActivityPreview}
      />

      {/* <Stack.Screen name="BubblesCategories" component={BubblesCategories} /> */}
      <Stack.Screen name="MyActivities" component={MyActivities} />
      {/* <Stack.Screen name="NewActivityForm" component={NewActivityForm} /> */}
      {/* <Stack.Screen name="ApproveActivity" component={ApproveActivity} /> */}
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

      {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
      <Stack.Screen
        options={{ animation: "slide_from_bottom" }}
        name="BubblesCategories"
        component={BubblesCategories}
      />
      <Stack.Screen name="ApproveActivity" component={ApproveActivity} />
      <Stack.Screen name="ActivitiesScreen" component={ActivitiesScreen} />
      <Stack.Screen name="NewActivityForm" component={NewActivityForm} />
    </Stack.Navigator>
  );
}
function InitialNavigation(props) {
  return (
    <Stack.Navigator
      initialRouteName={props.auth ? "Tabs" : "LandPage"}
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="LandPage" component={LandPage} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      {/* <Stack.Screen name="Tabs" component={TabsNav} props={props.user} /> */}
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
