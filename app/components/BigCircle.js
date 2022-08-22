import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Colors } from 'react-native-paper';
import colors from "../config/colors";

var SIZE=120
var RADIUS=SIZE/2
var ICONSIZE=SIZE/2

function BigCircle(props) {
   return (
      <View  style={styles.circle}>
         <IconButton
          icon={props.iconName}
          color={colors.Secondary}
          size={ICONSIZE}
        />
      </View>
   );
}

const styles = StyleSheet.create({
   circle: {
      backgroundColor: colors.shapeBackground,
      width: SIZE,
      height: SIZE,
      borderRadius: RADIUS,
      alignItems: "center",
      justifyContent: "center",
   },
   pressableText: {
      color: "black",
      fontSize: 10,
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
