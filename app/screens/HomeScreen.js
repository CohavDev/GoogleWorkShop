
import { StyleSheet, Pressable, View, Text, Image, Button ,  FlatList , ScrollView } from "react-native";
import colors from "../config/colors";
import OvalSquare from "../components/OvalSquare";
import ActivitiesList from "../components/ActivitiesList";
import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config.js";
// import NewBubblesCategories from "./BubblesCategories";
// import SmallCircle from "../components/smallCircle";
// import BackgroundImage from "../components/BackgroungImage";
import MyActivities from "./MyActivities";
import { Entypo } from "@expo/vector-icons";
import myColors from "../config/colors";
import OccurringActivityItem from "../components/OccurringActivityItem";


export default function HomeScreen(props) {
  
  
  // const pressNewActivityHandler = () => {
  //   props.navigation.navigate("BubblesCategories");
  // };

  // const viewRecentActivitiesHandler = () => {
  //   props.navigation.navigate("MyActivities");
  // };


  const userID = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(userID);
  const [fullName , setFullName] = useState("");
  const [hour, setHour] = useState('');




  const [myOccurringActivities, setMyOccurringActivities] = useState([]);
  const allActivitiesRef = firebase.firestore().collection("allActivities");

  useEffect(() => {
		allActivitiesRef
			.where("userID", "==", userID)
			.orderBy("formattedStartDate", "asc")
			.onSnapshot(
				(querySnapshot) => {
					const newMyOccurringActivities = [];
					querySnapshot.forEach((doc) => {
						const activity = doc.data();
						activity.id = doc.id;
						if(activity.status.localeCompare("waiting") != 0){
							newMyOccurringActivities.push(activity);
						}
					});
					setMyOccurringActivities(newMyOccurringActivities);
				},
				(error) => {
					console.log(error);
				}
			);



      setHour(new Date().getHours());
      userRef.get().then(userData => {
        setFullName(userData.get("fullName"));
          
        })


	}, []);


	const renderOccurringActivity = ({ item }) => (
		<OccurringActivityItem
			activityID={item.id}
			activityIcon={item.type}
			activityType={item.type}
			startDate={item.startDate}
			endDate={item.endDate}
			location={item.location}
			time={item.time}
			languages={item.languages}
			userFormattedDateOfBirth={item.userFormattedDateOfBirth}
			travelPartnersIDs={item.travelPartnersIDs}
			matchedActivityID={item.matchedActivityID}
			navigation={navigation}
		/>
	);




  // useEffect(() => {
		
	// }, []);

  function getGreetingTime(currentHour){

    const splitAfternoon = 12; // 24hr time to split the afternoon
    const splitEvening = 17; // 24hr time to split the evening
    const splitNight = 22;
    const splitMorning = 5;
  
    if (currentHour >= splitAfternoon && currentHour < splitEvening) {
      // Between 12 PM and 5PM
      return "Good afternoon";
    } else if (currentHour >= splitEvening && currentHour < splitNight) {
      // Between 5PM and 22PM
      return "Good evening";
    } else if (currentHour >= splitNight || currentHour < splitMorning) { // its on porpose with or instead of and
    // Between 22PM and 5AM
      return "Good Night";
    } else if (currentHour >= splitMorning || currentHour < splitAfternoon){
      return "Good morning";
    }
    
  }

	return (
		<View style={styles.mainBackground}>

      <Text style={styles.header}>{getGreetingTime(hour)} {fullName}</Text>




      {/* when you comment out the next part' you see the occuring activities
      if it is not commented out, you dont see them !!!!!!! */}

			<View style={styles.viewButtons}>
				<Pressable
					onPress={() => props.navigation.navigate("BubblesCategories")}
					// android_ripple={{ color: "white" }}
				>
					<OvalSquare text="New Activity" />
				</Pressable>
				<Pressable onPress={() => props.navigation.navigate("MyActivities")}>
                
					<OvalSquare text="View Recent Activities" />
				</Pressable>
			</View>

      {/* this is the end of the part that you need to comment out in order to see the occuring activities */}




      <View style={styles.myActivities}>
        <View style={{ alignSelf: "flex-start", left: 40}}>
            <Text style={styles.title}>Upcoming Occuring Activities</Text>
        </View> 
      </View>

      <ScrollView style={{top: "50%",}}>
				<View style={styles.scrollviewContainer}>
					<FlatList
						data={myOccurringActivities}
						keyExtractor={(item) => item.id}
						renderItem={renderOccurringActivity}
					/>
				</View>
			</ScrollView>

			







            {/* <View style={styles.myActivities}>
                <View style={{ alignSelf: "flex-start", left: 40}}>
                    <Text style={styles.textStyle}>Upcoming Occuring Activities</Text>
                </View> 
            </View>
    <ActivitiesList navigation={props.navigation}/> */}
    </View>
    
	);
}

