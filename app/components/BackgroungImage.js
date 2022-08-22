import React from 'react';
import { StyleSheet, Image } from "react-native";

function BackgroundImage(props) {
    return (
      <Image
      source={require("../assets/SecondVan.jpg")}
      style={styles.backgroundImage}
      />
);
}

const styles = StyleSheet.create({
   backgroundImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
      opacity: 0.7, //green theme
   },
})

export default BackgroundImage;