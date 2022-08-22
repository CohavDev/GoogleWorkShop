import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";

function Oval(props) {
   return (
      <View style={styles.ovalShape}>
         <Text style={styles.textStyle}>{props.text}</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   textStyle: {
      color: "black",
      fontSize: 18,
   },
   ovalShape: {
      backgroundColor: colors.shapeBackground, 
      width: 300,
      height: 90,
      borderRadius: 40,
      bottom: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
   },
});

export default Oval;
