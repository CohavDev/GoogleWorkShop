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
import OccurringActivityItem from "../components/OccurringActivityItem";
import UploadedActivityItem from "../components/UploadedActivityItem";
import { Entypo } from "@expo/vector-icons";
import myColors from "../config/colors";
import colors from "../config/colors";

export default function MyActivities({ navigation }) {
  const [myOccurringActivities, setMyOccurringActivities] = useState([]);
  const [myUploadedActivities, setMyUploadedActivities] = useState([]);
  const allActivitiesRef = firebase.firestore().collection("allActivities");
  const userID = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(userID);
  const [date, setDate] = useState(new Date());


  useEffect(() => {
    setDate(new Date());
    allActivitiesRef
      .where("userID", "==", userID)
      .orderBy("formattedStartDate", "asc")
      .onSnapshot(
        (querySnapshot) => {
          const newMyOccurringActivities = [];
          const newMyUploadedActivities = [];
          querySnapshot.forEach((doc) => {
            const activity = doc.data();
            activity.id = doc.id;
            if (activity.status.localeCompare("waiting") == 0) {
              if (activity.formattedStartDate < convertDateToFormattedDate(date)){
                allActivitiesRef.doc(activity.id).delete();
              }
              else if((activity.formattedStartDate == convertDateToFormattedDate(date))
              && (dayTimeToNum(activity.time) < timeToNum(date.getHours()))) {
                allActivitiesRef.doc(activity.id).delete();
              }
              else{
                newMyUploadedActivities.push(activity);
              }
              
            } else {
              if (activity.formattedStartDate < convertDateToFormattedDate(date)){
                
                allActivitiesRef.doc(activity.id).delete();
                allActivitiesRef.doc(activity.matchedActivityID).delete();
              }
              else if((activity.formattedStartDate == convertDateToFormattedDate(date))
              && (dayTimeToNum(activity.time) < timeToNum(date.getHours()))) {
                allActivitiesRef.doc(doc.id).delete();
                allActivitiesRef.doc(activity.matchedActivityID).delete();
              }
              else{
                newMyUploadedActivities.push(activity);
              }
              newMyOccurringActivities.push(activity);
            }
            
            
          });
          setMyOccurringActivities(newMyOccurringActivities);
          setMyUploadedActivities(newMyUploadedActivities);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const renderUploadedActivity = ({ item }) => (
    <UploadedActivityItem
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
      navigation={navigation}
    />
  );

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
      navigation={navigation}
    />
  );

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
    const splitMorning = 5;

    if (currentHour >= splitAfternoon && currentHour < splitEvening) {
      // Between 12 PM and 5PM
      return 2;
    } else if (currentHour >= splitEvening && currentHour < splitNight) {
      // Between 5PM and 22PM
      return 3;
    } else if (currentHour >= splitNight || currentHour < splitMorning) {
      // its on porpose with or instead of and
      // Between 22PM and 5AM
      return 3;
    } else if (currentHour >= splitMorning || currentHour < splitAfternoon) {
      return 1;
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

  return (
    // <View style={{backgroundColor: colors.background}}>

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={colors.title}>Occurring Activities</Text>
      </View>

      {myOccurringActivities.length == 0 && <Text style={styles.textStyle}>{"\n\n\n" + "- None -"}</Text>}

      <ScrollView style={{ top: "5%" }}>
        <View style={styles.scrollviewContainer}>
          <FlatList
            data={myOccurringActivities}
            keyExtractor={(item) => item.id}
            renderItem={renderOccurringActivity}
          />
        </View>
      </ScrollView>

      <View style={styles.header}>
        <Text style={colors.title}>Uploaded Activities</Text>
      </View>

      {myUploadedActivities.length == 0 && <Text style={styles.textStyle}>{"\n\n\n" + "- None -"}</Text>}

      <ScrollView style={{ top: "5%" }}>
        <View style={styles.scrollviewContainer}>
          <FlatList
            data={myUploadedActivities}
            keyExtractor={(item) => item.id}
            renderItem={renderUploadedActivity}
          />
        </View>
      </ScrollView>
      <Pressable
        android_ripple={{ color: "white" }}
        style={[
          myColors.circularImage,
          { marginHorizontal: 0, left: "75%", bottom: 5 },
        ]}
        onPress={() => navigation.navigate("BubblesCategories")}
      >
        <Entypo name="plus" size={32} color="white"></Entypo>
      </Pressable>
    </View>

    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // top: "5%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "center",
    backgroundColor: colors.Background,
    width: myColors.deviceWidth,
  },
  scrollviewContainer: {
    // top: "5%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "center",
    backgroundColor: colors.Background,
    width: myColors.deviceWidth,
    paddingHorizontal: 10,
    paddingTop: 10,
    // top: "5%",
  },
  header: {
    top: "5%",
    bottom: "20%",
    width: "90%",
    height: "5%",
    left: "5%",
    backgroundColor: colors.Background,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 15,
  },
  textStyle: {
    color: "black",
    fontSize: 14,
    // fontWeight: "bold",
    textAlign: "center",
  },
  // title: {
  // 	// color: colors.grey,
  //     color: "black",
  // 	fontSize: 15,
  // },
});
