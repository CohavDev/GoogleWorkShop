import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigator from "./app/routes/WelcomeBackScreenStack";
import HomeScreen from "./app/screens/HomeScreen";
import MyActivities from "./app/screens/MyActivities";
import ProfileMatching from "./app/screens/ProfileMatching";
import ChooseActivity from "./app/screens/ChooseActivity";
import WelcomeBackScreen from "./app/screens/WelcomeBackScreen";
import MatchesScreen from "./app/screens/MatchesScreen";
import NewActivity from "./app/screens/NewActivity.js";
import ApproveActivity from "./app/screens/ApproveActivity";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Navigator />

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
