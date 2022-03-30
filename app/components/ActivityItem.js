import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import myColors from "../config/colors";
export default function ActivityItem(props) {
  return (
    <Pressable
      style={[
        styles.shadowProp,
        { backgroundColor: "white", marginBottom: 15, width: "100%" },
      ]}
      android_ripple={{ color: "#C9CBD7" }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View
            style={styles.circularImage}
            // source={require("../assets/mountain_track_small.jpg")}
          >
            <Entypo name={props.activityIcon} size={32} color="white" />
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Text>{props.activityName}</Text>
          <Text>Date</Text>
          <Text>Place</Text>
        </View>
        <View style={styles.matchCountContainer}>
          <Text>Matches</Text>
          <Text>0</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  circularImage: {
    height: 74,
    width: 74,
    borderRadius: 37,
    backgroundColor: myColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  dataContainer: {
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  matchCountContainer: {
    marginVertical: 15,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});
