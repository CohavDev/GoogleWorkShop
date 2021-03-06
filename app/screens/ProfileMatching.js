import {
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config.js";
import myColors from "../config/colors";
import { Pressable, Vibration } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconButton } from "react-native-paper";
import * as Linking from "expo-linking";
import colors from "../config/colors";

export default function ProfileMatching(props) {
	const ONE_SEC_IN_MS = 1000;
	const PATTERN = [
		0.1 * ONE_SEC_IN_MS,
		0.1 * ONE_SEC_IN_MS,
		0.1 * ONE_SEC_IN_MS,
		0.1 * ONE_SEC_IN_MS,
		0.1 * ONE_SEC_IN_MS,
	];
	const params = props.route.params;
	const activityData = {
		startDate: params.startDate,
		endDate: params.endDate,
		type: params.type,
		location: params.location,
		matchedActivityStatus: params.matchedActivityStatus,
		// matchedActivityStatus = "accepted by both"
		// or "accepted only by me"
		// or "accepted only by other user"
		// or "accepted by non of us"
	};
	const otherUserData = {
		activityDocID: params.matchedActivityDocID,
		userID: params.userID,
		fullName: params.fullName,
		dateOfBirth: params.dateOfBirth,
		aboutMe: params.aboutMe,
		profilePic: params.profilePic,
		nativeLanguage: params.nativeLanguage,
		secondLanguage: params.secondLanguage,
		age: params.age,
		phoneNumber: params.phoneNumber,
		nationality: params.nationality,
	};
	const thisUserData = {
		activityDocID: params.myActivityDocID,
	};
	const userID = firebase.auth().currentUser.uid;
	const allActivitiesRef = firebase.firestore().collection("allActivities");
	const openWhatsapp = () => {
		// open whatsapp chat with partner, if supported
		// alert("hey");
		Linking.openURL("https://wa.me/" + otherUserData.phoneNumber);
	};
	const renderButton = () => {
		// render 'match with' text / 'pending' text / whatsapp icon according to matchedActivityStatus
		var matched_status = activityData.matchedActivityStatus;
		status_both = matched_status.localeCompare("accepted by both") == 0;
		status_other =
			matched_status.localeCompare("accepted only by other user") == 0;
		status_only_me = matched_status.localeCompare("accepted only by me") == 0;
		status_none = matched_status.localeCompare("accepted by non of us") == 0;
		if (status_none || status_other) {
			return (
				<View style={styles.buttonContainer}>
					<Pressable
						style={styles.button}
						// onLongPress={() => alert("clicked 'match'!")}
						android_ripple={{ color: "white" }}
						onPressIn={() => {
							Vibration.vibrate(PATTERN);
							console.log("pressed");
							allActivitiesRef.doc(otherUserData.activityDocID).update({
								travelPartnersIDs:
									firebase.firestore.FieldValue.arrayUnion(userID),
							});
						}}
					>
						<AntDesign name="check" size={30} color="white" />
					</Pressable>
					<Text>Match with {otherUserData.fullName}</Text>
					{status_other ? (
						<Text> They are already In!</Text>
					) : (
						<Text></Text>
					)}
				</View>
			);
		}
		if (status_only_me) {
			return (
				<View style={styles.buttonContainer}>
					<Pressable
						style={styles.button}
						android_ripple={{ color: "white" }}
					>
						<Text>Already Requested</Text>
					</Pressable>
				</View>
			);
		} else {
			// status_both == 1
			return (
				<View style={styles.buttonContainer}>
					<Pressable
						style={styles.button}
						android_ripple={{ color: "white" }}
						onPress={openWhatsapp}
					>
						<IconButton icon="whatsapp" color="white" size={32} />
					</Pressable>
					<Text>{otherUserData.fullName} is your Travel Partner!</Text>
				</View>
			);
		}
	};
	return (
		<View style={styles.container}>
			{/* style={styles.profilePicContainer} */}
			<View>
				<LinearGradient
					// Background Linear Gradient
					colors={[myColors.Primary, myColors.Secondary]}
					locations={[0.05, 0.9]}
					style={styles.profilePicContainer}
				>
					<View
						style={{
							width: "100%",
							height: "35%",
							justifyContent: "center",
							alignItems: "center",
                            paddingTop: "10%",
							// top: "5%",
						}}
					>
						<Image
							source={require("../assets/genericProfilePictureEdited.jpg")}
							style={styles.profilePic}
						></Image>
						<Text style={styles.title}>{otherUserData.fullName}</Text>
						<Text style={styles.smallTitle}>
							{otherUserData.nationality + " , " + otherUserData.age}
						</Text>
					</View>
					<View style={styles.profileDetails}>
						<Text style={styles.subTitle}>About me</Text>
						<Text style={styles.subText}>{otherUserData.aboutMe}</Text>
						<Text style={styles.subTitle}>I'm From</Text>
						<Text style={styles.subText}>
							{otherUserData.nationality}
						</Text>
						<View style={[styles.interstContainer, styles.shadowProp]}>
							<Text style={[styles.subTitle, { color: "white" }]}>
								What I'm looking for
							</Text>
							<Text style={[styles.subText, { color: "white" }]}>
								{activityData.type +
									" on " +
									activityData.startDate +
									" at " +
									activityData.location}
							</Text>
						</View>
					</View>
				</LinearGradient>
                        <View style={{paddingTop: "20%", paddingLeft: "0%"}}>
						    {renderButton()}
                        </View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	profileDetails: {
		width: "100%",
		height: "60%",
		// borderWidth: 1,
		// borderColor: "red",
		// bottom: "6%",
		top: "50%",
		paddingTop: "5%",
		backgroundColor: "white",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	testingdeltelater: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 300,
	},
	container: {
        // borderWidth: 2,
		// borderColor: "red",
		backgroundColor: colors.Background,
		width: "100%",
		height: "100%",
	},
	title: {
		color: "white",
		// fontWeight: "bold",
		fontSize: 24,
	},
	smallTitle: {
		color: "white",
		fontWeight: "bold",
		fontSize: 14,
		marginBottom: 10,
	},
	subTitle: {
		color: "#49454F",
		fontWeight: "bold",
		fontSize: 20,
		paddingLeft: 15,
	},
	subText: {
		color: "gray",
		fontSize: 16,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 15,
		top: 4,
	},
	profilePic: {
		width: 128,
		height: 128,
		borderRadius: 64,
		margin: "5%",
		// top: "30%",
	},
	profilePicContainer: {
        // borderWidth: 5,
		// borderColor: "red",
		width: "100%",
		height: "40%",
		// borderWidth: 1,
		// borderColor: "pink",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: "15%",
		// top: "10%",
		marginBottom: "10%",
	},
	interstContainer: {
        // borderWidth: 2,
		// borderColor: "red",
		borderRadius: 10,
		// shadowColor: "black",
		backgroundColor: myColors.Primary,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 15,
		paddingVertical: 10,
		top: "30%",
        // height: "50%",
	},
	button: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: myColors.Primary,
	},
	buttonContainer: {
        width: "100%",
		// height: "20%",
        // borderWidth: 1,
		// borderColor: "blue",
		// display: "flex",
		justifyContent: "center",
		alignItems: "center",
		// flexGrow: 1,
		// top: "200%",
        paddingTop: "50%",
        // position: "absolute",
	},
	shadowProp: {
		shadowColor: "#171717",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 5,
	},
});
