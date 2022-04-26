import React from "react";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import colors from "../config/colors";
import Circle from "../components/Circle";
import BackgroundImage from "../components/BackgroungImage";
//import CirclesBackground from '../components/CirclesBackground';

function ChooseActivity(props) {
   return (
      <View>
         <View style={styles.mainBackground}>
            <BackgroundImage />

            <View style={styles.leftBackground}>
               <Circle
                  style={styles.circleButtonTop}
                  text="Drinks"
               >
               </Circle>

               <Circle
                  style={styles.circleButtonMiddle}
                  text="Backpacking"
               >
               </Circle>

               <Circle
                  style={styles.circleButtonBottom}
                  text="Restaurant"
               >
               </Circle>
            </View>

            <View style={styles.rightBackground}>
               <Circle
                  style={styles.circleButtonTop}
                  text="Party"
               >
               </Circle>
               <Circle
                  text="Driving"
                  View
                  style={styles.circleButtonMiddle}
               >
               </Circle>
               <Circle
                  text="A place to sleep"
                  style={styles.circleButtonBottom}
               >
               </Circle>
            </View>
         </View>
         <View style={styles.viewTitleText}>
            <Text style={styles.titleText}>
               What activity are you looking for?
            </Text>
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
      justifyContent: "center",
      alignItems: "center",
      left: 20,
      right: 20,
   },

   titleText: {
      color: "black",
      fontSize: 20,
      fontWeight: "bold",
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
   leftBackground: {
      flexDirection: "column",
      justifyContent: "space-between",
      position: "absolute",
      height: "60%",
      top: "20%",
      left: "12%",
   },
   rightBackground: {
      height: "60%",
      top: "20%",
      right: "12%",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "absolute",
   },
   circleButtonTop: {
      marginTop: 225,
      marginBottom: 50,   
   },

   circleButtonMiddle: {
      margin: 40,
   },
   circleButtonBottom: {
      marginTop: 40,
   },
});

export default ChooseActivity;
