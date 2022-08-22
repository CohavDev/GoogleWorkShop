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
import { NavigationContainer } from "@react-navigation/native";
import colors from "../config/colors";
import { IconButton } from "react-native-paper";
import {
  convertDateToFormattedDate,
  timeToNum,
  dayTimeToNum,
} from "../components/TimeConversions";

export default function UploadedActivityPreview(props) {
  console.log(props.route.params);
  const activityData = {
    // activityType: props.navigation.getParam("activityType"),
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
    userFormattedDateOfBirth: props.route.params.userFormattedDateOfBirth,
    activityID: props.route.params.activityID,
  };
  var index = 0;
  const [date, setDate] = useState(new Date());
  const [counter, setCounter] = useState([]);
  const allActivitiesRef = firebase.firestore().collection("allActivities");
  const userID = firebase.auth().currentUser.uid;
  const usersRef = firebase.firestore().collection("users");
  var matchesCounter = 0;

  //   const allActivitiesRef = firebase.firestore().collection("allActivities");
  //   const userID = firebase.auth().currentUser.uid;
  //   const userRef = firebase.firestore().collection("users").doc(userID);
  //   const travelPartnersIDs = [];
  //   const status = "waiting";
  //   const tmpArray = JSON.parse(activityData.languages);
  //   const languagesArray = [];
  //   const matchedActivityID = "";
  console.log(activityData.languages);
  //   const tmpArray = JSON.parse(activityData.languages);
  const languagesArray = [];
  for (const element of activityData.languages) {
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
  //       day = activityData.startDate.slice(0, 2);
  //       month = activityData.startDate.slice(3, 5);
  //       year = activityData.startDate.slice(6, 10);
  //       // i assume the format of the date of birth is : DD/MM/YYYY
  //       const formattedStartDate = parseInt("".concat(year, month, day));
  //       day = activityData.endDate.slice(0, 2);
  //       month = activityData.endDate.slice(3, 5);
  //       year = activityData.endDate.slice(6, 10);
  //       // i assume the format of the date of birth is : DD/MM/YYYY
  //       const formattedEndDate = parseInt("".concat(year, month, day));
  //       const activityData = {
  //         userID: userID,
  //         createdAt: timestamp,
  //         activityType: activityData.activityType,
  //         startDate: activityData.startDate,
  //         formattedStartDate: formattedStartDate,
  //         endDate: activityData.endDate,
  //         formattedEndDate: formattedEndDate,
  //         time: activityData.time,
  //         userFormattedDateOfBirth: userFormattedDateOfBirth,
  //         location: activityData.location,
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
    .onSnapshot((querySnapshot) => {
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
    });

  function deleteItem() {
    // when runnin on web uncomment the folloeing part, and comment the second part
    // allActivitiesRef
    // .where("type", "==", activityData.activityType)
    // .where("time", "==", activityData.time)
    // .where("location", "==", activityData.location)
    // .where("startDate", "==", activityData.startDate)
    // .where("endDate", "==", activityData.endDate)
    // .where(
    //   "userFormattedDateOfBirth",
    //   "<=",
    //   activityData.userFormattedDateOfBirth + 50000
    // )
    // .where(
    //   "userFormattedDateOfBirth",
    //   ">=",
    //   activityData.userFormattedDateOfBirth - 50000
    // )
    // .where("languages", "array-contains-any", activityData.languages)
    // .onSnapshot(
    //   (querySnapshot) => {
    //     function fetchData() {
    //       querySnapshot.forEach((doc) => {
    //         const match = doc.data();
    //         match.id = doc.id;
    //         index = match.travelPartnersIDs.indexOf(userID);
    //         if (index > -1) {
    //           allActivitiesRef.doc(match.id).update({
    //             travelPartnersIDs:
    //                 firebase.firestore.FieldValue.arrayRemove(userID),
    //           })
    //         }
    //       });
    //     }
    //     fetchData();
    //   }

    // );
    // allActivitiesRef.doc(activityData.activityID).delete();
    // return Promise.resolve(1);

    // when running on Android, uncomment the next part, and comment the first part
    alert("Are your sure?", "Are you sure you want to delete this activity?", [
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
            .onSnapshot((querySnapshot) => {
              function fetchData() {
                querySnapshot.forEach((doc) => {
                  const match = doc.data();
                  match.id = doc.id;
                  index = match.travelPartnersIDs.indexOf(userID);
                  if (index > -1) {
                    allActivitiesRef.doc(match.id).update({
                      travelPartnersIDs:
                        firebase.firestore.FieldValue.arrayRemove(userID),
                    });
                  }
                });
              }
              fetchData();
            });
          allActivitiesRef.doc(activityData.activityID).delete();
          return Promise.resolve(1);
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
        onPress: () => {
          return Promise.resolve(0);
        },
      },
    ]);
  }

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
        <UploadedActivityDetailsComponent
          type={activityData.activityType}
          icon={activityData.icon}
          location={activityData.location}
          startDate={activityData.startDate}
          endDate={activityData.endDate}
          languages={languagesString}
          time={activityData.time}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.buttonStyle}
          onLongPress={() => alert("clicked 'edit'")}
          android_ripple={{ color: "white" }}
          onPress={() =>
            props.navigation.navigate("MatchesScreen", {
              activityType: activityData.activityType,
              location: activityData.location,
              startDate: activityData.startDate,
              endDate: activityData.endDate,
              time: activityData.time,
              languages: activityData.languages,
              userFormattedDateOfBirth: activityData.userFormattedDateOfBirth,
              travelPartnersIDs: activityData.travelPartnersIDs,
              activityID: activityData.activityID,
            })
          }
        >
          <Text style={{ color: "white", fontSize: 16, textAlign: "center", }}>
            Potential travel partners ({counter})
          </Text>
        </Pressable>
        <Pressable
          style={styles.buttonStyle}
          onLongPress={() => alert("clicked 'edit'")}
          android_ripple={{ color: "white" }}
          onPress={() =>
            deleteItem().then((resolve) => {
              if (resolve) {
                props.navigation.goBack();
              }
            })
          }
        >
          <Text style={{ color: "white", fontSize: 16 }}>Delete activity</Text>
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
