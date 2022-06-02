import React from "react";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
// import colors from "../app/config/colors";
import BigCircle from "../app/components/BigCircle";
import Circle from "../app/components/Circle";
import BackgroundImage from "../app/components/BackgroungImage";
// import CirclesBackground from '../app/components/CirclesBackground';
import { IconButton, Colors } from "react-native-paper";
import ChooseOutdoorsActivity from "../app/screens/ChooseOutdoorsActivity";
import ChooseIndoorsActivity from "../app/screens/ChooseIndoorsActivity";
import {
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Swiper from "react-native-swiper";

export default function NewBubblesCategories(props) {
	return (
		<Swiper
			from={1}
			minDistanceForAction={0.1}
			controlsProps={{
				dotsTouchable: true,
				prevPos: "left",
				nextPos: "right",
				nextTitle: "",
				prevTitle: "",
				dotsWrapperStyle: { marginBottom: 20 },
				nextTitleStyle: { color: "red", fontSize: 24, fontWeight: "500" },
			}}
			// loop={false}
			// showsPagination={false}
			dot={
				<View
					style={{
						backgroundColor: "white",
						width: 8,
						height: 8,
						borderRadius: 4,
						marginLeft: 3,
						marginRight: 3,
						marginTop: 3,
						marginBottom: 3,
					}}
				/>
			}
			activeDot={
				<View
					style={{
						backgroundColor: "rgb(52, 175, 183)",
						width: 8,
						height: 8,
						borderRadius: 4,
						marginLeft: 3,
						marginRight: 3,
						marginTop: 3,
						marginBottom: 3,
					}}
				/>
			}
		>
			<ChooseIndoorsActivity />
			<ChooseOutdoorsActivity />
		</Swiper>
	);
}

const styles = StyleSheet.create({
	pressableStyle: {
		left: 50,
		top: 30,
		// bottom: 50,
	},
	insideScrollview: {},
	scrollView: {
		borderWidth: 5,
		top: 50,
		width: "100%",
		// flexGrow: 1,
		flex: 1,
	},
	background: {
		borderWidth: 5,
		borderColor: "red",
		// flex: 1,
		flexDirection: "row",
		alignContent: "space-between",
		width: "100%",
		height: "100%",
		// justifyContent: "center",
		// alignItems: "stretch",
		// alignSelf: "flex-end",
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
		flex: 1,
		// justifyContent: "center",
		alignContent: "space-around",
		height: "100%",
	},
	leftBackground: {
		// position: "absolute",
		height: "100%",
		top: "40%",
		left: "45%",
		flexDirection: "column",
		justifyContent: "space-evenly",
	},
	rightBackground: {
		height: "100%",
		top: "40%",
		right: "12%",
		flexDirection: "column",
		justifyContent: "space-evenly",
		// position: "absolute",
	},
});
