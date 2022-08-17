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
  
  export default function ProfileMatching({ navigation }) {

    
    const userID = firebase.auth().currentUser.uid;
    const allActivitiesRef = firebase.firestore().collection("allActivities");
    const userRef = firebase.firestore().collection("users").doc(userID);
    const [condElement, setCondElement] = useState(params.matchedActivityStatus);
    // const [aboutMe , setAboutMe] = useState("")
    // const [fullName , setFullName] = useState("")
    // const [nationality , setNationality] = useState("")
    // const [nativeLanguage , setNativeLanguage] = useState("")
    // const [secondLanguage , setSecondLanguage] = useState("")
    // const [phoneNumber , setPhoneNumber] = useState("")

    // useEffect(() => {
    //     userRef.get().then((userData) => {
    //         setAboutMe(userData.get("aboutMe"));
    //         setFullName(userData.get("fullName"));
    //         setNationality(userData.get("nationality"));
    //         setNativeLanguage(userData.get("nativeLanguage"));
    //         setSecondLanguage(userData.get("secondLanguage"));
    //         setPhoneNumber(userData.get("phoneNumber"));
    //     });
    //   }, []);
  
    
    return (
        userRef.get().then((data) => {
        const userData = 
        {
            aboutMe: data.get("aboutMe"),
            fullName: data.get("fullName"),
            nationality: data.get("nationality"),
            nativeLanguage: data.get("nativeLanguage"),
            secondLanguage: data.get("secondLanguage"),
            phoneNumber: data.get("phoneNumber")

        };
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
                <Text style={styles.title}>{userData.fullName}</Text>
                <Text style={styles.smallTitle}>
                    {otherUserData.nationality + " , " + userData.age}
                </Text>
                </View>
                <View style={styles.profileDetails}>
                <Text style={styles.subTitle}>About me</Text>
                <Text style={styles.subText}>{userData.aboutMe}</Text>
                <Text style={styles.subTitle}>I'm From</Text>
                <Text style={styles.subText}>{userData.nationality}</Text>
                <View style={[styles.interstContainer, styles.shadowProp]}>
                    
                </View>
                </View>
            </LinearGradient>
            <View style={{ paddingTop: "20%", paddingLeft: "0%" }}>
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={styles.button}
                        android_ripple={{ color: "white" }}
                        // onPress={openWhatsapp}
                    >
                        <IconButton icon="whatsapp" color="white" size={32} />
                    </Pressable>
                    <Text>Edit Profile</Text>
                </View>
            </View>
            </View>
        </View>
        })
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
  