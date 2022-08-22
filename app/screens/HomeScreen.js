import {
  StyleSheet,
  Pressable,
  View,
  Text,
  ImageBackground,
} from "react-native";
import OvalSquare from "../components/OvalSquare";
import ActivitiesList from "../components/ActivitiesList";
import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config.js";
export default function HomeScreen(props) {
  const pressNewActivityHandler = () => {
    props.navigation.navigate("BubblesCategories");
  };

  const viewRecentActivitiesHandler = () => {
    props.navigation.navigate("MyActivities");
  };
  const userID = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(userID);
  const [fullName, setFullName] = useState("");
  const [hour, setHour] = useState("");

  useEffect(() => {
    setHour(new Date().getHours());
    userRef.get().then((userData) => {
      setFullName(userData.get("fullName"));
    });
  }, []);

  function getGreetingTime(currentHour) {
    const splitAfternoon = 12; // 24hr time to split the afternoon
    const splitEvening = 18; // 24hr time to split the evening
    const splitNight = 22;
    const splitMorning = 5;

    if (currentHour >= splitAfternoon && currentHour < splitEvening) {
      // Between 12 PM and 5PM
      return "Good afternoon";
    } else if (currentHour >= splitEvening && currentHour < splitNight) {
      // Between 5PM and 22PM
      return "Good evening";
    } else if (currentHour >= splitNight || currentHour < splitMorning) {
      // its on porpose with or instead of and
      // Between 22PM and 5AM
      return "Good Night";
    } else if (currentHour >= splitMorning && currentHour < splitAfternoon) {
      return "Good morning";
    }
  }

  return (
    <ImageBackground
      style={styles.backgroundImage}
      resizeMode="cover"
      source={require("../assets/homeScreenWallpaper.jpg")}
    >
      <View style={styles.mainBackground}>
        <Text style={styles.header}>
          {getGreetingTime(hour)} {fullName}
        </Text>
        <View style={styles.viewButtons}>
          <Pressable
            onPress={pressNewActivityHandler}
          >
            <OvalSquare text="New Activity" />
          </Pressable>
          <Pressable onPress={viewRecentActivitiesHandler}>
            <OvalSquare text="View Recent Activities" />
          </Pressable>
        </View>
        <View style={styles.myActivities}>
          <View style={{ alignSelf: "flex-start", left: 40 }}>
            <Text style={styles.title}>Upcoming Occuring Activities:</Text>
          </View>
          <ActivitiesList navigation={props.navigation} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    flex: 1,
  },
  header: {
    alignSelf: "center",
    top: 40,
    fontSize: 22,
    height: "20%",
    color: "white",
  },
  textStyle: {
    color: "black",
    fontSize: 14,
    textAlign: "center",
  },
  title: {
    color: "black",
    fontSize: 15,
    textAlign: "center",
  },
  mainBackground: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
  },
  viewButtons: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  smallCircles: {
    width: "80%",
    flexDirection: "row",
    top: "85%",
    right: "10%",
    justifyContent: "space-between",
    position: "absolute",
  },
  ovalPressButton: {
    width: 320,
    height: 90,
    borderRadius: 45,
  },
  myActivities: {
    width: "100%",
    height: "50%",
    bottom: 0,
    position: "absolute",
    alignItems: "center",
  },
});