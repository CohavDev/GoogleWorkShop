import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import React from "react";
import BackgroundImage from "../components/BackgroungImage";

export default function LandPage() {
  return (
    // <View>
    //   <View style={styles.mainContainer}>
    //     <Image
    //       source={require("../assets/LandPageBackground.jpg")}
    //       style={styles.backgroundImage}
    //     />
    //     <View style={styles.logo}>
    //       <Image
    //         source={require("../assets/TravelPartnerLogo1.jpg")}
    //         style="{styles.logoImage}"
    //       />
    //     </View>
    //     <View style={styles.textBox}>
    //       <Text style={styles.text1}>Find, Connect, Travel</Text>
    //       <Text style={styles.text2}>
    //         TravelFinder is designated for people who are currently traveling
    //         and would like to find a partner for almost any activity
    //       </Text>
    //     </View>
    //   </View>
    // </View>
    <ImageBackground
      style={styles.backgroundImage}
      resizeMode="cover"
      source={require("../assets/LandPageBackground.jpg")}
    >
      <View style={styles.logo}>
        <Image
          source={require("../assets/TravelPartnerLogo.jpg")}
          style="{styles.logoImage}"
        />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text1}>Find, Connect, Travel</Text>
        <Text style={styles.text2}>
          TravelFinder is designated for people who are currently traveling and
          would like to find a partner for almost any activity
        </Text>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
    // flexDirection: "column",
    // resizeMode: "cover",
  },
  mainContainer: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  logo: {
    // position: "absolute",
    // top: 0,
    backgroundColor: "gray",
    width: 300,
    height: 100,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
  },
  logoImage: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "contain",
  },
  text1: {
    fontSize: 18,
    color: "white",
  },
  text2: {
    fontSize: 12,
    color: "white",
  },
  textBox: {
    width: "80%",
  },
});
