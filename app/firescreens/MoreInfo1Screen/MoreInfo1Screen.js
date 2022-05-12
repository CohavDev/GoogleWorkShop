import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config.js'
// import { initializeApp } from 'firebase/app';
// import { getDatabase } from "firebase/database"
// import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";

export default function MoreInfo1Screen({navigation}) {
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [nationality, setNationality] = useState('')
    const [motherTongue, setMotherTongue] = useState('')
    const [secondSpokenLanguage, setSecondSpokenLanguage] = useState('')
    
    const userID=firebase.auth().currentUser.uid;
    const entityRef = firebase.firestore().collection('users').doc(userID)
    
    // const onFooterLinkPress = () => {
    //     navigation.navigate('LoginScreen')
    // }

    const onMoveOnPress = async () => {
        if (dateOfBirth.length === 0) {
            alert("please fill in your date of birth :)")
            return
        }
        if (nationality.length === 0) {
            alert("please fill in your nationality (;")
            return
        }
        if (motherTongue.length === 0) {
            alert("please fill in your mother tongue :D")
            return
        }
        const data = {
            dateOfBirth: dateOfBirth,
            nationality: nationality,
            motherTongue: motherTongue,
            secondSpokenLanguage: secondSpokenLanguage,
        };
        entityRef
            .update(data)
            .then(() => {
                navigation.navigate('MoreInfo2Screen')
            })
            .catch((error) => {
                alert(error)
            });
        }


    // if (props===null){
    //      userID={};
    // }
    // else{
    //     userID = props.extraData.id
    // }

   
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
                    placeholder='Date Of Birth'
                    placeholderTextColor="#aaaaaa"
                    value={dateOfBirth}
                    onChangeText={(text) => setDateOfBirth(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Nationality'
                    placeholderTextColor="#aaaaaa"
                    value={nationality}
                    onChangeText={(text) => setNationality(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Mother Tongue'
                    value={motherTongue}
                    onChangeText={(text) => setMotherTongue(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Second Language'
                    value={secondSpokenLanguage}
                    onChangeText={(text) => setSecondSpokenLanguage(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onMoveOnPress()}>
                    <Text style={styles.buttonTitle}>Lets Move On !</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
};

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
// const auth = getAuth();
