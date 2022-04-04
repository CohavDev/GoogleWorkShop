import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigator from "./app/routes/WelcomeBackScreenStack";

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
