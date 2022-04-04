import React from 'react';
import { StyleSheet, Text, Pressable, Image } from "react-native";
import colors from '../config/colors';

function BackgroundImage(props) {
    return (
      <Image
      source={require("../assets/SecondVan.jpg")}
      // source={require("../assets/OriginVan.jpg")}
      style={styles.backgroundImage}
      />
);
}

const styles = StyleSheet.create({
   backgroundImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
      // opacity: 0.8, //blue theme
      opacity: 0.7, //green theme
   },
})

export default BackgroundImage;