import { StyleSheet, Pressable, View, Text, Image, Button } from "react-native";
import colors from "../config/colors";
import OvalSquare from "../components/OvalSquare";
import ActivitiesList from "../components/ActivitiesList";
import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config.js";
// import NewBubblesCategories from "./BubblesCategories";
// import SmallCircle from "../components/smallCircle";
// import BackgroundImage from "../components/BackgroungImage";
import MyActivities from "./MyActivities";
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
    } else if (currentHour >= splitMorning || currentHour < splitAfternoon) {
      return "Good morning";
    }
  }

  return (
    <View style={styles.mainBackground}>
      <Text style={styles.header}>
        {getGreetingTime(hour)} {fullName}
      </Text>
      <View style={styles.viewButtons}>
        <Pressable
          onPress={pressNewActivityHandler}
          // android_ripple={{ color: "white" }}
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
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: "center",
    top: 40,
    fontSize: 22,
    
    // alignContent: "center",
    // textAlign: "center",
  },
  textStyle: {
    color: "black",
    fontSize: 14,
    // fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    color: "black",
    fontSize: 15,
    // fontWeight: "bold",
    textAlign: "center",
  },
  mainBackground: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    // flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'space-around',
  },
  viewButtons: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    // alignItems: "flex-start",
    top: "25%",
    justifyContent: "space-evenly",
    // position: "absolute",
  },
  smallCircles: {
    width: "80%",
    // height: "70%",
    flexDirection: "row",
    // alignItems: "flex-start",
    top: "85%",
    right: "10%",
    // left: "5%",
    justifyContent: "space-between",
    position: "absolute",
  },
  ovalPressButton: {
    // backgroundColor: colors.circle,
    width: 320,
    height: 90,
    borderRadius: 45,
    // backgroundColor: colors.shapeBackground,
  },
  myActivities: {
    width: "100%",
    height: "70%",
    // flexDirection: "row",
    alignItems: "center",
    top: "50%",
    // right: "10%",
    // left: "5%",
    // justifyContent: "center",
    position: "absolute",
    // borderColor: "black",
    // borderWidth: 1,
  },
});

// the old HomeScreen code - was commented out on 10.8.2022, replaced with the home
// screen vode that was written in Hila/NewHomeScreen
// import { StyleSheet, Text, View, ImageBackground } from "react-native";
// import React from "react";
// import CategoryCircle from "../components/CategoryCircle";

// export default function HomeScreen() {
//   return (
//     <ImageBackground
//       source={require("../assets/Image.jpg")}
//       style={styles.image}
//     >
//       <Text style={styles.text}>Add a New Activity</Text>
//       <View style={styles.circlesLayout}>
//         <CategoryCircle
//           text="Hike"
//           imageSource="../assest/mountain_track_small.jpg"
//         ></CategoryCircle>
//         <CategoryCircle
//           text="Bar"
//           imageSource="../assest/mountain_track_small.jpg"
//         ></CategoryCircle>
//         <CategoryCircle
//           text="Restaurant"
//           imageSource="../assest/mountain_track_small.jpg"
//         ></CategoryCircle>
//         <CategoryCircle
//           text="Place to Sleep"
//           imageSource="../assest/mountain_track_small.jpg"
//         ></CategoryCircle>
//         <CategoryCircle
//           text="Party"
//           imageSource="../assest/mountain_track_small.jpg"
//         ></CategoryCircle>
//         <CategoryCircle
//           text="Driving"
//           imageSource="../assest/mountain_track_small.jpg"
//         ></CategoryCircle>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   image: {
//     flex: 1,
//     justifyContent: "center",
//     width: "100%",
//     height: "100%",
//   },
//   text: {
//     color: "#535050",
//     // backgroundColor: "rgba(228, 133, 196, 0.6)",
//     fontSize: 20,
//     lineHeight: 50,
//     fontWeight: "bold",
//     fontFamily: "Roboto",
//     textAlign: "center",
//   },
//   circlesLayout: {
//     justifyContent: "space-between",
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
// });
