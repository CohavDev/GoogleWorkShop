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
import DATATWO from "../usersData.json";
export default (props) => {
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

  function getAge(formattedDateOfBirth) {
    let dateOfBirth = formattedDateOfBirth.toString()

    var day=dateOfBirth.slice(6,8)
    var month=dateOfBirth.slice(4,6)
    var year=dateOfBirth.slice(0,4)
    // i assume the format of the date of birth is : DD/MM/YYYY
    dateOfBirth=''.concat(year,'-',month,'-',day)
    var ageInMilliseconds = new Date() - new Date(dateOfBirth);
    return Math.floor(ageInMilliseconds/1000/60/60/24/365); // convert to years
 }

  useEffect(() => {
    allActivitiesRef
      .where("type", "==", activityData.activityType)
      .where("time", "==", activityData.time)
      .where("location", "==", activityData.location)
      .where("startDate", "==", activityData.startDate)
      .where("endDate", "==", activityData.endDate)
      .where("status" , "==" , "waiting")
      .where("userFormattedDateOfBirth" , "<=" , activityData.userFormattedDateOfBirth + 50000)
      .where("userFormattedDateOfBirth" , ">=" , activityData.userFormattedDateOfBirth - 50000)
      .where("languages", "array-contains-any", activityData.languages)
      .onSnapshot(
        (querySnapshot) => {
          const newMyMatches = [] //array for matched activites
          // var key = 0; // assigning key for flatlist to render matches
          function fetchData() {
            querySnapshot.forEach((doc) => {
              const match = doc.data()
              if(match.travelPartnersIDs.indexOf(userID)>-1
              && activityData.travelPartnersIDs.indexOf(match.userID)>-1){
                match.status = "accepted by both"
              }
              if(match.travelPartnersIDs.indexOf(userID)==-1
              && activityData.travelPartnersIDs.indexOf(match.userID)>-1){
                match.status = "accepted only by other user"
              }
              if(match.travelPartnersIDs.indexOf(userID)>-1
              && activityData.travelPartnersIDs.indexOf(match.userID)==-1){
                match.status = "accepted only by me"
              }
              if(match.travelPartnersIDs.indexOf(userID)==-1
              && activityData.travelPartnersIDs.indexOf(match.userID)==-1){
                match.status = "accepted by non of us"
              }
              if (match.userID != userID) {
                match.id = doc.id
                match.userRef = usersRef.doc(match.userID)
                match.userRef.get().then((result) => {
                  match.fullName = result.data().fullName
                  match.dateOfBirth = result.data().dateOfBirth
                  match.aboutMe = result.data().aboutMe
                  match.profilePic = result.data().profilePic
                  match.nativeLanguage = result.data().nativeLanguage
                  match.secondLanguage = result.data().secondLanguage
                  match.age = getAge(match.userFormattedDateOfBirth)
                  match.phoneNumber = result.data().phoneNumber
                  match.nationality = result.data().nationality
                  newMyMatches.push(match)
                  setMyMatches(newMyMatches)
                });
              }
            });
          }
          fetchData();
          // setMyMatches(newMyMatches);
          // setMatchingUsers(newMatchedUsers);
          // console.log("updated state = " + matchingUsers);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  // const newMatchingUsers = []
  // for (const element of myMatches){

  //   useEffect(() => {
  //     usersRef
  //         .where("id", "==", element)
  //         .onSnapshot(
  //             querySnapshot => {
  //                 querySnapshot.forEach(doc => {
  //                     const matchingUser = doc.data()
  //                     newMatchingUsers.push(matchingUser)
  //                 });

  //             },
  //             error => {
  //                 console.log(error)
  //             }
  //         )
  //   }, [])
  // }
  // setMyMatches(newMatchingUsers)

  //
  //
  //
  //
  //
  //
  //
  return (
    <View
      style={{
        backgroundColor: colors.secondary,
        height: "100%",
        width: "100%",
      }}
    >
      <View style={styles.background}>
        <FlatList
          data={myMatches}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            var profilePic = item.profilePic;
            //render UI only after data came from server
            if (profilePic == undefined) {
              profilePic = "../assets/genericProfilePicture.jpg";
            }
            return (
              <Pressable
                // style={[styles.shadowProp, styles.matchBackground]}
                // android_ripple={{ color: "gray" }}
                onPress={() =>
                  props.navigation.navigate("ProfileMatching", {
                    //matched activity data
                    startDate: item.startDate,
                    endDate: item.endDate,
                    type: item.type,
                    location: item.location,
                    matchedActivityStatus: item.status,
                    
                    //other user's data:
                    matchedActivityDocID: item.id,
                    userID: item.userID,
                    fullName: item.fullName,
                    dateOfBirth: item.dateOfBirth,
                    aboutMe: item.aboutMe,
                    profilePic: item.profilePic,
                    nativeLanguage: item.nativeLanguage,
                    secondLanguage: item.secondLanguage,
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
                    source={{ uri: profilePic }}
                    style={styles.profilePicture}
                  />
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      height: 30,
                    }}
                  >
                    <View style={styles.nameTag}>
                      <Text style={styles.text}>
                        {item.fullName} {"\n"}
                        {item.dateOfBirth} {"\n"}
                        {item.age} {"\n"}
                        {item.nativeLanguage} {"\n"}
                        {item.secondLanguage} {"\n"}
                      </Text>
                    </View>
                    <View style={styles.textBox}>
                      <Text
                        style={{
                          alignSelf: "flex-start",
                        }}
                      >
                        {}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
      <View style={styles.viewTitleText}>
        <Text style={styles.titleText}>Matches</Text>
        <Text style={[styles.titleText, { fontSize: 14 }]}>
          {activityData.activityType +
            " in " +
            activityData.location +
            " on " +
            activityData.startDate}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  background: {
    backgroundColor: "rgba(255,255,255,0.8)",
    height: "100%",
    width: "100%",
    top: 150,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    position: "absolute",
    //flex: 1,
    //alignSelf: "center",
    //alignItems: "center",
    //top: '10%',
    //marginTop: '15%',
    //marginBottom: '15%',
  },
  matchBackground: {
    backgroundColor: "rgba(255,255,255,0.9)", //colors.matchBackground,
    height: 90,
    width: "90%",
    borderRadius: 10,
    flexDirection: "row",
    paddingLeft: 20,
    alignSelf: "center",
    marginTop: 20,
    alignItems: "center",
    // borderBottomColor: "black",
    // justifyContent: 'center',
    // marginRight: 5,
    // marginLeft: -20,
    // paddingTop: 35,
    // padding: 15,
    // marginBottom: 10,
    // borderBottomWidth: 0.5,
    // borderColor: "black",
    // borderWidth: 1,
    // alignContent: "center",
    // position: 'absolute',
    // shadowColor: "black",
    // shadowOffset: { height: 10, width: 0 },
    // shadowOpacity: 0.9,
    // shadowRadius: 15,
    // elevation:1,
  },
  profilePicture: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginRight: 10,
    marginLeft: -10,
    backgroundColor: "white",
    //padding: 20,
    // marginTop: -40,
    //right: 10,
    // alignSelf: 'center',
    // alignItems: 'stretch',
    // alignContent: 'space-around',
  },
  nameTag: {
    //height: 90,
    width: "80%",
    backgroundColor: "transparent",
    textAlign: "left",
    marginTop: 8,
    marginBottom: 5,
  },
  textBox: {
    height: 60,
    width: "80%",
    backgroundColor: "transparent",
    textAlign: "left",
    marginRight: 50,
    // alignSelf: 'flex-start',
    // alignItems: 'center',
    //marginTop: 20,
    // bottom: 15,
    // alignContent: 'flex-start',
    // borderRadius: 50,
  },
  text: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    //padding: 50,
  },
  viewTitleText: {
    justifyContent: "center",
    alignItems: "center",
    left: 20,
    right: 20,
    position: "absolute",
    // top: 10,
    //textAlign: 'center',
    //flex: 1,
    //flexDirection: 'row',
    //backgroundColor: "blue",
  },
  titleText: {
    color: "black",
    fontSize: 28,
    //  fontWeight: "bold",
    top: 40,
    alignSelf: "center",
    //justifyContent: "space-evenly",
    //left: 50,
    //position: 'absolute',
    //marginLeft: 150,
    //textAlign: 'center',
    //borderRadius: 100
    //alignContent: 'center',
  },
});

//{item.age} {"\n"}




//       
//       
//       .where(
//         "userFormattedDateOfBirth",
//         ">=",
//         activityData.userFormattedDateOfBirth - 50000
//       )
//       