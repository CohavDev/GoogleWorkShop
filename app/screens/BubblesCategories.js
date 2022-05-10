import React from "react";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import colors from "../config/colors";
import BigCircle from "../components/BigCircle";
import BackgroundImage from "../components/BackgroungImage";
//import CirclesBackground from '../components/CirclesBackground';
import { IconButton, Colors } from "react-native-paper";
import ChooseOutdoorsActivity from "./ChooseOutdoorsActivity";
import ChooseIndoorsActivity from "./ChooseIndoorsActivity";

function BubblesCategories(props) {
  const pressOutdoorsHandler = (type, icon) => {
    props.navigation.navigate("ChooseOutdoorsActivity");
  };
  const pressIndoorsHandler = (type, icon) => {
    props.navigation.navigate("ChooseIndoorsActivity");
  };
  return (
    <View>
      <View style={styles.mainBackground}>
        <BackgroundImage />

        <View style={styles.middleBackground}>
          <Pressable
            onPress={pressIndoorsHandler}
          >
            <BigCircle
              style={styles.circleButtonTop}
              text="Indoors"
              iconName="domain"
            ></BigCircle>
          </Pressable>
          <Pressable onPress={pressOutdoorsHandler}>
            <BigCircle
              style={styles.circleButtonMiddle}
              text="Outdoors"
              iconName="tent"
            ></BigCircle>
          </Pressable>

          {/* <Pressable
            onPress={() => pressActivityHandler("Restaurant", "silverware")}
          >
            <Circle
              style={styles.circleButtonBottom}
              text="Food"
              iconName="noodles"
            >
               // iconName="noodles">
            </Circle>
          </Pressable> */}
        </View>

        {/* <View style={styles.rightBackground}>
          <Pressable
            onPress={() => pressActivityHandler("Party", "party-popper")}
          >
            <Circle
              style={styles.circleButtonTop}
              text="Party"
              iconName="party-popper"
            ></Circle>
          </Pressable>
          <Pressable
            onPress={() => pressActivityHandler("Driving", "car-hatchback")}
          >
            <Circle
              text="Driving"
              iconName="car-hatchback"
              style={styles.circleButtonMiddle}
            ></Circle>
          </Pressable>
          <Pressable
            onPress={() =>
              pressActivityHandler("Place to sleep", "bunk-bed-outline")
            }
          >
            <Circle
              text="Place to sleep"
              iconName="bunk-bed-outline"
              style={styles.circleButtonBottom}
            ></Circle>
          </Pressable>
        </View> */}
      </View>
      <View style={styles.viewTitleText}>
        {/* <Text style={styles.titleText}>What activity are you looking for?</Text> */}
        <Text style={styles.titleText}>Choose the kind of activity</Text>
        <Text style={styles.titleText}>you are looking for</Text>
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
  viewTitleText: {
    flex: 1,
    // textAlign: "center",
    position: "absolute",
    // justifyContent: "center",
    // alignItems: "center",
    left: 10,
    right: 10,
  },

  titleText: {
    color: "black",
    fontSize: 20,
    // fontWeight: "bold",
    top: 60,
    alignSelf: "center",
    justifyContent: "space-evenly",
  },

  pressableText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  mainBackground: {
    flexDirection: "row",
    justifyContent: "center",
    height: "100%",
  },
  rightBackground: {
    flexDirection: "column",
    justifyContent: "space-between",
    position: "absolute",
    height: "60%",
    top: "25%",
    left: "12%",
  },
  middleBackground: {
    width: "100%",
    height: "90%",
    top: "40%",
    // right: "12%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    // alignItems: "stretch",
    position: "absolute",

  },
  // circleButtonTop: {
  //   marginTop: 225,
  //   marginBottom: 40,
  // },

  // circleButtonMiddle: {
  //   margin: 40,
  // },
  // circleButtonBottom: {
  //   marginTop: 40,
  // },
});

export default BubblesCategories;
