import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config.js";

import { LogBox } from "react-native";
import _ from "lodash";

LogBox.ignoreLogs(["Warning:..."]); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("RegistrationScreen");
  };

  const onLoginPress = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist");
              return;
            }
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
              lastLogin: timestamp,
            };
            const userRef = usersRef.doc(uid);
            userRef.update(data);
            const user = firestoreDocument.data();
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <ImageBackground
      style={styles.backgroundImage}
      resizeMode="cover"
      source={require("../../assets/LoginBackground.jpg")}
    >
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: "100%", flexDirection: "column" }}
          keyboardShouldPersistTaps="always"
        >
          <Image
            style={styles.logo}
            source={require("../../../app/assets/TravelPartnerLogo1.jpg")}
          />
          <View style={{ flex: 1 }}>
            <View style={styles.inputBox}>
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
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.loginBox}>
          <View
            style={{
              marginTop: "60%",
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => onLoginPress()}
            >
              <Text style={styles.buttonTitle}>Log in</Text>
            </TouchableOpacity>
            <View style={styles.footerView}>
              <Text style={styles.footerText}>
                Don't have an account?{" "}
                <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                  Sign up
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
