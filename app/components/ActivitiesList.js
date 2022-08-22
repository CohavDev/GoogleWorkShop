import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config.js";
import {
  StyleSheet,
  Text,
  View,
  FlatList,

} from "react-native";
import OccurringActivityItem from "./OccurringActivityItem";
import myColors from "../config/colors";

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

  function convertDateToFormattedDate(date){
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    yyyy = '' + yyyy;
    var strDate =  yyyy + mm + dd
    return parseInt(strDate);
  }

  function timeToNum(currentHour) {
    const splitAfternoon = 12; // 24hr time to split the afternoon
    const splitEvening = 18; // 24hr time to split the evening
    const splitNight = 22;
    const splitMorning = 0;

    if (currentHour >= splitMorning || currentHour < splitAfternoon) {
      return 1;
    }
    if (currentHour >= splitAfternoon && currentHour < splitEvening) {
      // Between 12 PM and 5PM
      return 2;
    }
    if (currentHour >= splitEvening && currentHour < splitNight) {
      // Between 5PM and 22PM
      return 3;
    }
    if (currentHour >= splitNight || currentHour < splitMorning) {
      // its on porpose with or instead of and
      // Between 22PM and 5AM
      return 3;
    }
    
  }

  function dayTimeToNum(dayTime) {
    if(dayTime.localeCompare("Morning") == 0){
      return 1;
    }
    if(dayTime.localeCompare("After noon") == 0){
      return 2;
    }
    if(dayTime.localeCompare("Evening/Night") == 0){
      return 3;
    }
  }

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
      matchedActivityID={item.matchedActivityID}
      navigation={props.navigation}
    />
  );
  return (
    <View style={styles.container}>
      {myOccurringActivities.length == 0 && <Text>{"\n" + "- None -"}</Text>}
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
  },
});
