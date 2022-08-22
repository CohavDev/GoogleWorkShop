import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../config/colors";
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
        <Text style={styles.text1}>Find travel partners</Text>
        <Text style={styles.text1}>Make life-time friendships</Text>

        <Text style={styles.text2}>
          Travel Partner helps you find the perfect partner for your travels.
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
  },
  logoContainer: {
    flexDirection: "column",
    flex: 2,
    width: "100%",
    height: undefined,
    alignItems: "center",
    alignSelf: "center",
  },
  logoImage: {
    height: "60%",
    width: "100%",
    alignSelf: "center",
    resizeMode: "contain",
  },
  text1: {
    fontSize: 20,
    color: "white",
  },
  text2: {
    fontSize: 16,
    color: "white",
    paddingTop: "3%",
  },
  textBox: {
    paddingLeft: "5%",
    paddingRight: "5%",
    width: "100%",
    bottom: "5%",
    flex: 1,
  },
  button: {
    backgroundColor: "white",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "5%",
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
