import {
    FlatList,
    Keyboard,
    TextInput,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    Button,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import Circle from "../components/Circle";
  import { AntDesign } from "@expo/vector-icons";
  import ApprovalItem from "../components/ApprovalItem";
  import { Entypo } from "@expo/vector-icons";
  import myColors from "../config/colors";
  import { firebase } from "../firebase/config.js";
  import UploadedActivityDetailsComponent from "../components/UploadedActivityDetailsComponent";
  import OccurringActivityDetailsComponent from "../components/OccurringActivityDetailsComponent";
  import { NavigationContainer } from "@react-navigation/native";
  import colors from "../config/colors";
  
  export default function OccurringActivityPreview(props) {
    console.log(props.route.params);
    const DATA = {
      // type: props.navigation.getParam("type"),
      type: props.route.params.activityType,
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
      otherNativeLanguage: props.route.params.otherNativeLanguage,
      otherSecondLanguage: props.route.params.otherSecondLanguage,
      otherAge: props.route.params.otherAge,
      otherPhoneNumber: props.route.params.otherPhoneNumber,
      otherNationality: props.route.params.otherNationality,
    };
    
  
    //   const allActivitiesRef = firebase.firestore().collection("allActivities");
    //   const userID = firebase.auth().currentUser.uid;
    //   const userRef = firebase.firestore().collection("users").doc(userID);
    //   const travelPartnersIDs = [];
    //   const status = "waiting";
    //   const tmpArray = JSON.parse(DATA.languages);
    //   const languagesArray = [];
    //   const matchedActivityID = "";
    var day = "";
    var month = "";
    var year = "";
    console.log(DATA.languages);
    //   const tmpArray = JSON.parse(DATA.languages);
    const languagesArray = [];
    for (const element of DATA.languages) {
      console.log("elem = " + element);
      languagesArray.push(element);
    }
    const languagesString = languagesArray.join(", ");
    console.log("lang string = " + languagesString);
  
    //   for (const element of tmpArray) {
    //     languagesArray.push(element.item);
    //   }
    //   const languagesString = languagesArray.join(", ");
    //   const onClickAprrove = () => {
    //     userRef.get().then((result) => {
    //       //setUserFormattedDateOfBirth(result.data().formattedDateOfBirth)
    //       const userFormattedDateOfBirth = result.data().formattedDateOfBirth;
    //       const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    //       day = DATA.startDate.slice(0, 2);
    //       month = DATA.startDate.slice(3, 5);
    //       year = DATA.startDate.slice(6, 10);
    //       // i assume the format of the date of birth is : DD/MM/YYYY
    //       const formattedStartDate = parseInt("".concat(year, month, day));
    //       day = DATA.endDate.slice(0, 2);
    //       month = DATA.endDate.slice(3, 5);
    //       year = DATA.endDate.slice(6, 10);
    //       // i assume the format of the date of birth is : DD/MM/YYYY
    //       const formattedEndDate = parseInt("".concat(year, month, day));
    //       const activityData = {
    //         userID: userID,
    //         createdAt: timestamp,
    //         type: DATA.type,
    //         startDate: DATA.startDate,
    //         formattedStartDate: formattedStartDate,
    //         endDate: DATA.endDate,
    //         formattedEndDate: formattedEndDate,
    //         time: DATA.time,
    //         userFormattedDateOfBirth: userFormattedDateOfBirth,
    //         location: DATA.location,
    //         languages: languagesArray,
    //         travelPartnersIDs: travelPartnersIDs,
    //         matchedActivityID: matchedActivityID,
    //         status: status,
    //       };
    //       allActivitiesRef
    //         .add(activityData)
    //         .then(() => {
    //           props.navigation.navigate("MyActivities");
    //         })
    //         .catch((error) => {
    //           alert(error);
    //         });
    //     });
    //     // setUserFormattedDateOfBirth(userRef.get('formattedDateOfBirth'))
    //   };
    
  const allActivitiesRef = firebase.firestore().collection("allActivities");
  const userID = firebase.auth().currentUser.uid;
  const usersRef = firebase.firestore().collection("users");

 
    return (
      
      <View
        style={{
          backgroundColor: colors.Secondary,
          height: "100%",
          paddingBottom: "0%",
          // borderWidth: 2,
          // borderColor: "red",
          // paddingTop: "-0%",
        }}
      >
        <View style={{ bottom: "0%", height: "80%" }}>
          <OccurringActivityDetailsComponent
            type={DATA.type}
            icon={DATA.icon}
            location={DATA.location}
            startDate={DATA.startDate}
            endDate={DATA.endDate}
            languages={languagesString}
            time={DATA.time}
            travelPartner={DATA.otherFullName}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.buttonStyle}
            onLongPress={() => alert("clicked 'edit'")}
            android_ripple={{ color: "white" }}
            onPress={() => {
              var otherProfilePic = DATA.otherProfilePic;
              //render UI only after data came from server
              if (otherProfilePic == undefined) {
                // console.log("in if");
                otherProfilePic = "../assets/genericProfilePicture.jpg";
              }
              props.navigation.navigate("ProfileMatching", {
                //matched activity data
                startDate: DATA.startDate,
                endDate: DATA.endDate,
                type: DATA.type,
                location: DATA.location,
                matchedActivityStatus: "accepted by both",

                //other user's data:
                matchedActivityDocID: DATA.matchedActivityID,
                userID: DATA.otherUserID,
                fullName: DATA.otherFullName,
                dateOfBirth: DATA.otherDateOfBirth,
                aboutMe: DATA.otherAboutMe,
                profilePic: otherProfilePic,
                nativeLanguage: DATA.otherNativeLanguage,
                secondLanguage: DATA.otherSecondLanguage,
                age: DATA.otherAge,
                phoneNumber: DATA.otherPhoneNumber,
                nationality: DATA.otherNationality,

                //this user's data:
                myActivityDocID: DATA.activityID,
                })
              }
            }
          >
            <Text style={{ color: "white", fontSize: 16 }}>{DATA.otherFullName}'s profile</Text>
          </Pressable>
          {/* <Pressable
            style={styles.buttonStyle}
            onLongPress={() => alert("clicked 'approve'")}
            android_ripple={{ color: "white" }}
            onPress={onClickAprrove}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Approve</Text>
          </Pressable> */}
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    buttonsContainer: {
      width: "100%",
      height: "20%",
      // borderWidth: 1,
      // borderColor: "red",
      flexDirection: "row",
      justifyContent: "space-evenly",
      bottom: 0,
      paddingTop: "5%",
      backgroundColor: colors.Background,
      // borderWidth: 3,
      // borderColor: "yellow",
      // position: "absolute",
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
      // justifyContent: "flex-start",
      // alignItems: "center",
    },
    activityTypeContainer: {
      // borderWidth: 1,
      width: "100%",
      height: "25%",
      // top: 30,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "baseline",
      // alignContent: "space-between",
    },
    activityTypeTextContainer: {
      // alignSelf: "stretch",
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
      // borderWidth: 1,
      // borderColor: "red",
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
      // borderWidth: 1,
      top: 80,
      // right: 20,
      flexDirection: "row",
      // justifyContent: "space-evenly",
    },
    time: {
      // borderWidth: 1,
      top: 120,
      // right: 20,
      // justifyContent: "space-evenly",
    },
    languages: {
      top: 160,
      // right: 20,
      // justifyContent: "space-evenly",
    },
  });
  