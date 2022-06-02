import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config.js";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Pressable,
	FlatList,
	Keyboard,
	TextInput,
} from "react-native";
import ActivityItem from "../components/ActivityItem";
import { Entypo } from "@expo/vector-icons";
import myColors from "../config/colors";

const DATA = [
	{
		key: "1",
		activityIcon: "drinks",
		activityName: "Drinks",
		location: "Tel- Aviv",
		date: "07/05/2022",
	},
	{
		key: "2",
		activityIcon: "bowl",
		activityName: "Restaurant",
		location: "Paris",
		date: "01/08/2022",
	},
	{
		key: "3",
		activityIcon: "moon",
		activityName: "Place To Sleep",
		location: "Tel- Aviv",
		date: "02/06/2022",
	},
	{
		key: "4",
		activityIcon: "drinks",
		activityName: "Drinks",
		location: "New York",
		date: "12/04/2022",
	},
	// {
	//   key: "5",
	//   activityIcon: "drink",
	//   activityName: "Drink",
	//   location: "New York",
	//   date: "12/04/2022",
	// },
	// {
	//   key: "6",
	//   activityIcon: "drink",
	//   activityName: "Drink",
	//   location: "New York",
	//   date: "12/04/2022",
	// },
];

export default function MyActivities({ navigation }) {
	const [myActivities, setMyActivities] = useState([]);
	const allActivitiesRef = firebase.firestore().collection("allActivities");
	const userID = firebase.auth().currentUser.uid;
	const userRef = firebase.firestore().collection("users").doc(userID);

	useEffect(() => {
		allActivitiesRef
			.where("userID", "==", userID)
			.orderBy("createdAt", "desc")
			.onSnapshot(
				(querySnapshot) => {
					const newMyActivities = [];
					// console.log("------------------myactivity before foreach");
					querySnapshot.forEach((doc) => {
						// console.log("my activity inside foreach");
						const activity = doc.data();
						activity.id = doc.id;
						newMyActivities.push(activity);
					});
					// console.log("updated state my activiy");
					setMyActivities(newMyActivities);
				},
				(error) => {
					console.log(error);
				}
			);
	}, []);

	const renderItem = ({ item }) => (
		<ActivityItem
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
			navigation={navigation}
		/>
	);
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>My Current Activities</Text>
			</View>
			<ScrollView>
				<View style={[styles.container, { paddingHorizontal: 15 }]}>
					<FlatList
						data={myActivities}
						keyExtractor={(item) => item.id}
						renderItem={renderItem}
					/>
				</View>
				<Pressable
					android_ripple={{ color: "white" }}
					style={[myColors.circularImage, { marginHorizontal: 15 }]}
					onPress={() => navigation.navigate("NewBubblesCategories")}
				>
					<Entypo name="plus" size={32} color="black"></Entypo>
				</Pressable>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "space-between",
		// alignItems: "center",
		width: myColors.deviceWidth,
	},
	header: {
		width: "100%",
		height: "20%",
		backgroundColor: myColors.secondary,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 15,
	},
	title: {
		color: "black",
		fontSize: 28,
		// fontWeight: "bold",
		//paddingTop: "20%",
		//paddingBottom: 15,
		//top: 20,
	},
});
