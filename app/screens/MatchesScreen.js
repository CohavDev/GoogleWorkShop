import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config.js";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import colors from "../config/colors";

export default function MatchesScreen(props) {
  const activityData = {
    activityType: props.route.params.activityType,
    location: props.route.params.location,
    startDate: props.route.params.startDate,
    endDate: props.route.params.endDate,
    time: props.route.params.time,
    languages: props.route.params.languages,
    userFormattedDateOfBirth: props.route.params.userFormattedDateOfBirth,
    travelPartnersIDs: props.route.params.travelPartnersIDs,
    activityID: props.route.params.activityID,
  };
  const [myMatches, setMyMatches] = useState([]);
  const allActivitiesRef = firebase.firestore().collection("allActivities");
  const userID = firebase.auth().currentUser.uid;
  const usersRef = firebase.firestore().collection("users");
  const [date, setDate] = useState(new Date());

  function getAge(formattedDateOfBirth) {
    let dateOfBirth = formattedDateOfBirth.toString();

    var day = dateOfBirth.slice(6, 8);
    var month = dateOfBirth.slice(4, 6);
    var year = dateOfBirth.slice(0, 4);
    // assuming the format of the date of birth is : DD/MM/YYYY
    dateOfBirth = "".concat(year, "-", month, "-", day);
    var ageInMilliseconds = new Date() - new Date(dateOfBirth);
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
  }

  useEffect(() => {
    setDate(new Date());
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
      .onSnapshot(
        (querySnapshot) => {
          const newMyMatches = []; //array for matched activites
          function fetchData() {
            querySnapshot.forEach((doc) => {
              const match = doc.data();
              match.id = doc.id;
              if (
                match.travelPartnersIDs.indexOf(userID) > -1 &&
                activityData.travelPartnersIDs.indexOf(match.userID) > -1
              ) {
                match.matchedActivityStatus = "accepted by both";
                match.condOne = true;
                match.condTwo = true;
              }
              if (
                match.travelPartnersIDs.indexOf(userID) == -1 &&
                activityData.travelPartnersIDs.indexOf(match.userID) > -1
              ) {
                match.matchedActivityStatus = "accepted only by other user";
                match.condOne = false;
                match.condTwo = true;
              }
              if (
                match.travelPartnersIDs.indexOf(userID) > -1 &&
                activityData.travelPartnersIDs.indexOf(match.userID) == -1
              ) {
                match.matchedActivityStatus = "accepted only by me";
                match.condOne = true;
                match.condTwo = false;
              }
              if (
                match.travelPartnersIDs.indexOf(userID) == -1 &&
                activityData.travelPartnersIDs.indexOf(match.userID) == -1
              ) {
                match.matchedActivityStatus = "accepted by non of us";
                match.condOne = false;
                match.condTwo = false;
              }
              if (match.userID != userID) {
                match.userRef = usersRef.doc(match.userID);
                match.userRef.get().then((result) => {
                  match.fullName = result.data().fullName;
                  match.dateOfBirth = result.data().dateOfBirth;
                  match.aboutMe = result.data().aboutMe;
                  match.profilePic = result.data().profilePic;
                  match.age = getAge(match.userFormattedDateOfBirth);
                  match.phoneNumber = result.data().phoneNumber;
                  match.nationality = result.data().nationality;
                  newMyMatches.push(match);
                  setMyMatches(newMyMatches);
                });
              }
            });
          }
          fetchData();
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  
  return (
    <View
      style={{
        borderWidth: 1,
        backgroundColor: "white",
        height: "100%",
        width: "100%",
      }}
    >
      <View style={styles.activityTypeView}>
        <Text style={{ fontSize: 14, color: "black" }}>
          {activityData.activityType +
            " in " +
            activityData.location +
            " on " +
            activityData.startDate}
        </Text>
      </View>
      <View style={styles.background}>
        <FlatList
          data={myMatches}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            var profilePic = item.profilePic;
            //render UI only after data came from server
            if (profilePic == undefined) {
              profilePic = "../assets/genericProfilePictureEdited.jpg";
            }
            return (
              <Pressable
                onPress={() =>
                  props.navigation.navigate("ProfileMatching", {
                    //matched activity data
                    startDate: item.startDate,
                    endDate: item.endDate,
                    type: item.type,
                    location: item.location,
                    matchedActivityStatus: item.matchedActivityStatus,

                    //other user's data:
                    matchedActivityDocID: item.id,
                    userID: item.userID,
                    fullName: item.fullName,
                    dateOfBirth: item.dateOfBirth,
                    aboutMe: item.aboutMe,
                    profilePic: profilePic,
                    age: item.age,
                    phoneNumber: item.phoneNumber,
                    nationality: item.nationality,

                    //this user's data:
                    myActivityDocID: activityData.activityID,
                  })
                }
              >
                <View style={[styles.shadowProp, styles.matchBackground]}>
                  <Image
                    source={require("../assets/genericProfilePictureEdited.jpg")}
                    style={styles.profilePicture}
                  />
                  <View style={styles.nameTagContainer}>
                    <View style={styles.nameTag}>
                      <Text style={[styles.text, { fontWeight: "bold" }]}>
                        {item.fullName} {", "}
                        {item.age}
                      </Text>
                      {item.condOne && !item.condTwo && (
                        <Text style={styles.text}>
                          {item.languages.join(", ")} {"\n"}
                          {"you have already requested "} {item.fullName}
                        </Text>
                      )}
                      {!item.condOne && item.condTwo && (
                        <Text style={styles.text}>
                          {item.languages.join(", ")} {"\n"}
                          {item.fullName} {" has already requested you"}
                        </Text>
                      )}
                      {!item.condTwo && !item.condOne && (
                        <Text style={styles.text}>
                          {item.languages.join(", ")} {"\n"}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
      <View style={styles.viewTitleText}>
        <Text style={colors.title}>Matches</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowProp: {
  },
  background: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    top: "22%",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  matchBackground: {
    backgroundColor: "white",
    height: 90,
    width: "90%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profilePicture: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: "gray",
  },
  nameTag: {
    height: 65,
    width: "100%",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  nameTagContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "70%",
    height: 60,
    alignItems: "center",
    left: 5,
  },
  textBox: {
    width: "100%",
    backgroundColor: "transparent",
    textAlign: "left",
  },
  text: {
    alignSelf: "flex-start",
  },
  viewTitleText: {
    position: "absolute",
    top: "5%",
    width: "90%",
    height: "5%",
    left: "5%",
    backgroundColor: colors.Background,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderBottomWidth: 1,
  },
  titleText: {
    color: "black",
    fontSize: 28,
    top: 40,
    alignSelf: "center",
  },
  activityTypeView: {
    position: "absolute",
    top: "15%",
    bottom: "20%",
    width: "90%",
    height: "10%",
    left: "5%",
    backgroundColor: colors.Background,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 15,
  },
});
