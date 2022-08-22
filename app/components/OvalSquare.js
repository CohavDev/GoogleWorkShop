import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";

const EDGE = 120;

export default function OvalSquare(props) {
	return (
		<View style={styles.ovalShape}>
			<Text style={styles.textStyle}>{props.text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	textStyle: {
		color: "white",
		fontSize: 16,
        alignSelf: "center",
        textAlign: "center",
	},
	ovalShape: {
		backgroundColor: "white",
        backgroundColor: colors.Primary,
		width: EDGE,
		height: EDGE,
		borderRadius: EDGE / 8,
		bottom: 20,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		elevation: 10,
	},
});
