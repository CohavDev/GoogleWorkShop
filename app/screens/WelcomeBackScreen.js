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
         {/* <Image
            // source={require("../assets/OriginVan.jpg")}
            source={require("../assets/RoadTrip.jpg")}
            style={colors.backgroundImage}
            blurRadius={0}
         /> */}
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
      //shadowColor: "white",
      opacity: 0.9,
   },
   textStyle: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      //fontFamily: 'Palette Mosaic'
   },
   mainBackground: {
      //backgroundColor: colors.background,
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
      top: "15%",
      //bottom: '50%',
      //alignContent: 'space-between',
      justifyContent: "space-evenly",
      position: "absolute",
   },
   ovalPressButton: {
      backgroundColor: colors.circle,
      width: 320,
      height: 90,
      borderRadius: 45,
      //top: 50,
      //bottom: 20,
      //margin: -10,
      //flexDirection: "row",
      
      backgroundColor: colors.shapeBackground,
      //alignItems: "center",
      //justifyContent: "center",
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


   /* <View style={styles.ovalButton}>

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

