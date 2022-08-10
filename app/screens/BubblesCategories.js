import React from "react";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
// import colors from "../config/colors";
import BigCircle from "../components/BigCircle";
import Circle from "../components/Circle";
import BackgroundImage from "../components/BackgroungImage";
// import CirclesBackground from '../components/CirclesBackground';
import { IconButton, Colors } from "react-native-paper";
import ChooseOutdoorsActivity from "./ChooseOutdoorsActivity";
import ChooseIndoorsActivity from "./ChooseIndoorsActivity";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import colors from "../config/colors";

export default function BubblesCategories(props) {
  return (
    <Swiper
      from={1}
      minDistanceForAction={0.1}
      controlsProps={{
        dotsTouchable: true,
        prevPos: "left",
        nextPos: "right",
        nextTitle: "",
        prevTitle: "",
        dotsWrapperStyle: { marginBottom: 20 },
        nextTitleStyle: { color: "red", fontSize: 24, fontWeight: "500" },
      }}
      // loop={false}
      // showsPagination={false}
      dot={
        <View
          style={{
            backgroundColor: colors.grey,
            width: 8,
            height: 8,
            borderRadius: 4,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3,
          }}
        />
      }
      activeDot={
        <View
          style={{
            backgroundColor: colors.Primary,
            width: 8,
            height: 8,
            borderRadius: 4,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3,
          }}
        />
      }
    >
      <ChooseIndoorsActivity navigation={props.navigation} />
      <ChooseOutdoorsActivity navigation={props.navigation} />
    </Swiper>
  );
}

const styles = StyleSheet.create({
  pressableStyle: {
    left: 50,
    top: 30,
    // bottom: 50,
  },
  insideScrollview: {},
  scrollView: {
    borderWidth: 5,
    top: 50,
    width: "100%",
    // flexGrow: 1,
    flex: 1,
  },
  background: {
    borderWidth: 5,
    borderColor: "red",
    // flex: 1,
    flexDirection: "row",
    alignContent: "space-between",
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    // alignItems: "stretch",
    // alignSelf: "flex-end",
  },
  viewTitleText: {
    flex: 1,
    // textAlign: "center",
    position: "absolute",
    // justifyContent: "center",
    // alignItems: "center",
    left: 10,
    right: 10,
  },

  titleText: {
    color: "black",
    fontSize: 20,
    // fontWeight: "bold",
    top: 60,
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
  pressableText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  mainBackground: {
    flexDirection: "row",
    flex: 1,
    // justifyContent: "center",
    alignContent: "space-around",
    height: "100%",
  },
  leftBackground: {
    // position: "absolute",
    height: "100%",
    top: "40%",
    left: "45%",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  rightBackground: {
    height: "100%",
    top: "40%",
    right: "12%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    // position: "absolute",
  },
});




// the old code of bubblesCategories. was commented out on 10.8.2022
// and instead was copy pasted the code of NewBubblesCategories from Hila
// folder
// import React from "react";
// import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
// import colors from "../config/colors";
// import BigCircle from "../components/BigCircle";
// import BackgroundImage from "../components/BackgroungImage";
// //import CirclesBackground from '../components/CirclesBackground';
// import { IconButton, Colors } from "react-native-paper";
// import ChooseOutdoorsActivity from "./ChooseOutdoorsActivity";
// import ChooseIndoorsActivity from "./ChooseIndoorsActivity";

// function BubblesCategories(props) {
//   const pressOutdoorsHandler = (type, icon) => {
//     props.navigation.navigate("ChooseOutdoorsActivity");
//   };
//   const pressIndoorsHandler = (type, icon) => {
//     props.navigation.navigate("ChooseIndoorsActivity");
//   };
//   return (
//     <View>
//       <View style={styles.mainBackground}>
//         <BackgroundImage />

//         <View style={styles.middleBackground}>
//           <Pressable
//             onPress={pressIndoorsHandler}
//           >
//             <BigCircle
//               style={styles.circleButtonTop}
//               text="Indoor"
//               iconName="domain"
//             ></BigCircle>
//           </Pressable>
//           <Pressable onPress={pressOutdoorsHandler}>
//             <BigCircle
//               style={styles.circleButtonMiddle}
//               text="Outdoor"
//               iconName="tent"
//             ></BigCircle>
//           </Pressable>

//           {/* <Pressable
//             onPress={() => pressActivityHandler("Restaurant", "silverware")}
//           >
//             <Circle
//               style={styles.circleButtonBottom}
//               text="Food"
//               iconName="noodles"
//             >
//                // iconName="noodles">
//             </Circle>
//           </Pressable> */}
//         </View>

//         {/* <View style={styles.rightBackground}>
//           <Pressable
//             onPress={() => pressActivityHandler("Party", "party-popper")}
//           >
//             <Circle
//               style={styles.circleButtonTop}
//               text="Party"
//               iconName="party-popper"
//             ></Circle>
//           </Pressable>
//           <Pressable
//             onPress={() => pressActivityHandler("Driving", "car-hatchback")}
//           >
//             <Circle
//               text="Driving"
//               iconName="car-hatchback"
//               style={styles.circleButtonMiddle}
//             ></Circle>
//           </Pressable>
//           <Pressable
//             onPress={() =>
//               pressActivityHandler("Place to sleep", "bunk-bed-outline")
//             }
//           >
//             <Circle
//               text="Place to sleep"
//               iconName="bunk-bed-outline"
//               style={styles.circleButtonBottom}
//             ></Circle>
//           </Pressable>
//         </View> */}
//       </View>
//       <View style={styles.viewTitleText}>
//         {/* <Text style={styles.titleText}>What activity are you looking for?</Text> */}
//         <Text style={styles.titleText}>Choose the kind of activity</Text>
//         <Text style={styles.titleText}>you are looking for</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   backgroundImage: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//     opacity: 0.9,
//   },
//   viewTitleText: {
//     flex: 1,
//     // textAlign: "center",
//     position: "absolute",
//     // justifyContent: "center",
//     // alignItems: "center",
//     left: 10,
//     right: 10,
//   },

//   titleText: {
//     color: "black",
//     fontSize: 20,
//     // fontWeight: "bold",
//     top: 60,
//     alignSelf: "center",
//     justifyContent: "space-evenly",
//   },

//   pressableText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   mainBackground: {
//     flexDirection: "row",
//     justifyContent: "center",
//     height: "100%",
//   },
//   rightBackground: {
//     flexDirection: "column",
//     justifyContent: "space-between",
//     position: "absolute",
//     height: "60%",
//     top: "25%",
//     left: "12%",
//   },
//   middleBackground: {
//     width: "100%",
//     height: "90%",
//     top: "40%",
//     // right: "12%",
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     // alignItems: "stretch",
//     position: "absolute",

//   },
//   // circleButtonTop: {
//   //   marginTop: 225,
//   //   marginBottom: 40,
//   // },

//   // circleButtonMiddle: {
//   //   margin: 40,
//   // },
//   // circleButtonBottom: {
//   //   marginTop: 40,
//   // },
// });

// export default BubblesCategories;
