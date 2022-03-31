import React from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";
import colors from "../app/config/colors";

function WelcomeScreen1(props) {
  return (
    <View style={styles.mainBackground}>
      {/* <View>
                <Text></Text>
            </View> */}
      <View style={styles.viewButtons}>
        <View style={styles.ovalButton}>
          <Pressable onPress={() => alert("New Activity")}>
            <Text style={styles.textStyle}>Create a New Activity</Text>
          </Pressable>
        </View>
        <View style={styles.ovalButton}>
          <Pressable>
            <Text style={styles.textStyle}>View Recent Activities</Text>
          </Pressable>
        </View>
        <View style={styles.ovalButton}>
          <Pressable>
            <Text style={styles.textStyle}>Settings</Text>
          </Pressable>
        </View>
        <View style={styles.ovalButton}>
          <Pressable>
            <Text style={styles.textStyle}>La La La</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    //fontFamily: 'Palette Mosaic'
  },
  mainBackground: {
    backgroundColor: colors.background,
    //flexDirection: 'column',
    //alignItems: 'center',
    //justifyContent: 'space-around',
    height: "100%",
    width: "100%",
  },
  viewButtons: {
    width: "100%",
    height: "70%",
    flexDirection: "column",
    alignItems: "center",
    top: "20%",
    //bottom: '50%',
    //alignContent: 'space-between',
    justifyContent: "space-evenly",
  },
  ovalButton: {
    backgroundColor: colors.circle,
    width: 320,
    height: 90,
    borderRadius: 45,
    //top: 50,
    bottom: 20,
    //margin: -10,
    flexDirection: "row",
    //alignContent: 'center',
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WelcomeScreen1;
