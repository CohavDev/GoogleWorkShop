import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { IconButton } from "react-native-paper";
import colors from "../config/colors";
import React, { useState } from "react";
import { firebase } from "../firebase/config.js";
export default function UploadedActivityItem(props) {
  const iconsMap = {
    Drinks: "glass-wine",
    Backpacking: "hiking",
    Restaurant: "silverware",
    Party: "party-popper",
    Driving: "car-hatchback",
    "Place to sleep": "bunk-bed-outline",
    Concert: "music-clef-treble",
    Museum: "bank",
    Beach: "beach",
    Extreme: "airballoon",
    Trash: "trash-can-outline",
  };

  const activityData = {
    activityID: props.activityID,
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
  const [condDate, setCondDate] = useState(
    props.activityType == "Place to sleep" ||
      props.activityType == "Backpacking"
  );
  var matchesCounter = 0;
  var index = 0;
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
          match.id = doc.id;
          if (match.userID != userID) {
            matchesCounter++;
          }
        });
      }
      fetchData();
      setCounter(matchesCounter);
    });

  const deleteItem = () => {
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

    // when running on Android, uncomment the next part, and comment the first part
    return Alert.alert(
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
            allActivitiesRef.doc(props.activityID).delete();
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  }

  return (
    <Pressable
      style={[
        styles.shadowProp,
        { backgroundColor: "white", marginBottom: 15, width: "100%" },
      ]}
      android_ripple={{ color: "#C9CBD7" }}
      onPress={() =>
        props.navigation.navigate("UploadedActivityPreview", {
          navigation: props.navigation,
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
      <View style={styles.container}>
        <View
          style={styles.circularImage}
        >
          <IconButton
            icon={iconsMap[props.activityType]}
            color={colors.Secondary}
            rippleColor="blue"
            size={35}
          />
        </View>
        <View style={styles.dataContainer}>
          <Text style={{ lineHeight: 19 }}>{props.activityType}</Text>
          {condDate && (
            <Text style={{ lineHeight: 19 }}>{"From: " + props.startDate}</Text>
          )}
          {condDate && (
            <Text style={{ lineHeight: 19 }}>{"Until: " + props.endDate}</Text>
          )}
          {!condDate && (
            <Text style={{ lineHeight: 19 }}>{"Date: " + props.startDate}</Text>
          )}
          <Text style={{ lineHeight: 19 }}>
            {"Location: " + props.location}
          </Text>
          <Text style={{ lineHeight: 19 }}>
            {"Potential partners: " + counter}
          </Text>
        </View>
        <View style={styles.deletionContainer}>
          <View
            style={styles.deletionImage}
          >
            <IconButton
              icon={iconsMap["Trash"]}
              color={colors.Secondary}
              rippleColor="grey"
              size={16}
              onPress={() => deleteItem()}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 100,
  },
  circularImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  deletionImage: {
    height: 25,
    width: 25,
    borderRadius: 35,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  dataContainer: {
    width: "60%",
    paddingHorizontal: 0,
  },
  deletionContainer: {
    right: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  shadowProp: {
    shadowColor: "#171717",
    elevation: 5,
  },
});
