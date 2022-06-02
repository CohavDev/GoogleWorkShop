import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config.js";
import myColors from "../config/colors";
import { Pressable, Vibration } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileMatching(props) {
  const ONE_SEC_IN_MS = 1000;
  const PATTERN = [
    0.1 * ONE_SEC_IN_MS,
    0.1 * ONE_SEC_IN_MS,
    0.1 * ONE_SEC_IN_MS,
    0.1 * ONE_SEC_IN_MS,
    0.1 * ONE_SEC_IN_MS,
  ];
  const params = props.route.params;
  const activityData = {
    startDate: params.startDate,
    endDate: params.endDate,
    type: params.type,
    location: params.location,
    matchedActivityStatus: params.matchedActivityStatus,
    // matchedActivityStatus = "accepted by both"
    // or "accepted only by me"
    // or "accepted only by other user"
    // or "accepted by non of us"
  };
  const otherUserData = {
    activityDocID: params.matchedActivityDocID,
    userID: params.userID,
    fullName: params.fullName,
    dateOfBirth: params.dateOfBirth,
    aboutMe: params.aboutMe,
    profilePic: params.profilePic,
    nativeLanguage: params.nativeLanguage,
    secondLanguage: params.secondLanguage,
    age: params.age,
    phoneNumber: params.phoneNumber,
    nationality: params.nationality,

  };
  const thisUserData = {
    activityDocID: params.myActivityDocID,
  };
  const userID = firebase.auth().currentUser.uid;
  const allActivitiesRef = firebase.firestore().collection("allActivities");
  if(activityData.matchedActivityStatus.localeCompare("accepted by both")==0){
    // edit it to look like we want
    return (
      <View style={styles.container}>
        {/* style={styles.profilePicContainer} */}
        {/* <View> */}
        <LinearGradient
          // Background Linear Gradient
          colors={[myColors.primary, myColors.secondary]}
          locations={[0.05, 0.9]}
          style={styles.profilePicContainer}
        >
          <Image
            source={{ uri: otherUserData.profilePic }}
            style={styles.profilePic}
          ></Image>
          <Text style={styles.title}>{otherUserData.fullName}</Text>
          <Text style={styles.smallTitle}>
            {otherUserData.nationality + " , " + otherUserData.age}
          </Text>
        </LinearGradient>
        {/* </View> */}
  
        <Text style={styles.subTitle}>About me</Text>
        <Text style={styles.subText}>
          {otherUserData.aboutMe}
        </Text>
        <Text style={styles.subTitle}>I'm From</Text>
        <Text style={styles.subText}>{otherUserData.nationality}</Text>
        <View style={[styles.interstContainer, styles.shadowProp]}>
          <Text style={[styles.subTitle, { color: "white" }]}>
            What I'm looking for
          </Text>
          <Text style={[styles.subText, { color: "white" }]}>
            {activityData.type +
              " on " +
              activityData.startDate +
              " at " +
              activityData.location}
          </Text>
        </View>
      </View>
    );
  }
  else if(activityData.matchedActivityStatus.localeCompare("accepted only by me")==0){
    return (
      <View style={styles.container}>
        {/* style={styles.profilePicContainer} */}
        {/* <View> */}
        <LinearGradient
          // Background Linear Gradient
          colors={[myColors.primary, myColors.secondary]}
          locations={[0.05, 0.9]}
          style={styles.profilePicContainer}
        >
          <Image
            source={{ uri: otherUserData.profilePic }}
            style={styles.profilePic}
          ></Image>
          <Text style={styles.title}>{otherUserData.fullName}</Text>
          <Text style={styles.smallTitle}>
            {otherUserData.nationality + " , " + otherUserData.age}
          </Text>
        </LinearGradient>
        {/* </View> */}
  
        <Text style={styles.subTitle}>About me</Text>
        <Text style={styles.subText}>
          {otherUserData.aboutMe}
        </Text>
        <Text style={styles.subTitle}>I'm From</Text>
        <Text style={styles.subText}>{otherUserData.nationality}</Text>
        <View style={[styles.interstContainer, styles.shadowProp]}>
          <Text style={[styles.subTitle, { color: "white" }]}>
            What I'm looking for
          </Text>
          <Text style={[styles.subText, { color: "white" }]}>
            {activityData.type +
              " on " +
              activityData.startDate +
              " at " +
              activityData.location}
          </Text>
        </View>
      </View>
    );
  }
  else if(activityData.matchedActivityStatus.localeCompare("accepted only by other user")==0){
    return (
      <View style={styles.container}>
        {/* style={styles.profilePicContainer} */}
        {/* <View> */}
        <LinearGradient
          // Background Linear Gradient
          colors={[myColors.primary, myColors.secondary]}
          locations={[0.05, 0.9]}
          style={styles.profilePicContainer}
        >
          <Image
            source={{ uri: otherUserData.profilePic }}
            style={styles.profilePic}
          ></Image>
          <Text style={styles.title}>{otherUserData.fullName}</Text>
          <Text style={styles.smallTitle}>
            {otherUserData.nationality + " , " + otherUserData.age}
          </Text>
        </LinearGradient>
        {/* </View> */}
  
        <Text style={styles.subTitle}>About me</Text>
        <Text style={styles.subText}>
          {otherUserData.aboutMe}
        </Text>
        <Text style={styles.subTitle}>I'm From</Text>
        <Text style={styles.subText}>{otherUserData.nationality}</Text>
        <View style={[styles.interstContainer, styles.shadowProp]}>
          <Text style={[styles.subTitle, { color: "white" }]}>
            What I'm looking for
          </Text>
          <Text style={[styles.subText, { color: "white" }]}>
            {activityData.type +
              " on " +
              activityData.startDate +
              " at " +
              activityData.location}
          </Text>
        </View>
  
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onLongPress={() => alert("clicked 'match'!")}
            android_ripple={{ color: "white" }}
            onPressIn={() => {
              Vibration.vibrate(PATTERN)
              console.log("pressed")
              allActivitiesRef.doc(otherUserData.activityDocID).update({
                travelPartnersIDs: userID
              })
              allActivitiesRef.doc(otherUserData.activityDocID).update({
                matchedActivityID: thisUserData.activityDocID
              })
              allActivitiesRef.doc(otherUserData.activityDocID).update({
                status: "paired"
              })
              
              allActivitiesRef.doc(thisUserData.activityDocID).update({
                travelPartnersIDs: otherUserData.userID
              })
              allActivitiesRef.doc(thisUserData.activityDocID).update({
                matchedActivityID: otherUserData.activityDocID
              })
              allActivitiesRef.doc(thisUserData.activityDocID).update({
                status: "paired"
              })
            }
          }
          >
            <AntDesign name="check" size={30} color="white" />
          </Pressable>
          <Text>Match with {otherUserData.fullName}</Text>
        </View>
      </View>
    );
  }
  else{
    return (
      <View style={styles.container}>
        {/* style={styles.profilePicContainer} */}
        {/* <View> */}
        <LinearGradient
          // Background Linear Gradient
          colors={[myColors.primary, myColors.secondary]}
          locations={[0.05, 0.9]}
          style={styles.profilePicContainer}
        >
          <Image
            source={{ uri: otherUserData.profilePic }}
            style={styles.profilePic}
          ></Image>
          <Text style={styles.title}>{otherUserData.fullName}</Text>
          <Text style={styles.smallTitle}>
            {otherUserData.nationality + " , " + otherUserData.age}
          </Text>
        </LinearGradient>
        {/* </View> */}
  
        <Text style={styles.subTitle}>About me</Text>
        <Text style={styles.subText}>
          {otherUserData.aboutMe}
        </Text>
        <Text style={styles.subTitle}>I'm From</Text>
        <Text style={styles.subText}>{otherUserData.nationality}</Text>
        <View style={[styles.interstContainer, styles.shadowProp]}>
          <Text style={[styles.subTitle, { color: "white" }]}>
            What I'm looking for
          </Text>
          <Text style={[styles.subText, { color: "white" }]}>
            {activityData.type +
              " on " +
              activityData.startDate +
              " at " +
              activityData.location}
          </Text>
        </View>
  
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onLongPress={() => alert("clicked 'match'!")}
            android_ripple={{ color: "white" }}
            onPressIn={() => {
              Vibration.vibrate(PATTERN)
              console.log("pressed")
              allActivitiesRef.doc(otherUserData.activityDocID).update({
                travelPartnersIDs: firebase.firestore.FieldValue.arrayUnion(userID)
              })
            }
          }
          >
            <AntDesign name="check" size={30} color="white" />
          </Pressable>
          <Text>Match with {otherUserData.fullName}</Text>
        </View>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  testingdeltelater: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  container: {
    width: "100%",
    height: "100%",
  },
  title: {
    color: "black",
    // fontWeight: "bold",
    fontSize: 24,
  },
  smallTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
  },
  subTitle: {
    color: "#49454F",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 15,
  },
  subText: {
    color: "gray",
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
    top: 4,
  },
  profilePic: {
    width: 128,
    height: 128,
    borderRadius: 64,
    margin: "5%",
  },
  profilePicContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
    marginBottom: "10%",
  },
  interstContainer: {
    borderRadius: 10,
    // shadowColor: "black",
    backgroundColor: myColors.primary,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    paddingVertical: 10,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: myColors.primary,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});
