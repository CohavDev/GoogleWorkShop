import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { IconButton } from "react-native-paper";
import colors from "../config/colors";
import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config.js";
import { cond } from "react-native-reanimated";
export default function OccurringActivityItem(props) {
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
    matchedActivityID: props.matchedActivityID,
    activityID: props.activityID,
  };

  const allActivitiesRef = firebase.firestore().collection("allActivities");
  const userID = firebase.auth().currentUser.uid;
  const usersRef = firebase.firestore().collection("users");
  const [condDate, setCondDate] = useState(
    props.activityType == "Place to sleep" ||
      props.activityType == "Backpacking"
  );
  const [travelPartner, setTravelPartner] = useState("");

  useEffect(() => {
    allActivitiesRef
      .doc(activityData.matchedActivityID)
      .get()
      .then((matchedActivityData) => {
        const otherUserID = matchedActivityData.get("userID");
        usersRef
          .doc(otherUserID)
          .get()
          .then((otherUserData) => {
            setTravelPartner(otherUserData.get("fullName"));
          });
      });
  }, []);

  function getAge(formattedDateOfBirth) {
    let dateOfBirth = formattedDateOfBirth.toString();

    var day = dateOfBirth.slice(6, 8);
    var month = dateOfBirth.slice(4, 6);
    var year = dateOfBirth.slice(0, 4);
    // i assume the format of the date of birth is : DD/MM/YYYY
    dateOfBirth = "".concat(year, "-", month, "-", day);
    var ageInMilliseconds = new Date() - new Date(dateOfBirth);
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
  }

  return (
    <Pressable
      style={[
        styles.shadowProp,
        { backgroundColor: "white", marginBottom: 15, width: "100%" },
      ]}
      android_ripple={{ color: "#C9CBD7" }}
      onPress={() =>
        allActivitiesRef
          .doc(activityData.matchedActivityID)
          .get()
          .then((matchedActivityData) => {
            const otherUserID = matchedActivityData.get("userID");
            usersRef
              .doc(otherUserID)
              .get()
              .then((otherUserData) => {
                // console.log("--------!!!!!--------");
                // console.log(otherUserData.get("fullName"));
                props.navigation.navigate("OccurringActivityPreview", {
                  navigation: props.navigation, // TODO: pass navigation in a differnent way(setOptions)
                  activityType: props.activityType,
                  activityIcon: iconsMap[props.activityIcon],
                  location: props.location,
                  startDate: props.startDate,
                  endDate: props.endDate,
                  time: props.time,
                  languages: props.languages,
                  travelPartnersIDs: props.travelPartnersIDs,
                  matchedActivityID: props.matchedActivityID,
                  userFormattedDateOfBirth: props.userFormattedDateOfBirth,
                  activityID: props.activityID,

                  otherUserID: otherUserData.id,
                  otherFullName: otherUserData.get("fullName"),
                  otherDateOfBirth: otherUserData.get("dateOfBirth"),
                  otherAboutMe: otherUserData.get("aboutMe"),
                  otherProfilePic: undefined, // needs to be changed when we actually have profile pics
                  otherNativeLanguage: otherUserData.get("nativeLanguage"),
                  otherSecondLanguage: otherUserData.get("secondLanguage"),
                  otherAge: getAge(otherUserData.get("formattedDateOfBirth")),
                  otherPhoneNumber: otherUserData.get("phoneNumber"),
                  otherNationality: otherUserData.get("nationality"),
                });
              });
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
          {!condDate && <Text>{"Date: " + props.startDate}</Text>}

          {/* <Text>{props.time}</Text> */}
          <Text>{"Location: " + props.location}</Text>
        </View>
        <View style={styles.travelPartnerContainer}>
          <Text>Travel Partner</Text>
          <Text>{travelPartner}</Text>
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
  travelPartnerContainer: {
    // marginVertical: 15,
    // paddingHorizontal: 15,
    // left: 20,
    right: 40,
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
