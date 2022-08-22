import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config.js";

export default function MoreInfo2Screen(props) {
  const [aboutMe, setAboutMe] = useState("");
  const onMoveOnPress = async () => {
    if (aboutMe.length === 0) {
      alert("please fill in 'about me' field :)");
      return;
    }

    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      aboutMe: aboutMe,
      lastLogin: timestamp,
      createdAt: timestamp,
    };
    var finalData = { ...JSON.parse(props.route.params.data), ...data };
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        finalData.email,
        props.route.params.password
      )
      .then((response) => {
        const uid = response.user.uid;
        const userRef = firebase.firestore().collection("users").doc(uid);
        finalData = { id: uid, ...finalData };
        userRef.set(finalData).then(() => {
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../app/assets/TravelPartnerLogo1.jpg")}
        />
        <TextInput
          style={styles.input}
          placeholder={
            "Tell us a few words about yourself, so the other\ntravelers get to know you better :\nSuch as hobbies, Interests, etc..."
          }
          placeholderTextColor="#aaaaaa"
          value={aboutMe}
          onChangeText={(text) => setAboutMe(text)}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={() => onMoveOnPress()}>
          <Text style={styles.buttonTitle}>Lets Move On !</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}