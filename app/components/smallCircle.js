import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { IconButton, Colors } from 'react-native-paper';
import { Entypo } from "@expo/vector-icons";
import colors from "../config/colors";

var SIZE = 40
var RADIUS = SIZE/2
ICONSIZE=SIZE-5
function SmallCircle(props) {
   return (
      <View style={styles.smallCircle}>
         {/* <Entypo name={props.iconName} size={30} color="black"></Entypo> */}
         <IconButton
          icon={props.iconName}
          color="black"
          size={ICONSIZE}
        />
      </View>
   );
}

const styles = StyleSheet.create({
    smallCircle: {
    backgroundColor: colors.shapeBackground,
    width: SIZE,
    height: SIZE,
    borderRadius: RADIUS,
    alignItems: "center",
    justifyContent: "center",
    },
   pressableText: {
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
      //borderRadius: 50
      //alignContent:'center',
      //justifyContent: 'center',
   },
});

export default SmallCircle;
