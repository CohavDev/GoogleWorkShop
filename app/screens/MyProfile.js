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

export default function MyProfile(props) {
  const userID = firebase.auth().currentUser.uid;
  const allActivitiesRef = firebase.firestore().collection("allActivities");
  const userRef = firebase.firestore().collection("users").doc(userID);
  const [aboutMe, setAboutMe] = useState("");
  const [fullName, setFullName] = useState("");
  const [nationality, setNationality] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [secondLanguage, setSecondLanguage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedDateOfBirth, setformattedDateOfBirth] = useState("");
  const [renderAgain, setRenderAgain] = useState(false);
  const userData = {
    aboutMe: aboutMe,
    fullName: fullName,
    nationality: nationality,
    nativeLanguage: nativeLanguage,
    secondLanguage: secondLanguage,
    phoneNumber: phoneNumber,
    age: getAge(formattedDateOfBirth),
  };
  const refresh = () => {
    console.log("refresh my profile");
    setRenderAgain(!renderAgain);
  };
  useEffect(() => {
    console.log("fetched data for my profile view");
    userRef.get().then((data) => {
      setAboutMe(data.get("aboutMe"));
      setFullName(data.get("fullName"));
      setNationality(data.get("nationality"));
      setNativeLanguage(data.get("nativeLanguage"));
      setSecondLanguage(data.get("secondLanguage"));
      setPhoneNumber(data.get("phoneNumber"));
      setformattedDateOfBirth(data.get("formattedDateOfBirth"));
    });
  }, [renderAgain]);
  const onPressEdit = () => {
    props.navigation.navigate("EditProfile", {
      onGoBack: refresh,
    });
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
    // userRef.get().then((data) => {
    // const userData =
    // {
    //     aboutMe: data.get("aboutMe"),
    //     fullName: data.get("fullName"),
    //     nationality: data.get("nationality"),
    //     nativeLanguage: data.get("nativeLanguage"),
    //     secondLanguage: data.get("secondLanguage"),
    //     phoneNumber: data.get("phoneNumber")

    // };
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
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.subTitle}>About me</Text>
            <Text style={styles.subText}>{userData.aboutMe}</Text>
            <Text style={styles.subTitle}>I'm From</Text>
            <Text style={styles.subText}>{userData.nationality}</Text>
            <Text style={styles.subTitle}>Phone Number</Text>
            <Text style={styles.subText}>{userData.phoneNumber}</Text>
            <Text style={styles.subTitle}>Spoken Languages</Text>
            <Text style={styles.subText}>
              {userData.nativeLanguage + ", " + userData.secondLanguage}
            </Text>
          </View>
        </LinearGradient>
        <View style={{ paddingTop: "20%", paddingLeft: "0%" }}>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              android_ripple={{ color: "white" }}
              onPress={onPressEdit}
            >
              <IconButton icon="account-edit" color="white" size={32} />
            </Pressable>
            <Text>Edit Profile</Text>
            <Text>{renderAgain}</Text>
          </View>
        </View>
      </View>
    </View>
    //})
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
