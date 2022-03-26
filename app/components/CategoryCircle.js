import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function CategoryCircle(props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/mountain_track_small.jpg")}
        style={styles.circularImage}
      ></Image>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  circularImage: {
    height: 140,
    width: 140,
    borderRadius: 70,
  },
  text: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
});
