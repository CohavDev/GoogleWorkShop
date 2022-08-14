import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { IconButton } from "react-native-paper";
import colors from "../config/colors";
import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config.js";
export default function UploadedActivityItem(props) {
  const iconsMap = {
    Drinks: "glass-wine",
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

  const activityData = {
    activityType: props.activityType,
    location: props.location,
    startDate: props.startDate,
    endDate: props.endDate,
    time: props.time,
    languages: props.languages,
    userFormattedDateOfBirth: props.userFormattedDateOfBirth,
    travelPartnersIDs: props.travelPartnersIDs,
    activityID: props.activityID,
  };
  const [counter, setCounter] = useState([]);
  const allActivitiesRef = firebase.firestore().collection("allActivities");
  const userID = firebase.auth().currentUser.uid;
  const usersRef = firebase.firestore().collection("users");
  const [condDate, setCondDate] = useState(
    props.activityType == "Place to sleep" ||
      props.activityType == "Backpacking"
  );
  var matchesCounter = 0;
  allActivitiesRef
  .where("type", "==", activityData.activityType)
  .where("time", "==", activityData.time)
  .where("location", "==", activityData.location)
  .where("startDate", "==", activityData.startDate)
  .where("endDate", "==", activityData.endDate)
  .where("status", "==", "waiting")
  .where(
    "userFormattedDateOfBirth",
    "<=",
    activityData.userFormattedDateOfBirth + 50000
  )
  .where(
    "userFormattedDateOfBirth",
    ">=",
    activityData.userFormattedDateOfBirth - 50000
  )
  .where("languages", "array-contains-any", activityData.languages)
  .onSnapshot(
    (querySnapshot) => {
      function fetchData() {
        querySnapshot.forEach((doc) => {
          const match = doc.data();
          if (match.userID != userID) {
            matchesCounter++;
          }
        });
      }
      fetchData();
      setCounter(matchesCounter);
    }
    
  );
  
  

 

  return (
    
    <Pressable
      style={[
        styles.shadowProp,
        { backgroundColor: "white", marginBottom: 15, width: "100%" },
      ]}
      android_ripple={{ color: "#C9CBD7" }}
      onPress={() =>
        props.navigation.navigate("ActivityPreview", {
          navigation: props.navigation, // TODO: pass navigation in a differnent way(setOptions)
          activityType: props.activityType,
          activityIcon: iconsMap[props.activityIcon],
          location: props.location,
          startDate: props.startDate,
          endDate: props.endDate,
          time: props.time,
          languages: props.languages,
          travelPartnersIDs: props.travelPartnersIDs,
          userFormattedDateOfBirth: props.userFormattedDateOfBirth,
          activityID: props.activityID,
        })
      }
    >
      {/* <View style={{flexDirection: "row"}}> */}
      <View style={styles.container}>
        
        {/* <View style={styles.imageContainer}> */}
        <View
          style={styles.circularImage}
          // source={require("../assets/mountain_track_small.jpg")}
        >
          {/* <Entypo name={iconsMap.hiking} size={32} color="white" /> */}
          <IconButton
            icon={iconsMap[props.activityType]}
            color={colors.Secondary}
            rippleColor="blue"
            size={35}
          />
        </View>
        {/* </View> */}
        <View style={styles.dataContainer}>
            <Text>{props.activityType}</Text>
              {condDate && (
                <Text>{"From: " + props.startDate + "\nTo: " + props.endDate}</Text>
              )}
              {!condDate && (
                <Text>{"Date: " + props.startDate}</Text>
              )}
          {/* <Text>{props.time}</Text> */}
          <Text>{props.location}</Text>
        </View>
        <View style={styles.matchCountContainer}>
          <Text>Potential Travel Partners</Text>
          <Text>{counter}</Text>
        </View>
      </View>
      {/* </View> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 100,
    // backgroundColor: colors.Secondary,
    // direction: "rtl",
  },
  imageContainer: {
    // alignItems: "center",
    // justifyContent: "center",
    // paddingHorizontal: 10,
  },
  circularImage: {
    // left: 15,
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  dataContainer: {
    // marginVertical: 15,
    width: "60%",
    paddingHorizontal: 15,
    // alignItems: "center",
    // bottom: 10,
    // justifyContent: "center",
    // alignContent: "center",
  },
  matchCountContainer: {
    // marginVertical: 15,
    // paddingHorizontal: 15,
    // left: 20,
    right: 20,
    alignItems: "center",
    // marginLeft: "auto",
    justifyContent: "center",
    // backgroundColor: "gray",
  },
  shadowProp: {
    shadowColor: "#171717",
    // shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    elevation: 5,
  },
});
