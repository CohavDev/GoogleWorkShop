import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
// import styles from "../firescreens/RegistrationScreen/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
        console.log("fetched data for edit profile");
        setRender(true);
        setFullName(data.fullName);
        setAboutMe(data.aboutMe);
        setPhoneNumber(data.phoneNumber);
        setLocation(data.nationality);
      });
  });
  return (
    <View style={styles.container}>
      {/* <KeyboardAwareScrollView
        // style={{ flex: 1, width: "100%", height: "100%", }}
        keyboardShouldPersistTaps="always"
      > */}
        <Text style={{ top:"15%", fontSize: 18, alignSelf: "center" }}>
          Edit your profile
        </Text>
        {/* <Image
          style={styles.logo}
          source={require("../../../app/assets/TravelPartnerLogo1.jpg")}
        /> */}
        <View style={styles.inputContainer}>
            <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#aaaaaa"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            />
            <TextInput
            style={styles.input}
            placeholder="Where are you from?"
            placeholderTextColor="#aaaaaa"
            value={location}
            onChangeText={(text) => setLocation(text)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            />
            <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            />
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
        <View style={{top: "20%", height: "80%",}}>
            <TouchableOpacity style={styles.button} onPress={() => onPressSave()}>
            <Text style={styles.buttonTitle}>Save changes</Text>
            </TouchableOpacity>
        </View>
        {/* <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View> */}
      {/* </KeyboardAwareScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: "center",
        // height: "100%",
        // paddingTop: "5%",
        backgroundColor: "white",
        // alignContent: "space-between",
        // alignItems: "center",
        // alignSelf: "center",
        // height: undefined,
        width: "100%",
        height: "100%",
        height: Dimensions.get("screen").height,
        // bottom: "0%",
  },
  inputContainer:{
    height: "60%",
    top: "20%",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    // backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(192, 192, 192)",
  },
  button: {
    backgroundColor: "rgb(52, 175, 183)",
    // marginLeft: 30,
    // marginRight: 30,
    // marginTop: 20,
    // height: 48,
    width: "70%",
    // borderRadius: 5,
    // alignItems: "center",
    // justifyContent: "center",

    marginLeft: "15%",
    // marginRight: "30%",
    // marginTop: "30%",
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
    // position: "absolute",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    // flex: 1,
    alignItems: "center",
    // bottom: "15%",
    top: "5%",
    // marginTop: "20%",
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
