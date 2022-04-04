import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import myColors from "../config/colors";
export default function ActivityItem(props) {
  return (
    <Pressable
      style={[
        styles.shadowProp,
        { backgroundColor: "white", marginBottom: 25, width: "100%" },
      ]}
      android_ripple={{ color: "#C9CBD7" }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View
            style={styles.circularImage}
            // source={require("../assets/mountain_track_small.jpg")}
          >
            <Entypo name={props.activityIcon} size={32} color="black" />
          </View>
        </View>
        <View style={styles.dataContainer}>
        </View>
        <View style={styles.data}>
          <Text style={styles.infoText}>{props.data}</Text>
        </View>
        <View style={styles.ApproveActivityInfo}>
          <Text style={styles.semiTitle}>{props.approvedInfo}</Text>
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
    height: 55,
    width: 55,
    borderRadius: 37,
    backgroundColor: myColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  dataContainer: {
    marginVertical: 35,
    paddingHorizontal: 15,
  },
  ApproveActivityInfo: {
    // marginVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    marginLeft: "auto",
    justifyContent: "center",
    backgroundColor: myColors.secondary,
  },
  data: {
    // marginVertical: 15,
    paddingHorizontal: 0,
    alignItems: "center",
    marginLeft: 50,
    justifyContent: "center",
    backgroundColor: "white",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  
  semiTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: "5%",
    paddingBottom: 15,
  },
  infoText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: "5%",
    paddingBottom: 15,
  },
});
