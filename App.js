import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import HomeScreen from "./app/screens/HomeScreen";
import ProfileMatching from "./app/screens/ProfileMatching";
import ChooseActivity from "./app/screens/ChooseActivity";
import WelcomeBackScreen from "./app/screens/WelcomeBackScreen";
import MatchesScreen from "./app/screens/MatchesScreen";

export default function App() {
  return (
    <View>
      <ChooseActivity />
    </View>
  );
}
