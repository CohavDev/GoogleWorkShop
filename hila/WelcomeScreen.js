import React from "react";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import colors from "../app/config/colors";

function WelcomeScreen(props) {
  return (
    <View>
      <View style={styles.mainBackground}>
        <Image
          source={require("../assets/RoadTrip.jpg")}
          style={styles.backgroundImage}
        />

        <View style={styles.leftBackground}>
          <Pressable
            style={styles.circleButtonTop}
            onPress={() => alert("Drinks")}
          >
            <Text style={styles.pressableText}>Drinks</Text>
          </Pressable>
          <Pressable
            style={styles.circleButtonMiddle}
            onPress={() => alert("Travel")}
          >
            <Text style={styles.pressableText}>Travel</Text>
          </Pressable>
          <Pressable
            style={styles.circleButtonBottom}
            onPress={() => alert("Restaurant")}
          >
            <Text style={styles.pressableText}>Restaurant</Text>
          </Pressable>
        </View>

        <View style={styles.rightBackground}>
          <Pressable
            style={styles.circleButtonTop}
            onPress={() => alert("Party")}
          >
            <Text style={styles.pressableText}>Party</Text>
          </Pressable>
          <Pressable
            style={styles.circleButtonMiddle}
            onPress={() => alert("Driving")}
          >
            <Text style={styles.pressableText}>Driving</Text>
          </Pressable>
          <Pressable
            style={styles.circleButtonBottom}
            onPress={() => alert("A Place to Sleep")}
          >
            <Text style={styles.pressableText}>A Place to Sleep</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.viewTitleText}>
        <Text style={styles.titleText}>What activity are you looking for?</Text>
      </View>
    </View>
    // <View style={styles.mainBackground}>
    //     <Text style={styles.titleText}>What activity are you looking for today?</Text>

    //     <View style = {styles.leftBackground}>
    //         <Pressable
    //             style={styles.circleButtonTop}
    //             onPress={() => alert('clicked top left successfully')}>
    //             <Text style={styles.pressableText}>Drinks</Text>
    //         </Pressable>
    //         <Pressable
    //             style={styles.circleButtonMiddle}
    //             onPress={() => alert('clicked top left successfully')}>
    //             <Text style={styles.pressableText}>Travel</Text>
    //         </Pressable>
    //         <Pressable
    //             style={styles.circleButtonBottom}
    //             onPress={() => alert('clicked top left successfully')}>
    //             <Text style={styles.pressableText}>Restaurant</Text>
    //         </Pressable>
    //     </View>

    //     <View style = {styles.rightBackground}>
    //         <Pressable
    //             style={styles.circleButtonTop}
    //             onPress={() => alert('clicked top left successfully')}>
    //             <Text style={styles.pressableText}>Party</Text>
    //         </Pressable>
    //         <Pressable
    //             style={styles.circleButtonMiddle}
    //             onPress={() => alert('clicked top left successfully')}>
    //             <Text style={styles.pressableText}>Driving</Text>
    //         </Pressable>
    //         <Pressable
    //             style={styles.circleButtonBottom}
    //             onPress={() => alert('clicked top left successfully')}>
    //             <Text style={styles.pressableText}>Place to Sleep</Text>
    //         </Pressable>
    //     </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    shadowColor: "white",
    opacity: 0.6,
  },
  viewTitleText: {
    flex: 1,
    //flexDirection: 'row',
    //backgroundColor: "blue",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 20,
    right: 20,
    //textAlign: 'center',
  },

  titleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    top: 115,
    alignSelf: "center",
    //left: 50,
    //position: 'absolute',
    //marginLeft: 150,
    //textAlign: 'center',
    //borderRadius: 100
    //alignContent: 'center',
    justifyContent: "space-evenly",
  },

  pressableText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    //borderRadius: 50
    //alignContent:'center',
    //justifyContent: 'center',
  },
  mainBackground: {
    backgroundColor: colors.background,
    flexDirection: "row",
    //alignContent: 'space-between',

    justifyContent: "space-around",
    height: "100%",
  },
  leftBackground: {
    //backgroundColor: "#EEDACB",
    //backgroundColor: "pink",
    flexDirection: "column",
    alignItems: "center",
    //justifyContent: 'center',
    alignContent: "space-between",
    position: "absolute",

    //flex: 1,
    //width: "50%",
    //height: "50%"
    left: 8,
  },
  rightBackground: {
    //backgroundColor: "#EEDACB",
    //backgroundColor: "pink",
    flexDirection: "column",
    alignItems: "center",
    //justifyContent: 'space-evenly',
    position: "absolute",

    alignContent: "space-between",
    //flex: 1,
    //width: "50%",
    //height: "85%"
    right: 8,
  },
  circleButtonTop: {
    backgroundColor: colors.circle,
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",

    marginTop: 225,
    marginBottom: 50,
  },

  circleButtonMiddle: {
    backgroundColor: colors.circle,
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 40,
  },
  circleButtonBottom: {
    backgroundColor: colors.circle,
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    //marginBottom: 80
  },
});

export default WelcomeScreen;
