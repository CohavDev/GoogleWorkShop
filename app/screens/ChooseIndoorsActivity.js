import React from "react";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import colors from "../config/colors";
import Circle from "../components/Circle";
import BackgroundImage from "../components/BackgroungImage";
//import CirclesBackground from '../components/CirclesBackground';
import { IconButton, Colors } from "react-native-paper";

function ChooseIndoorsActivity(props) {
	const pressActivityHandler = (type, icon) => {
		props.navigation.navigate("NewNewActivityForm", {
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
						onPress={() => pressActivityHandler("Drinks", "glass-wine")}
					>
						<Circle
							style={styles.circleButtonTop}
							text="Drinks"
							iconName="glass-wine"
						></Circle>
					</Pressable>
					{/* <Pressable onPress={() => pressActivityHandler("Hiking", "hiking")}>
            <Circle
              style={styles.circleButtonMiddle}
              text="Backpacking"
              iconName="hiking"
            ></Circle>
          </Pressable> */}
					<Pressable
						onPress={() =>
							pressActivityHandler("Restaurant", "silverware")
						}
					>
						<Circle
							style={styles.circleButtonBottom}
							text="Restaurant"
							iconName="silverware"
						></Circle>
					</Pressable>
					{/* // iconName="noodles"> */}

					<Pressable
						onPress={() => pressActivityHandler("Party", "party-popper")}
					>
						<Circle
							style={styles.circleButtonTop}
							text="Party"
							iconName="party-popper"
						></Circle>
					</Pressable>
				</View>

				<View style={styles.rightBackground}>
					<Pressable
						onPress={() =>
							pressActivityHandler("Concert", "music-clef-treble")
						}
					>
						<Circle
							text="Concert"
							iconName="music-clef-treble"
							style={styles.circleButtonMiddle}
						></Circle>
					</Pressable>

					<Pressable
						onPress={() => pressActivityHandler("Museum", "bank")}
					>
						<Circle
							text="Museum"
							iconName="bank"
							style={styles.circleButtonMiddle}
						></Circle>
					</Pressable>
					<Pressable
						onPress={() =>
							pressActivityHandler("Place_to_sleep", "bunk-bed-outline")
						}
					>
						<Circle
							text="Place to sleep"
							iconName="bunk-bed-outline"
							style={styles.circleButtonBottom}
						></Circle>
					</Pressable>
				</View>
			</View>
			<View style={styles.viewTitleText}>
				{/* <Text style={styles.titleText}>What activity are you looking for?</Text> */}
				<Text style={styles.titleText}>Choose your activity</Text>
				{/* <Text style={styles.titleText}>are looking for</Text> */}
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
		// textAlign: "center",
		position: "absolute",
		// justifyContent: "center",
		// alignItems: "center",
		left: 10,
		right: 10,
	},

	titleText: {
		color: "black",
		fontSize: 20,
		// fontWeight: "bold",
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
	rightBackground: {
		flexDirection: "column",
		justifyContent: "space-evenly",
		position: "absolute",
		height: "75%",
		top: "20%",
		left: "12%",
	},
	leftBackground: {
		height: "75%",
		top: "20%",
		right: "12%",
		flexDirection: "column",
		justifyContent: "space-evenly",
		position: "absolute",
	},
});

export default ChooseIndoorsActivity;
