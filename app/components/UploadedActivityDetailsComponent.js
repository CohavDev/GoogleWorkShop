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
import BigCircle from "./BigCircle";
import colors from "../config/colors";

export default function UploadedActivityDetailsComponent(props) {
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
	const [condDate, setCondDate] = useState(
		props.type == "Place to sleep" || props.type == "Backpacking"
	);

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
				<View style={{ top: 0 }}>
					<BigCircle iconName={DATA.icon} />
				</View>
			</View>
			<View style={styles.activityDetailsContainer}>
				<View
					style={{
						top: "5%",
						left: "5%",
						right: "5%",
						alignContent: "space-around",
						height: "80%",
					}}
				>
					<View>
						<Text style={styles.bigTitlesStyle}>Activity details:</Text>
					</View>
					<View
						style={{
							top: "5%",
							left: "5%",
							right: "5%",
							// alignItems: "stretch",
							height: "80%",
							display: "flex",
							justifyContent: "space-around",
							// alignItems: "flex-start",
						}}
					>
						{/*activity location*/}
						<View style={styles.location}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<Text style={styles.titlesStyle}>Location: </Text>
								<Text style={styles.activityDetailsText}>
									{DATA.location}
								</Text>
							</View>
						</View>
						{/*activity date*/}
						<View style={styles.date}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								{condDate && (
									<Text style={styles.titlesStyle}>From: </Text>
								)}
								{!condDate && (
									<Text style={styles.titlesStyle}>Date: </Text>
								)}
								<Text style={styles.activityDetailsText}>
									{DATA.startDate}
								</Text>
							</View>

							<View
								style={{
									left: 55,
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								{/* <Text style={styles.titlesStyle}>To: </Text>
              <Text style={styles.activityDetailsText}>{DATA.endDate}</Text> */}
								{condDate && (
									<Text style={styles.titlesStyle}>To: </Text>
								)}
								{condDate && (
									<Text style={styles.activityDetailsText}>
										{DATA.endDate}
									</Text>
								)}
							</View>
						</View>
						{/*Activity time*/}
						{!condDate && (
							<View style={styles.time}>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<Text style={styles.titlesStyle}>When: </Text>
									<Text style={styles.activityDetailsText}>
										{DATA.time}
									</Text>
								</View>
							</View>
						)}

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
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		// borderWidth: 1,
		// borderColor: "pink",
		width: "100%",
		height: "70%",
		// bottom: "30%",
		// top: "10%",
		// backgroundColor: colors.Background,
		// justifyContent: "space-evenly",
		// alignItems: "flex-start",
	},
	activityTypeContainer: {
		// borderWidth: 1,
		// borderColor: "red",
		width: "100%",
		height: "45%",
		// paddingBottom: "15%",
		backgroundColor: colors.Secondary,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "flex-start",
		paddingTop: "15%",
		marginBottom: "10%",
		// alignContent: "space-between",
	},
	activityTypeTextContainer: {
		// alignSelf: "stretch",
		// justifyContent: "flex-start",
		// alignItems: "flex-start",
	},
	activityTypeText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
	activityDetailsText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	activityDetailsContainer: {
		// borderWidth: 1,
		// borderColor: "red",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		// borderTopColor: "red",
		backgroundColor: colors.Background,
		width: "100%",
		height: "100%",
		paddingTop: "10%",
		paddingLeft: "5%",
		// paddingRight: "5%",
		// alignContent: "space-between",
		// paddingBottom: "10%",
		// top: "10%",
	},
	titlesStyle: {
		fontSize: 14,
	},
	bigTitlesStyle: {
		fontSize: 17,
	},
	location: {
		// top: "10%",
		marginRight: "15%",
	},
	date: {
		// borderWidth: 1,
		// top: "20%",
		// right: 20,
		flexDirection: "row",
		// justifyContent: "space-evenly",
	},
	time: {
		// borderWidth: 1,
		// top: "30%",
		// right: 20,
		// justifyContent: "space-evenly",
	},
	languages: {
		// borderWidth: 1,
		// top: "40%",
		// right: 20,
		// justifyContent: "space-evenly",
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		top: 20,
		// backgroundColor: colors.Background,
	},
	buttonStyle: {
		width: 100,
		height: 30,
		elevation: 5,
		// backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 12,
	},
});
