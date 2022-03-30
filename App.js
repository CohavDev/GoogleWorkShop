import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import HomeScreen from "./app/screens/HomeScreen";
import MyActivities from "./app/screens/MyActivities";
import ProfileMatching from "./app/screens/ProfileMatching";
import WelcomeBackScreen from "./app/screens/WelcomeBackScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen1";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <HomeScreen /> */}
      <MyActivities />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
});
