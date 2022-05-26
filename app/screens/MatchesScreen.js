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
    userFormattedDateOfBirth: parseInt(props.route.params.userFormattedDateOfBirth),
    userName: props.route.params.userName,
  };

  const [myMatahces, setMyMatches] = useState([]);
  const allActivitiesRef = firebase.firestore().collection("allActivities");
  const userID = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(userID);

  useEffect(() => {
    allActivitiesRef
        .where("activityType", "==", activityData.activityType)
        .where("time", "==" , activityData.time)
        .where("location" , "==" , activityData.location)
        .where("startDate" , "==" , activityData.startDate)
        .where("endDate" , "==" , activityData.endDate)
        .where("userFormattedDateOfBirth" , "<=" , activityData.userFormattedDateOfBirth+50000)
        .where("userFormattedDateOfBirth" , ">=" , activityData.userFormattedDateOfBirth-50000)
        .where("languages" , "array-contains-any" , activityData.languages)
        .onSnapshot(
            querySnapshot => {
                const newMyMatches = []
                querySnapshot.forEach(doc => {
                    const match = doc.data()
                    match.id = doc.id
                    newMyActivities.push(match)
                });
                setMyMatches(newMyMatches)
            },
            error => {
                console.log(error)
            }
        )
}, [])




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
          data={myMatahces}
          keyExtractor={(item) => item.key}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                // style={[styles.shadowProp, styles.matchBackground]}
                // android_ripple={{ color: "gray" }}
                onPress={() =>
                  props.navigation.navigate("ProfileMatching", {
                    //userIDOfTheMatch: item.userIDOfTheMatch, //needs to be done
                    
                  })
                }
              >
                <View style={[styles.shadowProp, styles.matchBackground]}>
                  <Image
                    source={{ uri: item.profilePic }}
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
                        {item.name} {"  "}
                        {item.age} {"\n"}
                      </Text>
                    </View>
                    <View style={styles.textBox}>
                      <Text
                        style={{
                          alignSelf: "flex-start",
                        }}
                      >
                        {item.desc}
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
            activityData.startDate +
            " with " + 
            activityData.userName}
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
