import {
	StyleSheet,
	Text,
	View,
	Pressable,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { firebase } from "../firebase/config.js";
  import ActivityDetailsComponent from "../components/UploadedActivityDetailsComponent";
  import colors from "../config/colors";
  
  export default function ApproveActivity(props) {
	const activityData = {
	  // type: props.navigation.getParam("type"),
	  type: props.route.params.type,
	  // icon: props.navigation.getParam("icon"),
	  icon: props.route.params.icon,
	  // location: props.navigation.getParam("location"),
	  location: props.route.params.location,
	  // startDate: props.navigation.getParam("startDate"),
	  startDate: props.route.params.startDate,
	  // endDate: props.navigation.getParam("startDate"),
	  endDate: props.route.params.endDate,
	  // time: props.navigation.getParam("time"),
	  time: props.route.params.time,
	  // languages: props.navigation.getParam("languages", "english"),
	  languages: props.route.params.languages,
	};
  
	const allActivitiesRef = firebase.firestore().collection("allActivities");
	const userID = firebase.auth().currentUser.uid;
	const userRef = firebase.firestore().collection("users").doc(userID);
	const travelPartnersIDs = [];
	const status = "waiting";
	const tmpArray = JSON.parse(activityData.languages);
	const languagesArray = [];
	const matchedActivityID = "";
	const [cond, setCond] = useState(false);
	var day = "";
	var month = "";
	var year = "";
	day = activityData.startDate.slice(0, 2);
	month = activityData.startDate.slice(3, 5);
	year = activityData.startDate.slice(6, 10);
	// assuming the format of the date of birth is : DD/MM/YYYY
	const formattedStartDate = parseInt("".concat(year, month, day));
	day = activityData.endDate.slice(0, 2);
	month = activityData.endDate.slice(3, 5);
	year = activityData.endDate.slice(6, 10);
	const formattedEndDate = parseInt("".concat(year, month, day));
	const [date, setDate] = useState(new Date());
  
	for (const element of tmpArray) {
	  languagesArray.push(element.item);
	}
	const languagesString = languagesArray.sort().join(", ");

	useEffect(() => {
		setDate(new Date());
		allActivitiesRef
		  .where("userID", "==", userID)
		  .orderBy("formattedStartDate", "asc")
		  .onSnapshot(
			(querySnapshot) => {
			  querySnapshot.forEach((doc) => {
				const activity = doc.data();
				activity.id = doc.id;
				if((activity.formattedEndDate == formattedEndDate)
				&& (activity.formattedStartDate == formattedStartDate)
				&& (activity.location == activityData.location)
				&& (activity.time == activityData.time)){
					setCond(true);
				}
				
			  });
			},
			(error) => {
			  console.log(error);
			}
		  );
	  }, []);



	const onClickAprrove = () => {
	  userRef.get().then((result) => {
		if(!cond){
		const userFormattedDateOfBirth = result.data().formattedDateOfBirth;
		const timestamp = firebase.firestore.FieldValue.serverTimestamp();
		const DATA = {
		  userID: userID,
		  createdAt: timestamp,
		  type: activityData.type,
		  startDate: activityData.startDate,
		  formattedStartDate: formattedStartDate,
		  endDate: activityData.endDate,
		  formattedEndDate: formattedEndDate,
		  time: activityData.time,
		  userFormattedDateOfBirth: userFormattedDateOfBirth,
		  location: activityData.location,
		  languages: languagesArray.sort(),
		  travelPartnersIDs: travelPartnersIDs,
		  matchedActivityID: matchedActivityID,
		  status: status,
		};
		allActivitiesRef
		  .add(DATA)
		  .then(() => {
			props.navigation.navigate("MyActivities");
		  })
		  .catch((error) => {
			alert(error);
		  });
		}
		else{
			alert("You have already uploaded a similar activity");
		}
		
	  });
	};

	return (
	  <View
		style={{
		  backgroundColor: colors.Secondary,
		  height: "100%",
		  paddingBottom: "0%",
		}}
	  >
		<View style={{ bottom: "0%", height: "80%" }}>
		  <ActivityDetailsComponent
			type={activityData.type}
			icon={activityData.icon}
			location={activityData.location}
			startDate={activityData.startDate}
			endDate={activityData.endDate}
			languages={languagesString}
			time={activityData.time}
		  />
		</View>
		<View style={styles.buttonsContainer}>
		  <Pressable
			style={styles.buttonStyle}
			onLongPress={() => alert("clicked 'edit'")}
			android_ripple={{ color: "white" }}
			onPress={() => props.navigation.goBack()}
		  >
			<Text style={{ color: "white", fontSize: 16 }}>Edit</Text>
		  </Pressable>
		  <Pressable
			style={styles.buttonStyle}
			onLongPress={() => alert("clicked 'approve'")}
			android_ripple={{ color: "white" }}
			onPress={onClickAprrove}
		  >
			<Text style={{ color: "white", fontSize: 16 }}>Approve</Text>
		  </Pressable>
		</View>
	  </View>
	);
  }
  
  const styles = StyleSheet.create({
	buttonsContainer: {
	  width: "100%",
	  height: "20%",
	  flexDirection: "row",
	  justifyContent: "space-evenly",
	  bottom: 0,
	  paddingTop: "5%",
	  backgroundColor: colors.Background,
	},
	buttonStyle: {
	  width: 120,
	  height: 50,
	  elevation: 5,
	  backgroundColor: colors.Primary,
	  alignItems: "center",
	  justifyContent: "center",
	  borderRadius: 15,
	},
	mainContainer: {
	  width: "100%",
	  height: "100%",
	},
	activityTypeContainer: {
	  width: "100%",
	  height: "25%",
	  flexDirection: "row",
	  justifyContent: "space-around",
	  alignItems: "baseline",
	},
	activityTypeTextContainer: {
	  justifyContent: "flex-start",
	},
	activityTypeText: {
	  fontSize: 18,
	  fontWeight: "bold",
	},
	activityDetailsText: {
	  fontSize: 16,
	  fontWeight: "bold",
	},
	activityDetailsContainer: {
	  width: "100%",
	  height: "55%",
	  top: 20,
	},
	titlesStyle: {
	  fontSize: 14,
	},
	location: {
	  top: 40,
	},
	date: {
	  top: 80,
	  flexDirection: "row",
	},
	time: {
	  top: 120,
	},
	languages: {
	  top: 160,
	},
  });