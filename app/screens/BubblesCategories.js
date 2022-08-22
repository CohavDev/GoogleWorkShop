import React from "react";
import { StyleSheet, View } from "react-native";
import ChooseOutdoorsActivity from "./ChooseOutdoorsActivity";
import ChooseIndoorsActivity from "./ChooseIndoorsActivity";
import Swiper from "react-native-swiper";
import colors from "../config/colors";

export default function BubblesCategories(props) {
  return (
    <Swiper
      from={1}
      minDistanceForAction={0.1}
      controlsProps={{
        dotsTouchable: true,
        prevPos: "left",
        nextPos: "right",
        nextTitle: "",
        prevTitle: "",
        dotsWrapperStyle: { marginBottom: 20 },
        nextTitleStyle: { color: "red", fontSize: 24, fontWeight: "500" },
      }}
      dot={
        <View
          style={{
            backgroundColor: colors.grey,
            width: 8,
            height: 8,
            borderRadius: 4,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3,
          }}
        />
      }
      activeDot={
        <View
          style={{
            backgroundColor: colors.Primary,
            width: 8,
            height: 8,
            borderRadius: 4,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3,
          }}
        />
      }
    >
      <ChooseIndoorsActivity navigation={props.navigation} />
      <ChooseOutdoorsActivity navigation={props.navigation} />
    </Swiper>
  );
}

const styles = StyleSheet.create({
  pressableStyle: {
    left: 50,
    top: 30,
  },
  insideScrollview: {},
  scrollView: {
    borderWidth: 5,
    top: 50,
    width: "100%",
    flex: 1,
  },
  background: {
    borderWidth: 5,
    borderColor: "red",
    flexDirection: "row",
    alignContent: "space-between",
    width: "100%",
    height: "100%",
  },
  viewTitleText: {
    flex: 1,
    position: "absolute",
    left: 10,
    right: 10,
  },

  titleText: {
    color: "black",
    fontSize: 20,
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
    flex: 1,
    alignContent: "space-around",
    height: "100%",
  },
  leftBackground: {
    height: "100%",
    top: "40%",
    left: "45%",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  rightBackground: {
    height: "100%",
    top: "40%",
    right: "12%",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
});