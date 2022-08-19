import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config.js";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  FlatList,
  Keyboard,
  TextInput,
} from "react-native";
import OccurringActivityItem from "./OccurringActivityItem";
import { Entypo } from "@expo/vector-icons";
import myColors from "../config/colors";
import colors from "../config/colors";

export default function ActivitiesList(props) {
  const [myOccurringActivities, setMyOccurringActivities] = useState([]);
  const allActivitiesRef = firebase.firestore().collection("allActivities");
  const userID = firebase.auth().currentUser.uid;
  const [date, setDate] = useState(new Date());
  let userRef;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userRef = firebase.firestore().collection("users").doc(userID);
      } else {
        return;
      }
    });
    console.log("called use effect");
    // console.log(allActivitiesRef);
    // console.log(userID);
    setDate(new Date());
    allActivitiesRef
      .where("userID", "==", userID)
      .where("status", "==", "paired")
      .orderBy("formattedStartDate", "asc")
      .onSnapshot(
        (querySnapshot) => {
          const newMyOccurringActivities = [];
          querySnapshot.forEach((doc) => {
            const activity = doc.data();
            var counter = 0;
            activity.id = doc.id;
            if (activity.formattedStartDate < convertDateToFormattedDate(date)){
                
              allActivitiesRef.doc(activity.id).delete();
              allActivitiesRef.doc(activity.matchedActivityID).delete();
            }
            else if((activity.formattedStartDate == convertDateToFormattedDate(date))
            && (dayTimeToNum(activity.time) < timeToNum(date.getHours()))) {
              allActivitiesRef.doc(activity.id).delete();
              allActivitiesRef.doc(activity.matchedActivityID).delete();
            }
            else if (counter < 2){
              newMyOccurringActivities.push(activity);
              counter++;
            }
          });
          setMyOccurringActivities(newMyOccurringActivities);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  //

  const renderOccurringActivity = ({ item }) => (
    <OccurringActivityItem
      activityID={item.id}
      activityIcon={item.type}
      activityType={item.type}
      startDate={item.startDate}
      endDate={item.endDate}
      location={item.location}
      time={item.time}
      languages={item.languages}
      userFormattedDateOfBirth={item.userFormattedDateOfBirth}
      travelPartnersIDs={item.travelPartnersIDs}
      navigation={props.navigation}
    />
  );
  return (
    <View style={styles.container}>
      {myOccurringActivities.length == 0 && <Text>{"\n" + "- None -"}</Text>}
      {/* <View style={styles.header}>
        <Text style={styles.title}>My Current Activities</Text>
      </View> */}
      {/* <ScrollView> */}
      <View style={[styles.container, { paddingHorizontal: 15 }]}>
        <FlatList
          // maxToRenderPerBatch={2}
          data={myOccurringActivities}
          keyExtractor={(item) => item.id}
          renderItem={renderOccurringActivity}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // backgroundColor: colors.Secondary,
    // height: "5%",
    // borderColor: "black",
    // borderWidth: 1,
  },
  header: {
    width: "25%",
    height: "20%",
    backgroundColor: myColors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  title: {
    color: "black",
    fontSize: 18,
    // fontWeight: "bold",
    //paddingTop: "20%",
    //paddingBottom: 15,
    //top: 20,
  },
  
});
