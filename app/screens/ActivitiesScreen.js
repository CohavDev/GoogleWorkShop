import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Pressable,
	FlatList,
} from "react-native";
import OccuringActivityItem from "../components/OccurringActivityItem";
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
	
];

export default function ActivitiesScreen({ navigation }) {
	const [myOccuringActivities, setMyOccuringActivities] = useState([]);

	const renderOccuringActivity = ({ item }) => (
		<OccuringActivityItem
			activityIcon={item.activityIcon}
			activityType={item.activityName}
			date={item.date}
			location={item.location}
			navigation={navigation}
		/>
	);
	return (
		<View style={styles.container}>
			<View style={[styles.container, { paddingHorizontal: 15 }]}>
				<FlatList
					data={DATA}
					keyExtractor={(item) => item.key}
					renderItem={renderOccuringActivity}
				/>
			</View>
			<View>
				<Pressable
					android_ripple={{ color: "white" }}
					style={[myColors.circularImage, { marginHorizontal: 15 }]}
					onPress={() => navigation.navigate("ChooseActivityBubbles")}
				></Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		width: 330,
	},
	header: {
		width: "25%",
		height: "20%",
		backgroundColor: myColors.secondary,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 15,
	},
	title: {
		color: "black",
		fontSize: 28,
	},
});
