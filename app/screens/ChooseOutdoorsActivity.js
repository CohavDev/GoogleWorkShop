import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Circle from "../components/Circle";

function ChooseOutdoorsActivity(props) {
	const pressActivityHandler = (type, icon) => {
		props.navigation.navigate("NewActivityForm", {
			activityType: type,
			activityIcon: icon,
		});
	};
	return (
		<View>
			<View style={styles.mainBackground}>
				{/* <BackgroundImage /> */}

				<View style={styles.leftBackground}>
					<Pressable
						onPress={() => pressActivityHandler("Beach", "beach")}
					>
						<Circle
							style={styles.circleButtonTop}
							text="Beach"
							iconName="beach"
						></Circle>
					</Pressable>
					<Pressable
						onPress={() => pressActivityHandler("Backpacking", "hiking")}
					>
						<Circle
							style={styles.circleButtonMiddle}
							text="Backpacking"
							iconName="hiking"
						></Circle>
					</Pressable>
				</View>

				<View style={styles.rightBackground}>
					<Pressable
						onPress={() =>
							pressActivityHandler("Driving", "car-hatchback")
						}
					>
						<Circle
							text="Driving"
							iconName="car-hatchback"
							style={styles.circleButtonMiddle}
						></Circle>
					</Pressable>
					<Pressable
						onPress={() => pressActivityHandler("Extreme", "airballoon")}
					>
						<Circle
							text="Extreme"
							iconName="airballoon"
							style={styles.circleButtonBottom}
						></Circle>
					</Pressable>
				</View>
			</View>
			<View style={styles.viewTitleText}>
				<Text style={styles.titleText}>Choose your activity</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	backgroundImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		opacity: 0.9,
	},
	viewTitleText: {
		flex: 1,
		position: "absolute",
		left: 10,
		right: 10,
	},

	titleText: {
		color: "black",
		fontSize: 20,
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
		justifyContent: "center",
		height: "100%",
		backgroundColor: "white",
	},
	leftBackground: {
		flexDirection: "column",
		justifyContent: "space-evenly",
		position: "absolute",
		height: "50%",
		top: "21%",
		left: "12%",
	},
	rightBackground: {
		height: "50%",
		top: "21%",
		right: "12%",
		flexDirection: "column",
		justifyContent: "space-evenly",
		position: "absolute",
	},
});

export default ChooseOutdoorsActivity;
