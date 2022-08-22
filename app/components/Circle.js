import React from "react";
import { StyleSheet, View, Text} from "react-native";
import { IconButton } from 'react-native-paper';
import colors from "../config/colors";

var SIZE=100
var RADIUS=SIZE/2
var ICONSIZE=SIZE/2

function Circle(props) {
   return (
      <View  style={styles.circle}>
         <IconButton
          icon={props.iconName}
          color="rgb(0, 106, 130)"
          size={ICONSIZE}
        />
        <View style={{bottom: 15}}>

         <Text style={styles.pressableText}>{props.text}</Text>
        </View>
      </View>
   );
}

const styles = StyleSheet.create({
   circle: {
      backgroundColor: colors.Background,
      width: SIZE,
      height: SIZE,
      borderRadius: RADIUS,
      alignItems: "center",
      elevation: 5,
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

export default Circle;
