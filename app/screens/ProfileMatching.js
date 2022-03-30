import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import myColors from "../config/colors";
import { Pressable, Vibration } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileMatching() {
  const ONE_SEC_IN_MS = 1000;
  const PATTERN = [
    0.1 * ONE_SEC_IN_MS,
    0.1 * ONE_SEC_IN_MS,
    0.1 * ONE_SEC_IN_MS,
    0.1 * ONE_SEC_IN_MS,
    0.1 * ONE_SEC_IN_MS,
  ];
  return (
    <View style={styles.container}>
      {/* style={styles.profilePicContainer} */}
      <View style={styles.profilePicContainer}>
        {/* <LinearGradient
          // Background Linear Gradient
          colors={[myColors.background, myColors.circle]}
          style={styles.testingdeltelater}
        /> */}
        <Image
          source={require("../assets/userPic.png")}
          style={styles.profilePic}
        ></Image>
        <Text style={styles.title}>Emma Davis</Text>
        <Text style={styles.smallTitle}>Tel Aviv, 25</Text>
      </View>

      <Text style={styles.subTitle}>About me</Text>
      <Text style={styles.subText}>
        Ryan Adams, whose new album Prisoner is out this Friday, was the latest
        guest on Marc Maron’s podcast “WTF.” Adams discussed encountering the
        Rolling Stones early in his career (and talking penny loafers with
        drummer Charlie Watts), his struggles with addiction in the Easy Tiger
        era
      </Text>
      <Text style={styles.subTitle}>I'm From</Text>
      <Text style={styles.subText}>New York, US</Text>
      <View style={[styles.interstContainer, styles.shadowProp]}>
        <Text style={styles.subTitle}>What I'm looking for?</Text>
        <Text style={styles.subText}>Bar, Tomorrow night at Tel-Aviv</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onLongPress={() => alert("clicked 'match'!")}
          android_ripple={{ color: "white" }}
          onPressIn={() => Vibration.vibrate(PATTERN)}
        >
          <AntDesign name="check" size={30} color="white" />
        </Pressable>
        <Text>Match with Emma Davis</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  testingdeltelater: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  container: {
    marginTop: 100,
    width: "100%",
    height: "100%",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  smallTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
  },
  subTitle: {
    color: "#49454F",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 15,
  },
  subText: {
    color: "gray",
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
  },
  profilePic: {
    width: 128,
    height: 128,
    borderRadius: 64,
    margin: "5%",
  },
  profilePicContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: myColors.circle,
    marginBottom: "10%",
  },
  interstContainer: {
    borderRadius: 10,
    // shadowColor: "black",
    backgroundColor: myColors.background,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    paddingVertical: 10,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: myColors.circle,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});
