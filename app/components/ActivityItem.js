import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import myColors from "../config/colors";
export default function ActivityItem(props) {
  const iconsMap = {
    Drink: "glass-wine",
    Backpacking: "hiking",
    Restaurant: "silverware",
    Party: "party-popper",
    Driving: "car-hatchback",
    Place_to_sleep: "bunk-bed-outline",
    Concert: "music-clef-treble",
    Museum: "bank",
    Beach: "beach",
    Extreme: "airballon",
  };
  return (
    <Pressable
      style={[
        styles.shadowProp,
        { backgroundColor: "white", marginBottom: 15, width: "100%" },
      ]}
      android_ripple={{ color: "#C9CBD7" }}
      onPress={() =>
        props.navigation.navigate("MatchesScreen", {
          navigation: props.navigation, // TODO: pass navigation in a differnent way(setOptions)
          activityType: props.activityType,
          location: props.location,
          startDate: props.startDate,
          endDate: props.endDate,
          time: props.time,
          languages: props.languages,
          userFormattedDateOfBirth: props.userFormattedDateOfBirth,
          userName: props.userName,
          activityID: props.activityID,
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View
            style={styles.circularImage}
            // source={require("../assets/mountain_track_small.jpg")}
          >
            {/* <Entypo name={iconsMap.hiking} size={32} color="white" /> */}
            <IconButton
              icon={iconsMap[props.activityType]}
              color="white"
              size={32}
            />
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Text>{props.activityType}</Text>
          <Text>
            {"Begin: " + props.startDate + "\nEnds: " + props.endDate}
          </Text>
          <Text>{props.time}</Text>
          <Text>{props.location}</Text>
        </View>
        <View style={styles.matchCountContainer}>
          <Text>Matches</Text>
          <Text>10</Text>
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
    // marginVertical: 15,
    paddingHorizontal: 15,
    alignItems: "center",
    marginLeft: "auto",
    justifyContent: "center",
    // backgroundColor: "gray",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});
