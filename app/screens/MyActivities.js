import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config.js";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import OccurringActivityItem from "../components/OccurringActivityItem";
import UploadedActivityItem from "../components/UploadedActivityItem";
import { Entypo } from "@expo/vector-icons";
import myColors from "../config/colors";
import colors from "../config/colors";
import {convertDateToFormattedDate , timeToNum , dayTimeToNum} from "../components/TimeConversions";

export default function MyActivities({ navigation }) {
  const [myOccurringActivities, setMyOccurringActivities] = useState([]);
  const [myUploadedActivities, setMyUploadedActivities] = useState([]);
  const allActivitiesRef = firebase.firestore().collection("allActivities");
  const userID = firebase.auth().currentUser.uid;
  const [date, setDate] = useState(new Date());


  useEffect(() => {
    setDate(new Date());
    allActivitiesRef
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
              else if(activity.userID == userID){
                newMyUploadedActivities.push(activity);
              }
              
            } else {
              if (activity.formattedStartDate < convertDateToFormattedDate(date)){
                
                allActivitiesRef.doc(activity.id).delete();
                allActivitiesRef.doc(activity.matchedActivityID).delete();
              }
              else if((activity.formattedStartDate == convertDateToFormattedDate(date))
              && (dayTimeToNum(activity.time) < timeToNum(date.getHours()))) {
                allActivitiesRef.doc(activity.id).delete();
                allActivitiesRef.doc(activity.matchedActivityID).delete();
              }
              else if(activity.userID == userID)
              {
                newMyOccurringActivities.push(activity);
              }
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

  

  return (

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

  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: colors.Background,
    width: myColors.deviceWidth,
  },
  scrollviewContainer: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: colors.Background,
    width: myColors.deviceWidth,
    paddingHorizontal: 10,
    paddingTop: 10,
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
    marginTop: "5%",
  },
  textStyle: {
    color: "black",
    fontSize: 14,
    textAlign: "center",
  },
});
