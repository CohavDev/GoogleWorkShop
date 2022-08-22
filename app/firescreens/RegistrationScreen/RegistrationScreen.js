import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config.js";
// import { initializeApp } from 'firebase/app';
// import { getDatabase } from "firebase/database"
// import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";

export default function RegistrationScreen(props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    props.navigation.navigate("LoginScreen");
  };

  const onRegisterPress = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (fullName === "") {
      alert("Please enter a full name");
      return;
    }
    if (email === "") {
      alert("Please enter an email address");
      return;
    }
    if (password === "") {
      alert("Please enter a password");
      return;
    }
    setEmail(email.toLowerCase());
    // check if email already exist in firestore
    const query = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .get();
    console.log("email = " + email);
    if (query.docs.length != 0) {
      alert("Email already exists");
      return;
    }
    const data = {
      // id: uid,
      email,
      fullName,
    };
    props.navigation.navigate("MoreInfo1Screen", {
      data: JSON.stringify(data),
      password: password,
    });
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((response) => {
    //     const uid = response.user.uid;
    //     const data = {
    //       id: uid,
    //       email,
    //       fullName,
    //     };
    //     navigation.navigate("MoreInfo1Screen", { data: JSON.stringify(data) });
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });
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
            placeholder="E-mail"
            placeholderTextColor="#aaaaaa"
            value={email}
            onChangeText={(text) => setEmail(text)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <View style={styles.footerView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onRegisterPress()}
            >
              <Text style={styles.buttonTitle}>Let's move on!</Text>
            </TouchableOpacity>
            <View style={{ padding: "5%" }}>
              <Text style={styles.footerText}>
                Already got an account?{" "}
                <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                  Log in
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
// const auth = getAuth();