const styles = StyleSheet.create({
  header: {
    alignSelf: "center",
    top: 40,
    fontSize: 24,
    // alignContent: "center",
    // textAlign: "center",
  },
  textStyle: {
    color: "black",
    fontSize: 14,
    // fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    color: "black",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign: "center",
  },
  mainBackground: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    // flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'space-around',
  },
  viewButtons: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    // alignItems: "flex-start",
    top: "25%",
    justifyContent: "space-evenly",
    // position: "absolute",
  },
  smallCircles: {
    width: "80%",
    // height: "70%",
    flexDirection: "row",
    // alignItems: "flex-start",
    top: "85%",
    right: "10%",
    // left: "5%",
    justifyContent: "space-between",
    position: "absolute",
  },
  ovalPressButton: {
    // backgroundColor: colors.circle,
    width: 320,
    height: 90,
    borderRadius: 45,
    // backgroundColor: colors.shapeBackground,
  },
  myActivities: {
    width: "100%",
    height: "70%",
    // flexDirection: "row",
    alignItems: "center",
    top: "50%",
    // right: "10%",
    // left: "5%",
    // justifyContent: "center",
    position: "absolute",
    // borderColor: "black",
    // borderWidth: 1,
  },




  container: {
		// top: "5%",
		height: "100%",
		flexDirection: "column",
		justifyContent: "space-between",
		// alignItems: "center",
		backgroundColor: colors.Background,
		width: myColors.deviceWidth,
	},
	scrollviewContainer: {
        // top: "5%",
		height: "100%",
		flexDirection: "column",
		justifyContent: "space-between",
		// alignItems: "center",
		backgroundColor: colors.Background,
		width: myColors.deviceWidth,
		paddingHorizontal: 10,
        paddingTop: 10,
		// top: "5%",
	},




});







// the old HomeScreen code - was commented out on 10.8.2022, replaced with the home
// screen vode that was written in Hila/NewHomeScreen
// import { StyleSheet, Text, View, ImageBackground } from "react-native";
// import React from "react";
// import CategoryCircle from "../components/CategoryCircle";

// export default function HomeScreen() {
//   return (
//     <ImageBackground
//       source={require("../assets/Image.jpg")}
//       style={styles.image}
//     >
//       <Text style={styles.text}>Add a New Activity</Text>
//       <View style={styles.circlesLayout}>
//         <CategoryCircle
//           text="Hike"
//           imageSource="../assest/mountain_track_small.jpg"
//         ></CategoryCircle>
//         <CategoryCircle
//           text="Bar"
//           imageSource="../assest/mountain_track_small.jpg"
//         ></CategoryCircle>
//         <CategoryCircle
//           text="Restaurant"
//           imageSource="../assest/mountain_track_small.jpg"
//         ></CategoryCircle>
//         <CategoryCircle
//           text="Place to Sleep"
//           imageSource="../assest/mountain_track_small.jpg"
//         ></CategoryCircle>
//         <CategoryCircle
//           text="Party"
//           imageSource="../assest/mountain_track_small.jpg"
//         ></CategoryCircle>
//         <CategoryCircle
//           text="Driving"
//           imageSource="../assest/mountain_track_small.jpg"
//         ></CategoryCircle>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   image: {
//     flex: 1,
//     justifyContent: "center",
//     width: "100%",
//     height: "100%",
//   },
//   text: {
//     color: "#535050",
//     // backgroundColor: "rgba(228, 133, 196, 0.6)",
//     fontSize: 20,
//     lineHeight: 50,
//     fontWeight: "bold",
//     fontFamily: "Roboto",
//     textAlign: "center",
//   },
//   circlesLayout: {
//     justifyContent: "space-between",
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
// });
