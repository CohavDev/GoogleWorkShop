import React from "react";
import { StyleSheet, Pressable, View, Text, Image, Button } from "react-native";
import colors from "../config/colors";
import Oval from "../components/Oval";
import SmallCircle from "../components/smallCircle";
import BackgroundImage from "../components/BackgroungImage";

function MainMenu(props) {
  const pressNewActivityHandler = () => {
    props.navigation.navigate("ChooseActivityBubbles");
  };

  const viewRecentActivitiesHandler = () => {
    props.navigation.navigate("MyActivities");
  };

  return (
    <View style={styles.mainBackground}>
      <BackgroundImage />
      <View style={styles.viewButtons}>
        <Pressable
          onPress={pressNewActivityHandler}
          // android_ripple={{ color: "white" }}
        >
          <Oval text="New Activity" />
        </Pressable>
        <Pressable onPress={viewRecentActivitiesHandler}>
          <Oval text="View Recent Activities" />
        </Pressable>
      </View>
      <View style={styles.smallCircles}>
      <Pressable>
        <SmallCircle iconName="account-outline"/>
      </Pressable>
      <Pressable>
        <SmallCircle iconName="cog-outline" />
      </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.9,
  },
  textStyle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  mainBackground: {
    height: "100%",
    width: "100%",
    //backgroundColor: colors.background,
    //flexDirection: 'column',
    //alignItems: 'center',
    //justifyContent: 'space-around',
  },
  viewButtons: {
    width: "100%",
    height: "70%",
    flexDirection: "column",
    alignItems: "center",
    top: "15%",
    justifyContent: "space-evenly",
    position: "absolute",
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
    backgroundColor: colors.circle,
    width: 320,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.shapeBackground,
  },
});

export default MainMenu;
