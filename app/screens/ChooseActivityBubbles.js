import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Circle from "../components/Circle";

function ChooseActivityBubbles(props) {
  const pressActivityHandler = (type, icon) => {
    props.navigation.navigate("NewActivityForm", {
      activityType: type,
      activityIcon: icon,
    });
  };
  return (
    <View>
      <View style={styles.mainBackground}>
        {/* <BackgroundImage /> */}

        <View style={styles.leftBackground}>
          <Pressable
            onPress={() => pressActivityHandler("Drinks", "glass-wine")}
          >
            <Circle
              style={styles.circleButtonTop}
              text="Drinks"
              iconName="glass-wine"
            ></Circle>
          </Pressable>
          <Pressable onPress={() => pressActivityHandler("Hiking", "hiking")}>
            <Circle
              style={styles.circleButtonMiddle}
              text="Backpacking"
              iconName="hiking"
            ></Circle>
          </Pressable>

          <Pressable
            onPress={() => pressActivityHandler("Restaurant", "silverware")}
          >
            <Circle
              style={styles.circleButtonBottom}
              text="Restaurant"
              iconName="silverware"
            >
            </Circle>
          </Pressable>
        </View>

        <View style={styles.rightBackground}>
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
        </View>
      </View>
      <View style={styles.viewTitleText}>
        <Text style={styles.titleText}>Choose the activity you</Text>
        <Text style={styles.titleText}>are looking for</Text>
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
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    height: "100%",
  },
  leftBackground: {
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "absolute",
    height: "60%",
    top: "25%",
    left: "12%",
  },
  rightBackground: {
    backgroundColor: "white",
    height: "60%",
    top: "25%",
    right: "12%",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "absolute",
  },
  circleButtonTop: {
    marginTop: 225,
    marginBottom: 40,
  },

  circleButtonMiddle: {
    margin: 40,
  },
  circleButtonBottom: {
    marginTop: 40,
  },
});

export default ChooseActivityBubbles;
