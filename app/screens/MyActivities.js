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
import colors from "../config/colors";

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
		// <View style={{backgroundColor: colors.background}}>

		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={colors.title}>Occurring Activities</Text>
			</View>

			<ScrollView style={{top: "5%",}}>
				<View style={styles.scrollviewContainer}>
					<FlatList
						data={myActivities}
						keyExtractor={(item) => item.id}
						renderItem={renderItem}
					/>
				</View>
			</ScrollView>
			<Pressable
				android_ripple={{ color: "white" }}
				style={[
					myColors.circularImage,
					{ marginHorizontal: 0, left: "75%", bottom: 5 },
				]}
				onPress={() => navigation.navigate("NewBubblesCategories")}
			>
				<Entypo name="plus" size={32} color="white"></Entypo>
			</Pressable>
		</View>
		// </View>
	);
}

const styles = StyleSheet.create({
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
	header: {
		top: "5%",
        bottom: "20%",
		width: "90%",
		height: "5%",
		left: "5%",
		backgroundColor: colors.Background,
		alignItems: "flex-start",
		justifyContent: "flex-start",
		borderBottomWidth: 1,
		borderBottomColor: "black",
		marginBottom: 15,
	},
	// title: {
	// 	// color: colors.grey,
    //     color: "black",
	// 	fontSize: 15,
	// },
});
