import React from "react";
import { StyleSheet, View, Text } from "react-native";

function CirclesBackground(props) {
   return <View styles={styles.background} />;
}

const styles = StyleSheet.create({
   background: {
      flexDirection: "column",
      justifyContent: "space-between",
      position: "absolute",
      height: "60%",
      top: "28%",
      alignItems: "stretch",
      alignContent: "space-between",
      //flex: 1,
      //width: "50%",
   },
});

export default CirclesBackground;
