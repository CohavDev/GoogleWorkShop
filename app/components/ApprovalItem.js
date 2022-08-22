import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import myColors from "../config/colors";
var SIZE = 70;
var ICONSIZE = SIZE / 2;
export default function ActivityItem(props) {
  return (
    <Pressable
      style={[
        styles.shadowProp,
        { backgroundColor: "white", marginBottom: 10, width: "100%" },
      ]}
      android_ripple={{ color: "#C9CBD7" }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View
            style={styles.circularImage}
          >
            <IconButton
              icon={props.activityIcon}
              color="black"
              size={ICONSIZE}
            />
          </View>
        </View>
        <View style={styles.dataContainer}></View>
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
    height: 60,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  circularImage: {
    height: 50,
    width: 50,
    borderRadius: 37,
    backgroundColor: myColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  dataContainer: {
    marginVertical: 30,
    paddingHorizontal: 15,
  },
  ApproveActivityInfo: {
    width: 130,
    alignItems: "center",
    marginLeft: "auto",
    justifyContent: "center",
    backgroundColor: myColors.secondary,
  },
  data: {
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
    paddingTop: "0%",
    paddingBottom: 0,
  },
  infoText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: "0%",
    paddingBottom: 0,
  },
});
