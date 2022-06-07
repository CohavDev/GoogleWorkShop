import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { IconButton, Colors } from 'react-native-paper';
import colors from "../config/colors";

var SIZE=120
var RADIUS=SIZE/2
var ICONSIZE=SIZE/2

function BigCircle(props) {
   return (
      <View  style={styles.circle}>
         {/* <Entypo name={props.iconName} size={40} color="black"></Entypo> */}
         <IconButton
          icon={props.iconName}
          // color="#BFD9CD"
          color={colors.Secondary}
          size={ICONSIZE}
        />
        {/* <View style={{bottom: 15}}>

         <Text style={styles.pressableText}>{props.text}</Text>
        </View> */}
      </View>
   );
}

const styles = StyleSheet.create({
   circle: {
      backgroundColor: colors.shapeBackground,
      // backgroundColor: "white",
      // opacity: 0.9,
      width: SIZE,
      height: SIZE,
      borderRadius: RADIUS,
      alignItems: "center",
      justifyContent: "center",
   },
   pressableText: {
      color: "black",
      fontSize: 10,
      // fontWeight: "bold",
      //borderRadius: 50
      //alignContent:'center',
      //justifyContent: 'center',
   },
   bigCircle:{
    backgroundColor: colors.shapeBackground,
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: "center",
    justifyContent: "center",
   },
  
});

export default BigCircle;
