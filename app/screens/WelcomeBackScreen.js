import React from "react";
import { StyleSheet, Pressable, View, Text, Image } from "react-native";
import colors from "../config/colors";
import Oval from "../components/Oval";

function WelcomeBackScreen(props) {
  return (
    <View style={styles.mainBackground}>
      <Image
        source={require("../assets/RoadTrip.jpg")}
        style={styles.backgroundImage}
        blurRadius={0}
      />

      <View style={styles.viewButtons}>
        <Oval text="New Activity" screenName="ChooseActivity" />
        <Oval text="View Recent Activities" screenName="RecentActivities" />
        <Oval text="Settings" screenName="" />
        <Oval text="La La La" screenName="" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    shadowColor: "white",
    opacity: 0.5,
  },
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
    position: "absolute",
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
    //alignItems: "center",
    //justifyContent: 'center',

    //alignSelf: 'center',
    // justifyContent: 'center',
    //alignItems: 'center',
    //alignContent: 'center',
    // position: 'absolute',
  },
});

export default WelcomeBackScreen;

{
  /* <View style={styles.ovalButton}>
       <Pressable onPress={() => alert('New Activity')}>
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
    */
}
