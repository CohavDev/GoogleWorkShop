import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase, auth } from '../../firebase/config.js';
import { onAuthStateChanged } from "firebase/auth"

import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = message => {
if (message.indexOf('Setting a timer') <= -1) {
   _console.warn(message);
   }
};

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    /* Hila's changes*/
    // const [user, setUser] = useState({});
    // onAuthStateChanged(auth, (currentUser) =>{
    //   setUser(currentUser);
    // });

    const onFooterLinkPress = () => {
        navigation.navigate('RegistrationScreen')
    }

    const onLoginPress = async () => {
      console.log("here 1");
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
                console.log("here 2");
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist")
                            return;
                          }
                          const user = firestoreDocument.data()
                          navigation.navigate('MainMenu', {user})
                          console.log("here 3");
                        })
                        .catch(error => {
                          alert(error)
                        });
                      })
                      .catch(error => {
                        alert(error)
                      })
                    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../app/assets/TravelPartnerLogo1.jpg')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
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
                    placeholder='Password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}