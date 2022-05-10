import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigator from "./app/routes/WelcomeBackScreenStack";
import { decode, encode } from "base-64";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./app/firescreens";
import MyActivities from "./app/screens/MyActivities";
import ProfileMatching from "./app/screens/ProfileMatching";
import ChooseActivityBubbles from "./app/screens/ChooseActivityBubbles";
import MainMenu from "./app/screens/MainMenu";
import MatchesScreen from "./app/screens/MatchesScreen";
import NewActivityForm from "./app/screens/NewActivityForm.js";
import ApproveActivity from "./app/screens/ApproveActivity";
import BubblesCategories from "./app/screens/BubblesCategories";
import ChooseOutdoorsActivity from "./app/screens/ChooseOutdoorsActivity";
import ChooseIndoorsActivity from "./app/screens/ChooseIndoorsActivity";

const Stack = createNativeStackNavigator();
export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName={user ? "MainMenu" : "LoginScreen"}>
    //     <Stack.Screen name="MainMenu">
    //       {(props) => <MainMenu {...props} extraData={user} />}
    //     </Stack.Screen>
    //     <Stack.Screen name="LoginScreen" component={LoginScreen} />
    //     <Stack.Screen
    //       name="RegistrationScreen"
    //       component={RegistrationScreen}
    //     />
    //     <Stack.Screen
    //       name="ChooseActivityBubbles"
    //       component={ChooseActivityBubbles}
    //     />
    //     <Stack.Screen name="MyActivities" component={MyActivities} />
    //     <Stack.Screen name="NewActivityForm" component={NewActivityForm} />
    //     <Stack.Screen name="ApproveActivity" component={ApproveActivity} />
    //     <Stack.Screen name="MatchesScreen" component={MatchesScreen} />
    //     <Stack.Screen name="ProfileMatching" component={ProfileMatching} />
    //   </Stack.Navigator>
    // </NavigationContainer>


    <NavigationContainer>
       <Stack.Navigator initialRouteName={user ? "MainMenu" : "LoginScreen"}>
        <Stack.Screen name="MainMenu">
          {(props) => <MainMenu {...props} extraData={user} />}
        </Stack.Screen>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <Stack.Screen
          name="BubblesCategories"
          component={BubblesCategories}
        />
        <Stack.Screen name="MyActivities" component={MyActivities} />
        <Stack.Screen name="NewActivityForm" component={NewActivityForm} />
        <Stack.Screen name="ApproveActivity" component={ApproveActivity} />
        <Stack.Screen name="MatchesScreen" component={MatchesScreen} />
        <Stack.Screen name="ProfileMatching" component={ProfileMatching} />
        <Stack.Screen name="ChooseOutdoorsActivity" component={ChooseOutdoorsActivity} />
        <Stack.Screen name="ChooseIndoorsActivity" component={ChooseIndoorsActivity} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  if (loading) {
    return <></>;
  }

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
