import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigator from "./app/routes/WelcomeBackScreenStack";
import HomeScreen from "./hila/HomeScreen";
import MyActivities from "./app/screens/MyActivities";
import ProfileMatching from "./app/screens/ProfileMatching";
import ChooseActivityBubbles from "./app/screens/ChooseActivityBubbles";
import MainMenu from "./app/screens/MainMenu";
import MatchesScreen from "./app/screens/MatchesScreen";
import NewActivityForm from "./app/screens/NewActivityForm.js";
import ApproveActivity from "./app/screens/ApproveActivity";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Navigator />
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
