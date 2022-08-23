import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { firebase } from "../firebase/config";
import { Dimensions } from "react-native";
export default function EditProfile(props) {
  //page states
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [aboutMe, setAboutMe] = useState("");
  const [isRendered, setRender] = useState(false);
  //lcoal variables
  const userID = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users");
  //functions
  const onPressSave = () => {
    userRef
      .doc(userID)
      .update({
        fullName: fullName,
        phoneNumber: phoneNumber,
        nationality: location,
        aboutMe: aboutMe,
      })
      .then(() => {
        props.route.params.onGoBack();
        props.navigation.goBack();
      });
  };
  useEffect(() => {
    if (isRendered) {
      return;
    }
    userRef
      .doc(userID)
      .get()
      .then((userData) => {
        const data = userData.data();
        setRender(true);
        setFullName(data.fullName);
        setAboutMe(data.aboutMe);
        setPhoneNumber(data.phoneNumber);
        setLocation(data.nationality);
      });
  });
  return (
    <View style={styles.container}>
        <Text style={{ top:"10%", fontSize: 18, alignSelf: "center" }}>
          Edit your profile
        </Text>
        <View style={styles.inputContainer}>
            <Text  style={styles.subTitle}>Full name:</Text>
            <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#aaaaaa"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            />
            <Text  style={styles.subTitle}>Country:</Text>
            <TextInput
            style={styles.input}
            placeholder="Where are you from?"
            placeholderTextColor="#aaaaaa"
            value={location}
            onChangeText={(text) => setLocation(text)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            />
            <Text  style={styles.subTitle}>Phone Number:</Text>
            <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            />
            <Text  style={styles.subTitle}>About:</Text>
            <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            placeholder="About me"
            value={aboutMe}
            onChangeText={(text) => setAboutMe(text)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            />
        </View>
        <View style={{top: "15%", height: "80%",}}>
            <TouchableOpacity style={styles.button} onPress={() => onPressSave()}>
            <Text style={styles.buttonTitle}>Save changes</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    subTitle: {
        color: "#49454F",
        fontWeight: "bold",
        fontSize: 14,
        paddingLeft: "10%",
      },
    container: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        height: Dimensions.get("screen").height,
  },
  inputContainer:{
    height: "60%",
    top: "15%",
  },
  input: {
    height: 40,
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(192, 192, 192)",
  },
  button: {
    backgroundColor: "rgb(52, 175, 183)",
    width: "70%",
    marginLeft: "15%",
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    alignItems: "center",
    top: "5%",
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "rgb(52, 175, 183)",
    fontWeight: "bold",
    fontSize: 16,
  },
})
