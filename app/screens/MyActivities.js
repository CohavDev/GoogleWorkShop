import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import ActivityItem from "../components/ActivityItem";
import { Entypo } from "@expo/vector-icons";
import myColors from "../config/colors";
export default function MyActivities({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Current Activities</Text>
      </View>
      <ScrollView>
        <View style={[styles.container, { paddingHorizontal: 15 }]}>
          <ActivityItem {...{ activityIcon: "drink", activityName: "Drink" }} />
          <ActivityItem
            {...{ activityIcon: "bowl", activityName: "Restaurant" }}
          />
          <ActivityItem
            {...{ activityIcon: "moon", activityName: "Place to Sleep" }}
          />
          <ActivityItem {...{ activityIcon: "drink", activityName: "Drink" }} />
        </View>
      </ScrollView>
      <Pressable
        android_ripple={{ color: "white" }}
        style={[myColors.circularImage, { marginHorizontal: 15 }]}
        onPress={() => navigation.navigate("profileMatching")}
      >
        <Entypo name="plus" size={32} color="black"></Entypo>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "center",
    width: myColors.deviceWidth,
  },
  header: {
    width: "100%",
    backgroundColor: myColors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: "20%",
    paddingBottom: 15,
  },
});
