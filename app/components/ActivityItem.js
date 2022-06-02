import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import myColors from "../config/colors";
export default function ActivityItem(props) {
	const iconsMap = {
		Drinks: "glass-wine",
		Backpacking: "hiking",
		Restaurant: "silverware",
		Party: "party-popper",
		Driving: "car-hatchback",
		Place_to_sleep: "bunk-bed-outline",
		Concert: "music-clef-treble",
		Museum: "bank",
		Beach: "beach",
		Extreme: "airballon",
	};
	return (
		<Pressable
			style={[
				styles.shadowProp,
				{ backgroundColor: "white", marginBottom: 15, width: "100%" },
			]}
			android_ripple={{ color: "#C9CBD7" }}
			onPress={() =>
				props.navigation.navigate("MatchesScreen", {
					navigation: props.navigation, // TODO: pass navigation in a differnent way(setOptions)
					activityType: props.activityType,
					location: props.location,
					startDate: props.startDate,
					endDate: props.endDate,
					time: props.time,
					languages: props.languages,
					travelPartnersIDs: props.travelPartnersIDs,
					userFormattedDateOfBirth: props.userFormattedDateOfBirth,
					activityID: props.activityID,
				})
			}
		>
			{/* <View style={{flexDirection: "row"}}> */}
			<View style={styles.container}>
				{/* <View style={styles.imageContainer}> */}
				<View
					style={styles.circularImage}
					// source={require("../assets/mountain_track_small.jpg")}
				>
					{/* <Entypo name={iconsMap.hiking} size={32} color="white" /> */}
					<IconButton
						icon={iconsMap[props.activityType]}
						color="black"
						size={32}
					/>
				</View>
				{/* </View> */}
				<View style={styles.dataContainer}>
					<Text>{props.activityType}</Text>
					<Text>
            {"From: " + props.startDate + "\nTo: " + props.endDate}
          </Text>
					{/* <Text>{props.time}</Text> */}
					<Text>{props.location}</Text>
				</View>
				<View style={styles.matchCountContainer}>
					<Text>Matches</Text>
					<Text>10</Text>
				</View>
			</View>
			{/* </View> */}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		height: 100,
		// direction: "rtl",
	},
	imageContainer: {
		// alignItems: "center",
		// justifyContent: "center",
		paddingHorizontal: 15,
	},
	circularImage: {
		left: 15,
		height: 70,
		width: 70,
		borderRadius: 35,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	dataContainer: {
		// marginVertical: 15,
		width: "60%",
		paddingHorizontal: 25,
        // alignItems: "center",
		// bottom: 10,
		// justifyContent: "center",
        // alignContent: "center",
	},
	matchCountContainer: {
		// marginVertical: 15,
		// paddingHorizontal: 15,
		// left: 20,
		right: 20,
		alignItems: "center",
		// marginLeft: "auto",
		justifyContent: "center",
		// backgroundColor: "gray",
	},
	shadowProp: {
		shadowColor: "#171717",
		// shadowOffset: { width: -2, height: 4 },
		// shadowOpacity: 0.2,
		// shadowRadius: 3,
		elevation: 5,
	},
});
