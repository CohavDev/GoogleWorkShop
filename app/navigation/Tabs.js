import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileMatching from "../screens/ProfileMatching";
import MyActivities from "../screens/MyActivities";
import LoginScreen from "../firescreens/LoginScreen/LoginScreen";

import { View, Text } from "react-native";
import { IconButton, Colors } from "react-native-paper";
import { HomeScreen } from "../firescreens";

const Tab = createBottomTabNavigator();
function Tabs(props) {
  console.log("reached here");
  return (
    // <View>
    //     <Text>
    //         hello
    //     </Text>
    // </View>
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "red",
          height: 90,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="home-outline"
              // color="#BFD9CD"
              color="black"
              // size={12}
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileMatching}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="account-circle-outline"
              // color="#BFD9CD"
              color="black"
              // size={12}
            />
          ),
        }}
      />
      <Tab.Screen
        name="activities"
        component={MyActivities}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="format-list-checkbox"
              // color="#BFD9CD"
              color="black"
              // size={12}
            />
          ),
        }}
      />
      <Tab.Screen
        name="notifications"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="bell-outline"
              // color="#BFD9CD"
              color="black"
              // size={12}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: "red",
  },
});

export default Tabs;

// import React from "react";
// import { StyleSheet, View, Text, Pressable } from "react-native";
// import { Entypo } from "@expo/vector-icons";
// import { IconButton, Colors } from 'react-native-paper';
// import colors from "../config/colors";

// var SIZE=120
// var RADIUS=SIZE/2
// var ICONSIZE=SIZE/2

// function Tabs(props) {
//    return (
//       <View  style={styles.circle}>
//          {/* <Entypo name={props.iconName} size={40} color="black"></Entypo> */}
//          <IconButton
//           icon={props.iconName}
//           // color="#BFD9CD"
//           color="black"
//           size={ICONSIZE}
//         />
//         <View style={{bottom: 15}}>

//          <Text style={styles.pressableText}>{props.text}</Text>
//         </View>
//       </View>
//    );
// }

// const styles = StyleSheet.create({
//    circle: {
//       backgroundColor: colors.shapeBackground,
//       // backgroundColor: "white",
//       // opacity: 0.9,
//       width: SIZE,
//       height: SIZE,
//       borderRadius: RADIUS,
//       alignItems: "center",
//       justifyContent: "center",
//    },
//    pressableText: {
//       color: "black",
//       fontSize: 10,
//       // fontWeight: "bold",
//       //borderRadius: 50
//       //alignContent:'center',
//       //justifyContent: 'center',
//    },
//    bigCircle:{
//     backgroundColor: colors.shapeBackground,
//     width: 110,
//     height: 110,
//     borderRadius: 55,
//     alignItems: "center",
//     justifyContent: "center",
//    },
// });

// export default Tabs;
