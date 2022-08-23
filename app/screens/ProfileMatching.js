import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { firebase } from "../firebase/config.js";
import myColors from "../config/colors";
import { Pressable, Vibration } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconButton } from "react-native-paper";
import * as Linking from "expo-linking";
import colors from "../config/colors";

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
  };
  const otherUserData = {
    activityDocID: params.matchedActivityDocID,
    userID: params.userID,
    fullName: params.fullName,
    dateOfBirth: params.dateOfBirth,
    aboutMe: params.aboutMe,
    profilePic: params.profilePic,
    age: params.age,
    phoneNumber: params.phoneNumber,
    nationality: params.nationality,
  };
  const thisUserData = {
    activityDocID: params.myActivityDocID,
  };
  const [condDate, setCondDate] = useState(
    props.activityType == "Place to sleep" ||
      props.activityType == "Backpacking"
  );
  const userID = firebase.auth().currentUser.uid;
  const allActivitiesRef = firebase.firestore().collection("allActivities");
  const [condElement, setCondElement] = useState(params.matchedActivityStatus);
  const openWhatsapp = () => {
    // open whatsapp chat with partner, if supported
    Linking.openURL("https://wa.me/" + otherUserData.phoneNumber);
  };
  const updatedMatchStatus = (identifier) => {
    // after clicking 'match'
    if (identifier == 1) {
      setCondElement("accepted by both");
    } else {
      setCondElement("accepted only by me");
    }
  };

  function renderButton(matched_status) {
    const status_both = matched_status.localeCompare("accepted by both") == 0;
    const status_other =
      matched_status.localeCompare("accepted only by other user") == 0;
    const status_only_me =
      matched_status.localeCompare("accepted only by me") == 0;
    const status_none =
      matched_status.localeCompare("accepted by non of us") == 0;
    if (status_other) {
      return (
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            android_ripple={{ color: "white" }}
            onPressIn={() => {
              Vibration.vibrate(PATTERN);
              allActivitiesRef.doc(otherUserData.activityDocID).update({
                travelPartnersIDs:
                  firebase.firestore.FieldValue.arrayUnion(userID),
              });
              allActivitiesRef.doc(otherUserData.activityDocID).update({
                matchedActivityID: thisUserData.activityDocID,
              });
              allActivitiesRef.doc(otherUserData.activityDocID).update({
                status: "paired",
              });
              allActivitiesRef.doc(thisUserData.activityDocID).update({
                travelPartnersIDs: firebase.firestore.FieldValue.arrayUnion(
                  otherUserData.userID
                ),
              });
              allActivitiesRef.doc(thisUserData.activityDocID).update({
                matchedActivityID: otherUserData.activityDocID,
              });
              allActivitiesRef
                .doc(thisUserData.activityDocID)
                .update({
                  status: "paired",
                })
                .then(updatedMatchStatus(1));
            }}
          >
            <AntDesign name="check" size={30} color="white" />
          </Pressable>
          <Text>Match with {otherUserData.fullName}</Text>
          {status_other ? <Text> They are already In!</Text> : <Text></Text>}
        </View>
      );
    }
    if (status_none) {
      return (
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            android_ripple={{ color: "white" }}
            onPressIn={() => {
              Vibration.vibrate(PATTERN);
              allActivitiesRef
                .doc(otherUserData.activityDocID)
                .update({
                  travelPartnersIDs:
                    firebase.firestore.FieldValue.arrayUnion(userID),
                })
                .then(updatedMatchStatus(0));
            }}
          >
            <AntDesign name="check" size={30} color="white" />
          </Pressable>
          <Text>Match with {otherUserData.fullName}</Text>
        </View>
      );
    }
    if (status_only_me) {
      return (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} android_ripple={{ color: "white" }}>
            <Text style={styles.alrReqText}>Already Requested</Text>
          </Pressable>
        </View>
      );
    } 
    if(status_both) {
      // status_both == 1
      return (
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            android_ripple={{ color: "white" }}
            onPress={openWhatsapp}
          >
            <IconButton icon="whatsapp" color="white" size={32} />
          </Pressable>
          <Text>contact {otherUserData.fullName} for fine-tunings :)</Text>
        </View>
      );
    }
  }
  return (
    <View style={styles.container}>
      <View>
        <LinearGradient
          // Background Linear Gradient
          colors={[myColors.Primary, myColors.Secondary]}
          locations={[0.05, 0.9]}
          style={styles.profilePicContainer}
        >
          <View
            style={{
              width: "100%",
              height: "35%",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "10%",
            }}
          >
            <Image
              source={require("../assets/genericProfilePictureEdited.jpg")}
              style={styles.profilePic}
            ></Image>
            <Text style={styles.title}>{otherUserData.fullName}</Text>
            <Text style={styles.smallTitle}>
              {otherUserData.nationality + " , " + otherUserData.age}
            </Text>
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.subTitle}>About me</Text>
            <Text style={styles.subText}>{otherUserData.aboutMe}</Text>
            <Text style={styles.subTitle}>I'm From</Text>
            <Text style={styles.subText}>{otherUserData.nationality}</Text>
            <View style={[styles.interstContainer, styles.shadowProp]}>
              <Text style={[styles.subTitle, { color: "white" }]}>
                What I'm looking for
              </Text>
              {!condDate && (
                <Text style={[styles.subText, { color: "white" }]}>
                             
                {activityData.type +
                  " on " +
                  activityData.startDate +
                  " at " +
                  activityData.location}
                </Text>
              )}

              {condDate && (
                <Text style={[styles.subText, { color: "white" }]}>
                             
                {activityData.type +
                  " from " +
                  activityData.startDate +
                  " until " +
                  activityData.endDate + 
                  " at " + 
                  activityData.location}
                </Text>
              )}
              
            </View>
          </View>
        </LinearGradient>
        <View style={{ paddingTop: "15%" }}>
          {renderButton(condElement)}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileDetails: {
    width: "100%",
    height: "50%",
    top: "50%",
    paddingTop: "5%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  testingdeltelater: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  container: {
    backgroundColor: colors.Background,
    width: "100%",
    height: "100%",
  },
  title: {
    color: "white",
    fontSize: 24,
  },
  smallTitle: {
    color: "white",
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
    margin: "2%",
  },
  profilePicContainer: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "15%",
    marginBottom: "10%",
  },
  interstContainer: {
    borderRadius: 10,
    backgroundColor: myColors.Primary,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    paddingVertical: 10,
    top: "30%",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: myColors.Primary,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "50%",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  alrReqText:{
    color: "white",
    fontSize: 12,
    textAlign: "center",
  }
});
