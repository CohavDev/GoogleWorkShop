import React from "react";
import { StyleSheet, Pressable, View, Text, Image, Button } from "react-native";
import colors from "../config/colors";
import Oval from "../components/Oval";
import BackgroundImage from "../components/BackgroungImage";

function WelcomeBackScreen(props) {
   
   const pressNewActivityHandler = () => {
      props.navigation.navigate('ChooseActivity')
   }
   
   const viewRecentActivitiesHandler = () => {
      props.navigation.navigate('MyActivities')
   }
   
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
            <Oval text="My Profile" />
            <Oval text="Settings" />
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
   ovalPressButton: {
      backgroundColor: colors.circle,
      width: 320,
      height: 90,
      borderRadius: 45,
      backgroundColor: colors.shapeBackground,
   },

});

export default WelcomeBackScreen;

