import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    TextInput
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
  import { Picker } from "@react-native-picker/picker";


  export default function EditProfile(props) {
    console.log(props.route.params);
	const DATA = {
        //user data to be edited
	  aboutMe: props.route.params.aboutMe,
	  fullName: props.route.params.fullName,
	  nationality: props.route.params.nationality,
	  nativeLanguage: props.route.params.nativeLanguage,
	  secondLanguage: props.route.params.secondLanguage,
	  phoneNumber: props.route.params.phoneNumber,
	  age: props.route.params.age,
	};

    const userID = firebase.auth().currentUser.uid;
    const allActivitiesRef = firebase.firestore().collection("allActivities");
    const userRef = firebase.firestore().collection("users").doc(userID);
    const [aboutMe , setAboutMe] = useState("")
    const [fullName , setFullName] = useState("")
    const [nationality , setNationality] = useState("")
    const [nativeLanguage , setNativeLanguage] = useState("")
    const [secondLanguage , setSecondLanguage] = useState("")
    const [phoneNumber , setPhoneNumber] = useState("")
    const [formattedDateOfBirth , setformattedDateOfBirth] = useState("")
    const userData = 
        {
            aboutMe: aboutMe,
            fullName: fullName,
            nationality: nationality,
            nativeLanguage: nativeLanguage,
            secondLanguage: secondLanguage,
            phoneNumber: phoneNumber,
            age: getAge(formattedDateOfBirth)
        }
        const onClickAprrove = () => {
            userRef.get().then((result) => {
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
    
        function getAge(formattedDateOfBirth) {
            let dateOfBirth = formattedDateOfBirth.toString();
        
            var day = dateOfBirth.slice(6, 8);
            var month = dateOfBirth.slice(4, 6);
            var year = dateOfBirth.slice(0, 4);
            // i assume the format of the date of birth is : DD/MM/YYYY
            dateOfBirth = "".concat(year, "-", month, "-", day);
            var ageInMilliseconds = new Date() - new Date(dateOfBirth);
            return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
          }
    
          return (
              <View>
                  
              </View>
          )


  }