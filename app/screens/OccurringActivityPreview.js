import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import { firebase } from "../firebase/config.js";
  import OccurringActivityDetailsComponent from "../components/OccurringActivityDetailsComponent";
  import colors from "../config/colors";
  
  export default function OccurringActivityPreview(props) {
    const activityData = {
      // type: props.navigation.getParam("activityType"),
      activityType: props.route.params.activityType,
      // icon: props.navigation.getParam("icon"),
      icon: props.route.params.activityIcon,
      // location: props.navigation.getParam("location"),
      location: props.route.params.location,
      // startDate: props.navigation.getParam("startDate"),
      startDate: props.route.params.startDate,
      // endDate: props.navigation.getParam("startDate"),
      endDate: props.route.params.endDate,
      // time: props.navigation.getParam("time"),
      time: props.route.params.time,
      // languages: props.navigation.getParam("languages", "english"),
      languages: props.route.params.languages,
      travelPartnersIDs: props.route.params.travelPartnersIDs,
      matchedActivityID: props.route.params.matchedActivityID,
      userFormattedDateOfBirth: props.route.params.userFormattedDateOfBirth,
      activityID: props.route.params.activityID,
      otherUserID: props.route.params.otherUserID,
      otherFullName: props.route.params.otherFullName,
      otherDateOfBirth: props.route.params.otherDateOfBirth,
      otherAboutMe: props.route.params.otherAboutMe,
      otherProfilePic: props.route.params.profilePic,
      otherAge: props.route.params.otherAge,
      otherPhoneNumber: props.route.params.otherPhoneNumber,
      otherNationality: props.route.params.otherNationality,
    };
    var index = 0;
    const allActivitiesRef = firebase.firestore().collection("allActivities");
    const userID = firebase.auth().currentUser.uid;
    const languagesArray = [];
    for (const element of activityData.languages) {
      languagesArray.push(element);
    }
    const languagesString = languagesArray.join(", ");
  
    return (    
      <View
        style={{
          backgroundColor: colors.Secondary,
          height: "100%",
          paddingBottom: "0%",
        }}
      >
        <View style={{ bottom: "0%", height: "80%" }}>
          <OccurringActivityDetailsComponent
            type={activityData.activityType}
            icon={activityData.icon}
            location={activityData.location}
            startDate={activityData.startDate}
            endDate={activityData.endDate}
            languages={languagesString}
            time={activityData.time}
            travelPartner={activityData.otherFullName}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.buttonStyle}
            onLongPress={() => alert("clicked 'edit'")}
            android_ripple={{ color: "white" }}
            onPress={() => {
              var otherProfilePic = activityData.otherProfilePic;
              //render UI only after data came from server
              if (otherProfilePic == undefined) {
                otherProfilePic = "../assets/genericProfilePictureEdited.jpg";
              }
              props.navigation.navigate("ProfileMatching", {
                //matched activity data
                startDate: activityData.startDate,
                endDate: activityData.endDate,
                type: activityData.activityType,
                location: activityData.location,
                matchedActivityStatus: "accepted by both",

                //other user's data:
                matchedActivityDocID: activityData.matchedActivityID,
                userID: activityData.otherUserID,
                fullName: activityData.otherFullName,
                dateOfBirth: activityData.otherDateOfBirth,
                aboutMe: activityData.otherAboutMe,
                profilePic: otherProfilePic,
                age: activityData.otherAge,
                phoneNumber: activityData.otherPhoneNumber,
                nationality: activityData.otherNationality,

                //this user's data:
                myActivityDocID: activityData.activityID,
                })
              }
            }
          >
            <Text style={{ color: "white", fontSize: 16 }}>{activityData.otherFullName}'s profile</Text>
          </Pressable>
          <Pressable
            style={styles.buttonStyle}
            onLongPress={() => alert("clicked 'edit'")}
            android_ripple={{ color: "white" }}
            onPress={() =>
              Alert.alert(
                "Are your sure?",
                "Are you sure you want to delete this activity?",
                [
                  // The "Yes" button
                  {
                    text: "Yes",
                    onPress: () => {
                      allActivitiesRef
                      .where("type", "==", activityData.activityType)
                      .where("time", "==", activityData.time)
                      .where("location", "==", activityData.location)
                      .where("startDate", "==", activityData.startDate)
                      .where("endDate", "==", activityData.endDate)
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
                              match.id = doc.id;
                              index = match.travelPartnersIDs.indexOf(userID);
                              if (index > -1) {
                                allActivitiesRef.doc(match.id).update({
                                  travelPartnersIDs:
                                      firebase.firestore.FieldValue.arrayRemove(userID),
                                })
                              }
                              if (match.matchedActivityID == activityData.activityID){
                                allActivitiesRef.doc(match.id).update({
                                  "status" : "waiting",
                                  "matchedActivityID" : ""
                                })
                              }
                            });
                          }
                          fetchData();
                        }
                        
                      );
                      allActivitiesRef.doc(activityData.activityID).delete().then(() => {
                        props.navigation.goBack()
                      })
                    },
                  },
                  // The "No" button
                  // Does nothing but dismiss the dialog when tapped
                  {
                    text: "No",
                  },
                ]
              )
            }
          >
            <Text style={{ color: "white", fontSize: 16 }}>Delete activity</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    buttonsContainer: {
      width: "100%",
      height: "20%",
      flexDirection: "row",
      justifyContent: "space-evenly",
      bottom: 0,
      paddingTop: "5%",
      backgroundColor: colors.Background,
    },
    buttonStyle: {
      width: 120,
      height: 50,
      elevation: 5,
      backgroundColor: colors.Primary,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
    },
    mainContainer: {
      width: "100%",
      height: "100%",
    },
    activityTypeContainer: {
      width: "100%",
      height: "25%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "baseline",
    },
    activityTypeTextContainer: {
      justifyContent: "flex-start",
    },
    activityTypeText: {
      fontSize: 18,
      fontWeight: "bold",
    },
    activityDetailsText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    activityDetailsContainer: {
      width: "100%",
      height: "55%",
      top: 20,
    },
    titlesStyle: {
      fontSize: 14,
    },
    location: {
      top: 40,
    },
    date: {
      top: 80,
      flexDirection: "row",
    },
    time: {
      top: 120,
    },
    languages: {
      top: 160,
    },
  });