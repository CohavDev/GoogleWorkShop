import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
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
      fontWeight: "bold",
   },
   ovalShape: {
      backgroundColor: colors.shapeBackground, 
      width: 320,
      height: 90,
      borderRadius: 40,
      bottom: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      //top: 50,
      //margin: -10,
      //alignContent: 'center',
      // position: 'absolute',
   },
});

export default Oval;
