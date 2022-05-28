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

export default function ProfileMatching(props) {
  const ONE_SEC_IN_MS = 1000;
  const PATTERN = [
    0.1 * ONE_SEC_IN_MS,
    0.1 * ONE_SEC_IN_MS,
    0.1 * ONE_SEC_IN_MS,
    0.1 * ONE_SEC_IN_MS,
    0.1 * ONE_SEC_IN_MS,
  ];
  const params = props.route.params;
  const data = {
    // userName: props.navigation.getParam("userName", "user-name"),
    userName: params.userName,
    // age: props.navigation.getParam("age", "120"),
    age: params.age,
    // desc: props.navigation.getParam("desc", "about me text"),
    desc: params.desc,
    // city: props.navigation.getParam("city", "somewhere"),
    city: params.city,
    // currentLocation: props.navigation.getParam("currentLocation", "somewhere"),
    currentLocation: params.currentLocation,
    // thumbnail: props.navigation.getParam("thumbnail", "../assets/userPic.png"),
    thumbnail: params.thumbnail,
    // activityName: props.navigation.getParam("activityName", "Matches"),
    activityName: params.activityName,
    // activityLocation: props.navigation.getParam("activityLocation", "??"),
    activityLocation: params.activityLocation,
    // activityDate: props.navigation.getParam("activityDate", "??"),
    activityDate: params.activityDate,
  };
  return (
    <View style={styles.container}>
      {/* style={styles.profilePicContainer} */}
      {/* <View> */}
      <LinearGradient
        // Background Linear Gradient
        colors={[myColors.primary, myColors.secondary]}
        locations={[0.05, 0.9]}
        style={styles.profilePicContainer}
      >
        <Image
          source={{ uri: data.thumbnail }}
          style={styles.profilePic}
        ></Image>
        <Text style={styles.title}>{data.userName}</Text>
        <Text style={styles.smallTitle}>
          {data.currentLocation + " , " + data.age}
        </Text>
      </LinearGradient>
      {/* </View> */}

      <Text style={styles.subTitle}>I Like</Text>
      <Text style={styles.subText}>
        {data.desc}
        {/* Ryan Adams, whose new album Prisoner is out this Friday, was the latest
        guest on Marc Maron’s podcast “WTF.” Adams discussed encountering the
        Rolling Stones early in his career (and talking penny loafers with
        drummer Charlie Watts), his struggles with addiction in the Easy Tiger
        era */}
      </Text>
      <Text style={styles.subTitle}>I'm From</Text>
      <Text style={styles.subText}>{data.city}</Text>
      <View style={[styles.interstContainer, styles.shadowProp]}>
        <Text style={[styles.subTitle, { color: "white" }]}>
          What I'm looking for
        </Text>
        <Text style={[styles.subText, { color: "white" }]}>
          {data.activityName +
            " on " +
            data.activityDate +
            " at " +
            data.activityLocation}
        </Text>
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
        <Text>Match with {data.userName}</Text>
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
    width: "100%",
    height: "100%",
  },
  title: {
    color: "black",
    // fontWeight: "bold",
    fontSize: 24,
  },
  smallTitle: {
    color: "black",
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
    top: 4,
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
    paddingTop: "10%",
    marginBottom: "10%",
  },
  interstContainer: {
    borderRadius: 10,
    // shadowColor: "black",
    backgroundColor: myColors.primary,
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
    backgroundColor: myColors.primary,
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
