import {
	FlatList,
	Keyboard,
	TextInput,
	StyleSheet,
	Text,
	View,
	ScrollView,
	Pressable,
	Button,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import Circle from "../components/Circle";
  import { AntDesign } from "@expo/vector-icons";
  import ApprovalItem from "../components/ApprovalItem";
  import { Entypo } from "@expo/vector-icons";
  import myColors from "../config/colors";
  import { firebase } from "../firebase/config.js";
  import ActivityDetailsComponent from "../components/UploadedActivityDetailsComponent";
  import colors from "../config/colors";
  
  export default function ApproveActivity(props) {
	console.log(props.route.params);
	const DATA = {
	  // type: props.navigation.getParam("type"),
	  type: props.route.params.type,
	  // icon: props.navigation.getParam("icon"),
	  icon: props.route.params.icon,
	  // location: props.navigation.getParam("location"),
	  location: props.route.params.location,
	  // startDate: props.navigation.getParam("startDate"),
	  startDate: props.route.params.startDate,
	  // endDate: props.navigation.getParam("startDate"),
	  endDate: props.route.params.endDate,
	  // time: props.navigation.getParam("time"),
	  time: props.route.params.time,
	  // languages: props.navigation.getParam("languages", "english"),
	  languages: props.route.params.languages,
	};
  
	const allActivitiesRef = firebase.firestore().collection("allActivities");
	const userID = firebase.auth().currentUser.uid;
	const userRef = firebase.firestore().collection("users").doc(userID);
	const travelPartnersIDs = [];
	const status = "waiting";
	const tmpArray = JSON.parse(DATA.languages);
	const languagesArray = [];
	const matchedActivityID = "";
	var day = "";
	var month = "";
	var year = "";
  
	for (const element of tmpArray) {
	  languagesArray.push(element.item);
	}
	const languagesString = languagesArray.join(", ");
	const onClickAprrove = () => {
	  userRef.get().then((result) => {
		//setUserFormattedDateOfBirth(result.data().formattedDateOfBirth)
		const userFormattedDateOfBirth = result.data().formattedDateOfBirth;
		const timestamp = firebase.firestore.FieldValue.serverTimestamp();
		day = DATA.startDate.slice(0, 2);
		month = DATA.startDate.slice(3, 5);
		year = DATA.startDate.slice(6, 10);
		// i assume the format of the date of birth is : DD/MM/YYYY
		const formattedStartDate = parseInt("".concat(year, month, day));
		day = DATA.endDate.slice(0, 2);
		month = DATA.endDate.slice(3, 5);
		year = DATA.endDate.slice(6, 10);
		// i assume the format of the date of birth is : DD/MM/YYYY
		const formattedEndDate = parseInt("".concat(year, month, day));
		const activityData = {
		  userID: userID,
		  createdAt: timestamp,
		  type: DATA.type,
		  startDate: DATA.startDate,
		  formattedStartDate: formattedStartDate,
		  endDate: DATA.endDate,
		  formattedEndDate: formattedEndDate,
		  time: DATA.time,
		  userFormattedDateOfBirth: userFormattedDateOfBirth,
		  location: DATA.location,
		  languages: languagesArray,
		  travelPartnersIDs: travelPartnersIDs,
		  matchedActivityID: matchedActivityID,
		  status: status,
		};
		allActivitiesRef
		  .add(activityData)
		  .then(() => {
			props.navigation.navigate("MyActivities");
		  })
		  .catch((error) => {
			alert(error);
		  });
	  });
	  // setUserFormattedDateOfBirth(userRef.get('formattedDateOfBirth'))
	};
	return (
	  <View
		style={{
		  backgroundColor: colors.Secondary,
		  height: "100%",
		  paddingBottom: "0%",
		  // borderWidth: 2,
		  // borderColor: "red",
		  // paddingTop: "-0%",
		}}
	  >
		<View style={{ bottom: "0%", height: "80%" }}>
		  <ActivityDetailsComponent
			type={DATA.type}
			icon={DATA.icon}
			location={DATA.location}
			startDate={DATA.startDate}
			endDate={DATA.endDate}
			languages={languagesString}
			time={DATA.time}
		  />
		</View>
		<View style={styles.buttonsContainer}>
		  <Pressable
			style={styles.buttonStyle}
			onLongPress={() => alert("clicked 'edit'")}
			android_ripple={{ color: "white" }}
			onPress={() => props.navigation.goBack()}
		  >
			<Text style={{ color: "white", fontSize: 16 }}>Edit</Text>
		  </Pressable>
		  <Pressable
			style={styles.buttonStyle}
			onLongPress={() => alert("clicked 'approve'")}
			android_ripple={{ color: "white" }}
			onPress={onClickAprrove}
		  >
			<Text style={{ color: "white", fontSize: 16 }}>Approve</Text>
		  </Pressable>
		</View>
	  </View>
	);
  }
  
  const styles = StyleSheet.create({
	buttonsContainer: {
	  width: "100%",
	  height: "20%",
	  // borderWidth: 1,
	  // borderColor: "red",
	  flexDirection: "row",
	  justifyContent: "space-evenly",
	  bottom: 0,
	  paddingTop: "5%",
	  backgroundColor: colors.Background,
	  // borderWidth: 3,
	  // borderColor: "yellow",
	  // position: "absolute",
	},
	buttonStyle: {
	  width: 120,
	  height: 50,
	  elevation: 5,
	  backgroundColor: colors.Primary,
	  alignItems: "center",
	  justifyContent: "center",
	  borderRadius: 15,
	},
	mainContainer: {
	  width: "100%",
	  height: "100%",
	  // justifyContent: "flex-start",
	  // alignItems: "center",
	},
	activityTypeContainer: {
	  // borderWidth: 1,
	  width: "100%",
	  height: "25%",
	  // top: 30,
	  flexDirection: "row",
	  justifyContent: "space-around",
	  alignItems: "baseline",
	  // alignContent: "space-between",
	},
	activityTypeTextContainer: {
	  // alignSelf: "stretch",
	  justifyContent: "flex-start",
	},
	activityTypeText: {
	  fontSize: 18,
	  fontWeight: "bold",
	},
	activityDetailsText: {
	  fontSize: 16,
	  fontWeight: "bold",
	},
	activityDetailsContainer: {
	  // borderWidth: 1,
	  // borderColor: "red",
	  width: "100%",
	  height: "55%",
	  top: 20,
	},
	titlesStyle: {
	  fontSize: 14,
	},
	location: {
	  top: 40,
	},
	date: {
	  // borderWidth: 1,
	  top: 80,
	  // right: 20,
	  flexDirection: "row",
	  // justifyContent: "space-evenly",
	},
	time: {
	  // borderWidth: 1,
	  top: 120,
	  // right: 20,
	  // justifyContent: "space-evenly",
	},
	languages: {
	  top: 160,
	  // right: 20,
	  // justifyContent: "space-evenly",
	},
  });
  



// the original code wwas commented out at the 10.8.22
// instead, i copy pasted the code from NewApproveActivity from the
// Hila's folder

// import {
// 	FlatList,
// 	Keyboard,
// 	TextInput,
// 	StyleSheet,
// 	Text,
// 	View,
// 	ScrollView,
// 	Pressable,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { AntDesign } from "@expo/vector-icons";
// import ApprovalItem from "../components/ApprovalItem";
// import { Entypo } from "@expo/vector-icons";
// import myColors from "../config/colors";
// import { firebase } from "../firebase/config.js";
// import ActivityDetailsComponent from "../components/ActivityDetailsComponent";

// function getLang(languagesObj){

// }

// export default function ApproveActivity(props) {
// 	/*  <ApprovalItem
//             {...{
//               activityIcon: "users",
//               approvedInfo: "How\nmany",
//               data: "2-4",
//             }}
//           />
//  */
// 	const DATA = {
// 		// type: props.navigation.getParam("type"),
// 		type: props.route.params.type,
// 		// icon: props.navigation.getParam("icon"),
// 		icon: props.route.params.icon,
// 		// location: props.navigation.getParam("location"),
// 		location: props.route.params.location,
// 		// startDate: props.navigation.getParam("startDate"),
// 		startDate: props.route.params.startDate,
// 		// endDate: props.navigation.getParam("startDate"),
// 		endDate: props.route.params.endDate,
// 		// time: props.navigation.getParam("time"),
// 		time: props.route.params.time,
// 		// languages: props.navigation.getParam("languages", "english"),
// 		languages: props.route.params.languages,
// 	};
//     // console.log(JSON.stringify(DATA.languages))
//     // const arrLang = DATA.languages.map((language) => language.item);
//     // console.log(arrLang)


// 	// console.log(DATA.languages.map((item, i) => {
//     //     return item.language
//     //   }));

// 	// console.log(DATA.languages.map((item, index)=>{'$item.item'}))
// 	//const [userFormattedDateOfBirth, setUserFormattedDateOfBirth] = useState('')
// 	//const [entities, setEntities] = useState([])
// 	const allActivitiesRef = firebase.firestore().collection("allActivities");
// 	const userID = firebase.auth().currentUser.uid;
// 	const userRef = firebase.firestore().collection("users").doc(userID);
// 	const travelPartnersIDs = []
// 	const status = 'waiting'
// 	const tmpArray = JSON.parse(DATA.languages)
// 	const languagesArray = []
// 	const matchedActivityID = ''

// 	for(const element of tmpArray){
// 		languagesArray.push(element.item)
// 	}
// 	const languagesString = languagesArray.join(', ')


// 	// useEffect(() => {
// 	//   userRef
// 	//       .where("id", "==", userID)
// 	//       .orderBy('createdAt', 'desc')
// 	//       .onSnapshot(
// 	//           querySnapshot => {
// 	//               const newEntities = []
// 	//               querySnapshot.forEach(doc => {
// 	//                   const user = doc.data()
// 	//                   user.formattedDateOfBirth = doc.formattedDateOfBirth
// 	//                   console.log(user.formattedDateOfBirth)
// 	//                   newEntities.push(user)
// 	//               });
// 	//               setEntities(newEntities)
// 	//           },
// 	//           error => {
// 	//               console.log(error)
// 	//           }
// 	//       )
// 	//   }, [])

// 	//failed tries to read the field 'formattedDateOfBirth':

// 	// try number 1: tempUserFormattedDateOfBirth = userRef.get("formattedDateOfBirth")
// 	// try number 2:
// 	// const tempUserFormattedDateOfBirth = userRef.get()
// 	//   .then(doc => {
// 	//     return doc.data().formattedDateOfBirth;
// 	//   })
// 	//   .catch(err => {
// 	//     console.log('Error getting document', err);
// 	//   });

// 	return (
// 		<View style={styles.container}>
// 			<View style={styles.header}>
// 				<Text style={styles.title}>Approve Activity</Text>
// 			</View>
// 			<ScrollView>
// 				<View style={[styles.container, { paddingHorizontal: 15 }]}>
// 					<ApprovalItem
// 						{...{
// 							activityIcon: DATA.icon,
// 							approvedInfo: "Activity\nType",
// 							data: DATA.type,
// 						}}
// 					/>
// 					<ApprovalItem
// 						{...{
// 							activityIcon: "calendar",
// 							approvedInfo: "Date",
// 							data: DATA.date,
// 						}}
// 					/>
// 					<ApprovalItem
// 						{...{
// 							activityIcon: "clock",
// 							approvedInfo: "Time",
// 							data: DATA.time,
// 						}}
// 					/>
// 					<ApprovalItem
// 						{...{
// 							activityIcon: "map-marker",
// 							approvedInfo: "Location",
// 							data: DATA.location,
// 						}}
// 					/>
// 					<ApprovalItem
// 						{...{
// 							activityIcon: "translate",
// 							approvedInfo: "Languages",
// 							//   data: Array(DATA.languages).forEach((item)=>{item})
// 							//   data: DATA.languages
//                             data: languagesString
// 						}}
// 					/>
// 				</View>
// 			</ScrollView>
// 			<View style={styles.buttonContainer}>
// 				<Pressable
// 					style={styles.approveButton}
// 					onLongPress={() => alert("clicked 'approve'")}
// 					android_ripple={{ color: "white" }}
// 					onPress={() => {
// 						userRef.get().then((result) => {
// 							//setUserFormattedDateOfBirth(result.data().formattedDateOfBirth)
// 							const userFormattedDateOfBirth =
// 								result.data().formattedDateOfBirth;
// 							const timestamp =
// 								firebase.firestore.FieldValue.serverTimestamp();
// 							const activityData = {
// 								userID: userID,
// 								createdAt: timestamp,
// 								type: DATA.type,
// 								startDate: DATA.startDate,
// 								endDate: DATA.endDate,
// 								time: DATA.time,
// 								userFormattedDateOfBirth: userFormattedDateOfBirth,
// 								location: DATA.location,
// 								languages: languagesArray,
// 								travelPartnersIDs: travelPartnersIDs,
// 								matchedActivityID: matchedActivityID,
// 								status: status,
// 							};
// 							allActivitiesRef
// 								.add(activityData)
// 								.then(() => {
// 									props.navigation.navigate("MyActivities");
// 								})
// 								.catch((error) => {
// 									alert(error);
// 								});
// 						});
// 						// setUserFormattedDateOfBirth(userRef.get('formattedDateOfBirth'))
// 					}}
// 				>
// 					<AntDesign name="check" size={30} color="white" />
// 					<Text style={styles.ButtonText}>Approve</Text>
// 				</Pressable>
// 			</View>

// 			<View style={styles.buttonContainer}>
// 				<Pressable
// 					style={styles.editButton}
// 					onLongPress={() => alert("clicked 'edit'")}
// 					android_ripple={{ color: "white" }}
// 					onPress={() => props.navigation.navigate("NewActivityForm")}
// 				>
// 					<AntDesign name="edit" size={30} color="white" />
// 					<Text style={styles.ButtonText}>Edit</Text>
// 				</Pressable>
// 			</View>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flexDirection: "column",
// 		justifyContent: "space-between",
// 		// alignItems: "center",
// 		width: myColors.deviceWidth,
// 	},
// 	headerContainer: {
// 		width: "100%",
// 		height: "20%",
// 		backgroundColor: "transparent",
// 		//alignSelf: "center",
// 		justifyContent: "center",
// 		alignItems: "center",
// 		//height: 70,
// 		//left: 20,
// 		//right: 20,
// 		//position: "absolute",
// 	},
// 	header: {
// 		//color: "black",
// 		//top: 0,
// 		////fontWeight: "bold",
// 		//fontSize: 28,
// 		//// justifyContent: 'center',
// 		////padding: 40,
// 		width: "100%",
// 		height: "20%",
// 		backgroundColor: myColors.secondary,
// 		alignItems: "center",
// 		justifyContent: "center",
// 		marginBottom: 15,
// 	},
// 	title: {
// 		color: "black",
// 		fontSize: 28,
// 		//fontWeight: "bold",
// 		//paddingTop: "20%",
// 		//paddingBottom: 15,
// 	},
// 	buttonContainer: {
// 		display: "flex",
// 		justifyContent: "center",
// 		alignItems: "center",
// 		flexGrow: 1,
// 	},
// 	approveButton: {
// 		width: 60,
// 		height: 60,
// 		borderRadius: 30,
// 		position: "absolute",
// 		left: 60,
// 		bottom: -125,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		backgroundColor: myColors.checkButtonColor,
// 	},
// 	editButton: {
// 		width: 60,
// 		height: 60,
// 		borderRadius: 30,
// 		position: "absolute",
// 		right: 60,
// 		bottom: -115,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		backgroundColor: myColors.editButtonColor,
// 	},
// 	ButtonText: {
// 		fontSize: 14,
// 		color: "black",
// 		fontWeight: "bold",
// 		alignSelf: "center",
// 		position: "absolute",
// 		top: 70,
// 	},
// 	setFontSizeOne: {
// 		fontWeight: "bold",
// 		fontSize: 15, // Define font size here in Pixels
// 	},
// 	setFontSizeTwo: {
// 		fontWeight: "bold",
// 		fontSize: 20, // Define font size here in Pixels
// 	},
// 	setFontSizeThree: {
// 		fontWeight: "bold",
// 		fontSize: 25, // Define font size here in Pixels
// 	},
// 	setFontSizeFour: {
// 		fontWeight: "bold",
// 		fontSize: 30, // Define font size here in Pixels
// 	},
// });
