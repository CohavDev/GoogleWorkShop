import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import BackgroundImage from "../components/BackgroungImage";
import colors from "../config/colors";
import { color } from "react-native-reanimated";
export default function LandPage({ navigation }) {
  const onLoginPress = () => {
    navigation.navigate("LoginScreen");
  };
  return (
    <ImageBackground
      style={styles.backgroundImage}
      resizeMode="cover"
      source={require("../assets/LandPageBackground.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/TravelPartnerLogo1.jpg")}
          style={styles.logoImage}
        />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text1}>Find travel partners, and make life-time friendships</Text>
        <Text style={styles.text2}>
          Travel Partner helps you to find the perfect partner for your travels.
        </Text>
        <Text style={styles.text2}>Find your Travel Partner now!</Text>
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Let's go!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    flex: 1,
    // flexDirection: "row",
    // resizeMode: "cover",
  },
  logoContainer: {
    flexDirection: "column",
    flex: 2,
    width: "100%",
    height: undefined,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
    // padding: 20,
  },
  logoImage: {
    height: 140,
    width: "100%",
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: "5%",
  },
  text1: {
    fontSize: 24,
    color: "white",
  },
  text2: {
    fontSize: 16,
    color: "white",
    paddingTop: 10,
  },
  textBox: {
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    flex: 1,
  },
  button: {
    backgroundColor: "white",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
  },
  buttonTitle: {
    color: colors.Secondary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
