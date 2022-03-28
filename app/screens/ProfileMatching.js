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

const s = require("../styles");
export default function ProfileMatching() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Name Text</Text>
      <View style={{ justifyContent: "flex-start" }}>
        <Image
          source={require("../assets/mountain_track_small.jpg")}
          style={styles.profilePic}
        ></Image>
      </View>

      <Text style={styles.subTitle}>About me</Text>
      <Text style={styles.subText}>
        Ryan Adams, whose new album Prisoner is out this Friday, was the latest
        guest on Marc Maron’s podcast “WTF.” Adams discussed encountering the
        Rolling Stones early in his career (and talking penny loafers with
        drummer Charlie Watts), his struggles with addiction in the Easy Tiger
        era
      </Text>
      <Text style={styles.subTitle}>Age 22</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <AntDesign name="check" size={30} color="white" />
        </TouchableOpacity>
        <Text>Match with 'user-name'</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    width: "100%",
    height: "100%",
  },
  title: {
    color: "black",
    fontSize: 24,
    padding: 15,
  },
  subTitle: {
    color: "#49454F",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 15,
  },
  subText: {
    color: "gray",
    fontFamily: "roboto",
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    flexDirection: "row",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#13E07E",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
