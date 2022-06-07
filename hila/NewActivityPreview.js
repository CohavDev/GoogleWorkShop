import {
	FlatList,
	Keyboard,
	TextInput,
	StyleSheet,
	Text,
	View,
	ScrollView,
	Pressable,
	Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import Circle from "../app/components/Circle";
import { AntDesign } from "@expo/vector-icons";
import ApprovalItem from "../app/components/ApprovalItem";
import { Entypo } from "@expo/vector-icons";
import myColors from "../app/config/colors";
import { firebase } from "../app/firebase/config.js";
import ActivityDetailsComponent from "../app/components/ActivityDetailsComponent";
import { NavigationContainer } from '@react-navigation/native';


export default function NewApproveActivity(props) {
	const DATA = {
		// type: props.navigation.getParam("type"),
		type: "type",
		// icon: props.navigation.getParam("icon"),
		icon: "icon",
		// location: props.navigation.getParam("location"),
		location: "location",
		// startDate: props.navigation.getParam("startDate"),
		startDate: "startDate",
		// endDate: props.navigation.getParam("startDate"),
		endDate: "endDate",
		// time: props.navigation.getParam("time"),
		time: "time",
		// languages: props.navigation.getParam("languages", "english"),
		languages: "languages",
	};

	// const allActivitiesRef = firebase.firestore().collection("allActivities");
	// const userID = firebase.auth().currentUser.uid;
	// const userRef = firebase.firestore().collection("users").doc(userID);
	// const travelPartnersIDs = [];
	// const status = "waiting";
	// const tmpArray = JSON.parse(DATA.languages);
	// const languagesArray = [];
	// const matchedActivityID = "";

	// for (const element of tmpArray) {
	// 	languagesArray.push(element.item);
	// }
	// const languagesString = languagesArray.join(", ");
	return (
		// <View style={styles.mainContainer}>
		// 	<View style={styles.activityTypeContainer}>
		// 		<Text style={styles.activityTypeText}>{DATA.type}</Text>
		// 		<View style={{ top: 30 }}>
		// 			<Circle iconName={DATA.icon} />
		// 		</View>
		// 	</View>
		// 	<View style={styles.activityDetailsContainer}>
		// 		<View style={{ top: 10, left: 20 }}>
		// 			<Text>Activity details</Text>
		// 			{/*activity location*/}
		// 			<View style={styles.location}>
		// 				<Text style={styles.activityDetailsText}>
		// 					{DATA.location}
		// 				</Text>
		// 			</View>
		// 			{/*activity date*/}
		// 			<View style={styles.date}>
		// 				<View
		// 					style={{
		// 						left: 0,
		// 						flexDirection: "row",
		// 						alignItems: "center",
		// 					}}
		// 				>
		// 					<Text style={styles.titlesStyle}>From:   </Text>
		// 					<Text style={styles.activityDetailsText}>
		// 						{DATA.startDate}
		// 					</Text>
		// 				</View>

		// 				<View
		// 					style={{
		// 						left: 40,
		// 						flexDirection: "row",
		// 						alignItems: "center",
		// 					}}
		// 				>
		// 					<Text style={styles.titlesStyle}>To:   </Text>
		// 					<Text style={styles.activityDetailsText}>
		// 						{DATA.endDate}
		// 					</Text>
		// 				</View>
		// 			</View>
		// 			{/*Activity time*/}
		// 			<View style={styles.time}>
		// 				<View
		// 					style={{
		// 						flexDirection: "row",
		// 						alignItems: "center",
		// 					}}
		// 				>
		// 					<Text style={styles.titlesStyle}>When:   </Text>
		// 					<Text style={styles.activityDetailsText}>{DATA.time}</Text>
		// 				</View>
		// 			</View>
		// 			{/*Activity languages*/}
		// 			<View style={styles.languages}>
		// 				<View
		// 					style={{
		// 						flexDirection: "row",
		// 						alignItems: "flex-start",
		// 					}}
		// 				>
		// 					<Text style={styles.titlesStyle}>
		// 						Languages:{"   "}
		// 					</Text>
		//                     <View style={{width: "60%"}}>
		//                         <Text style={styles.activityDetailsText}>
		//                             {languagesString}
		//                         </Text>
		//                     </View>
		// 				</View>
		// 			</View>
		// 		</View>
		// 	</View>
		<View>
            <View style={styles.buttonsContainer}>
				<Pressable
					style={styles.buttonStyle}
					android_ripple={{ color: "white" }}
					onPress={() => props.navigation.navigate("MatchesScreen", {activityType:props.activityType, location:props.location, startDate:props.startDate, endDate:props.endDate, time:props.time, languages:props.languages, userFormattedDateOfBirth:props.userFormattedDateOfBirth, activityID: props.activityID, tarvelPartnersIDs: props.tarvelPartnersIDs})}
				>
					<Text>Matches</Text>
				</Pressable>
			</View>
			<ActivityDetailsComponent
				type={DATA.type}
				icon={DATA.icon}
				location={DATA.location}
				startDate={DATA.startDate}
				endDate={DATA.endDate}
				languages={DATA.languages}
				time={DATA.time}
			/>
			
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		width: "100%",
		height: "100%",
		// justifyContent: "flex-start",
		// alignItems: "center",
	},
	activityTypeContainer: {
		// borderWidth: 1,
		width: "100%",
		height: "25%",
		top: 30,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "baseline",
		// alignContent: "space-between",
	},
	activityTypeTextContainer: {
		// alignSelf: "stretch",
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
		// borderWidth: 1,
		// borderColor: "red",
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
		// borderWidth: 1,
		top: 80,
		// right: 20,
		flexDirection: "row",
		// justifyContent: "space-evenly",
	},
	time: {
		// borderWidth: 1,
		top: 120,
		// right: 20,
		// justifyContent: "space-evenly",
	},
	languages: {
        top: 160,
		// right: 20,
		// justifyContent: "space-evenly",
	},
	buttonsContainer: {
        // borderWidth: 1,
		flexDirection: "row",
		justifyContent: "space-evenly",
		top: "150%",
        // position: "absolute",
	},
	buttonStyle: {
		width: "40%",
		height: 45,
		elevation: 5,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 15,
	},
});
