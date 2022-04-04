import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import colors from "../config/colors";

function Circle(props) {
   return (
      <View style={styles.circle}>
         <Text style={styles.pressableText}>{props.text}</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   circle: {
      backgroundColor: colors.shapeBackground,
      width: 100,
      height: 100,
      borderRadius: 50,
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

export default Circle;
