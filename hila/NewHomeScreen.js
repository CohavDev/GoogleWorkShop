import React from "react";
import { StyleSheet, Pressable, View, Text, Image, Button } from "react-native";
import colors from "../app/config/colors";
import OvalSquare from "../app/components/OvalSquare";
import ActivitiesList from "./ActivitiesList";
// import NewBubblesCategories from "./NewBubblesCategories";
// import SmallCircle from "../components/smallCircle";
// import BackgroundImage from "../components/BackgroungImage";
import MyActivities from "../app/screens/MyActivities";
export default function NewHomeScreen(props) {
  const pressNewActivityHandler = () => {
    props.navigation.navigate("NewBubblesCategories");
  };

  const viewRecentActivitiesHandler = () => {
    props.navigation.navigate("MyActivities");
  };

  return (
    <View style={styles.mainBackground}>
      <Text style={styles.header}>Welcome back</Text>
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
          <Text style={styles.textStyle}>Upcoming activities</Text>
        </View>
        <ActivitiesList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: "center",
    top: 40,
    fontSize: 20,
    // alignContent: "center",
    // textAlign: "center",
  },
  textStyle: {
    color: "black",
    fontSize: 14,
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
