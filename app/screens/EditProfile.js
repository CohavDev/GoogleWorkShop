import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../firescreens/RegistrationScreen/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../firebase/config";

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
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={{ fontSize: 18, alignSelf: "center" }}>
          Edit your profile
        </Text>
        {/* <Image
          style={styles.logo}
          source={require("../../../app/assets/TravelPartnerLogo1.jpg")}
        /> */}

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
        <TouchableOpacity style={styles.button} onPress={() => onPressSave()}>
          <Text style={styles.buttonTitle}>Save changes</Text>
        </TouchableOpacity>
        {/* <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View> */}
      </KeyboardAwareScrollView>
    </View>
  );
}
