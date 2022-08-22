import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from 'react-native-paper';
import colors from "../config/colors";

var SIZE = 40
var RADIUS = SIZE/2
var ICONSIZE=SIZE-5
function SmallCircle(props) {
   return (
      <View style={styles.smallCircle}>
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
   },
});

export default SmallCircle;
