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
      </View>
      <View style={styles.buttonContainer}>
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
    // flex: 2,
    width: "100%",
    height: "20%",
    marginTop: "15%",
    alignItems: "center",
    alignSelf: "center",
    // borderColor: "yellow",
    // borderWidth: 3,
  },
  logoImage: {
    // height: "60%",
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
    // borderWidth: 3,
    // borderColor: "red",
    paddingLeft: "5%",
    paddingRight: "5%",
    width: "100%",
    position: "absolute",
    // height:"100%",
    bottom: "20%",
    // flex: 1,
  },
  buttonContainer: {
    width: "100%",
    height: 48,
    // borderWidth: 3,
    // borderColor: "blue",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    marginBottom: "20%",
  },
  button: {
    backgroundColor: "white",
    // marginBottom: "10%",
    // bottom: 0,
    // position: "absolute",
    width: "75%",
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
