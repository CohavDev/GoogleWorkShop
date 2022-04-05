import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import ActivityItem from "../components/ActivityItem";
import { Entypo } from "@expo/vector-icons";
import myColors from "../config/colors";

const DATA = [
  {
    key: "1",
    activityIcon: "drink",
    activityName: "Drink",
    location: "Tel- Aviv",
    date: "07/05/2022",
  },
  {
    key: "2",
    activityIcon: "bowl",
    activityName: "Restaurant",
    location: "Paris",
    date: "01/08/2022",
  },
  {
    key: "3",
    activityIcon: "moon",
    activityName: "Place To Sleep",
    location: "Tel- Aviv",
    date: "02/06/2022",
  },
  {
    key: "4",
    activityIcon: "drink",
    activityName: "Drink",
    location: "New York",
    date: "12/04/2022",
  },
  // {
  //   key: "5",
  //   activityIcon: "drink",
  //   activityName: "Drink",
  //   location: "New York",
  //   date: "12/04/2022",
  // },
  // {
  //   key: "6",
  //   activityIcon: "drink",
  //   activityName: "Drink",
  //   location: "New York",
  //   date: "12/04/2022",
  // },
];

export default function MyActivities({ navigation }) {
  const renderItem = ({ item }) => (
    <ActivityItem
      activityIcon={item.activityIcon}
      activityName={item.activityName}
      date={item.date}
      location={item.location}
      navigation={navigation}
    />
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Current Activities</Text>
      </View>
      {/* <ScrollView> */}
      <View style={[styles.container, { paddingHorizontal: 15 }]}>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
        />
      </View>
      <Pressable
        android_ripple={{ color: "white" }}
        style={[myColors.circularImage, { marginHorizontal: 15 }]}
        onPress={() => navigation.navigate("ChooseActivityBubbles")}
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
    height: "20%",    
    backgroundColor: myColors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,

  },
  title: {
    
    color: "black",
    fontSize: 30,
    // fontWeight: "bold",
    //paddingTop: "20%",
    //paddingBottom: 15,
    //top: 20,

    
  },
});
