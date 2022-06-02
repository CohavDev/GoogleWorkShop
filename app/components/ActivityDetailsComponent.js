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
import Circle from "./Circle";
import { AntDesign } from "@expo/vector-icons";
import ApprovalItem from "./ApprovalItem";
import { Entypo } from "@expo/vector-icons";
import myColors from "../config/colors";
import { firebase } from "../firebase/config.js";

export default function ActivityDetailsComponent(props) {
	const DATA = {
		// type: props.navigation.getParam("type"),
		type: props.type,
		// icon: props.navigation.getParam("icon"),
		icon: props.icon,
		// location: props.navigation.getParam("location"),
		location: props.location,
		// startDate: props.navigation.getParam("startDate"),
		startDate: props.startDate,
		// endDate: props.navigation.getParam("startDate"),
		endDate: props.endDate,
		// time: props.navigation.getParam("time"),
		time: props.time,
		// languages: props.navigation.getParam("languages", "english"),
		languages: props.languages,
	};

	// const allActivitiesRef = firebase.firestore().collection("allActivities");
	// const userID = firebase.auth().currentUser.uid;
	// const userRef = firebase.firestore().collection("users").doc(userID);
	// const travelPartnersIDs = [];
	// const status = "waiting";

	// const tmpArray = JSON.parse(languages); //changed from DATA.languages
	// const languagesArray = [];
	// const matchedActivityID = "";

	// for (const element of tmpArray) {
	// 	languagesArray.push(element.item);
	// }
	// const languagesString = languagesArray.join(", ");
	return (
		<View style={styles.mainContainer}>
			<View style={styles.activityTypeContainer}>
				<Text style={styles.activityTypeText}>{DATA.type}</Text>
				<View style={{ top: 30 }}>
					<Circle iconName={DATA.icon} />
				</View>
			</View>
			<View style={styles.activityDetailsContainer}>
				<View style={{ top: 10, left: 25 }}>
					<Text>Activity details:</Text>
					{/*activity location*/}
					<View style={styles.location}>
						<Text style={styles.activityDetailsText}>
							{DATA.location}
						</Text>
					</View>
					{/*activity date*/}
					<View style={styles.date}>
						<View
							style={{
								left: 0,
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Text style={styles.titlesStyle}>From:  </Text>
							<Text style={styles.activityDetailsText}>
								{DATA.startDate}
							</Text>
						</View>

						<View
							style={{
								left: 40,
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Text style={styles.titlesStyle}>To:  </Text>
							<Text style={styles.activityDetailsText}>
								{DATA.endDate}
							</Text>
						</View>
					</View>
					{/*Activity time*/}
					<View style={styles.time}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Text style={styles.titlesStyle}>When:  </Text>
							<Text style={styles.activityDetailsText}>{DATA.time}</Text>
						</View>
					</View>
					{/*Activity languages*/}
					<View style={styles.languages}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "flex-start",
							}}
						>
							<Text style={styles.titlesStyle}>Languages:{"  "}</Text>
							<View style={{ width: "60%" }}>
								<Text style={styles.activityDetailsText}>
									{DATA.languages}
								</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
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
		top: 0,
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
		top: 0,
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
		// borderWidth: 1,
		top: 160,
		// right: 20,
		// justifyContent: "space-evenly",
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		top: 20,
	},
	buttonStyle: {
		width: 100,
		height: 30,
		elevation: 5,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 12,
	},
});
