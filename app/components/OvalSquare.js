import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
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
        // flex: 1,
		color: "black",
		fontSize: 16,
        alignSelf: "center",
        textAlign: "center",
        // justifyContent: "center",
		// fontWeight: "bold",
	},
	ovalShape: {
		backgroundColor: "white",
		width: EDGE,
		height: EDGE,
		borderRadius: EDGE / 8,
		bottom: 20,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		// shadowColor: "black",
		// shadowOffset: { width: EDGE, height: EDGE },
		// shadowOpacity: 0.2,
		// shadowRadius: EDGE,
		elevation: 10,
		//top: 50,
		//margin: -10,
		//alignContent: 'center',
		// position: 'absolute',
	},
});
