import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config.js'
// import { initializeApp } from 'firebase/app';
// import { getDatabase } from "firebase/database"
// import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";

export default function MoreInfo2Screen({navigation}) {
    const [aboutMe, setAboutMe] = useState('')
    const userID=firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection('users').doc(userID)
    
    // const onFooterLinkPress = () => {
    //     navigation.navigate('LoginScreen')
    // }

    const onMoveOnPress = async () => {
        if (aboutMe.length === 0) {
            alert("please fill in 'about me' field :)")
            return
        }

        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            aboutMe: aboutMe,
            lastLogin: timestamp,
            createdAt: timestamp
        };
        userRef
            .update(data)
            .then(() => {
                navigation.navigate('MainMenu')
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
                    placeholder='Tell us a few words about yourself, so the other\n
                    travelers get to know you better :)\n
                    you may write anything you want,\n
                    such as hobbies, Interests, etc...'
                    placeholderTextColor="#aaaaaa"
                    value={aboutMe}
                    onChangeText={(text) => setAboutMe(text)}
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

//const app = initializeApp(firebaseConfig);
//const database = getDatabase(app);
//const auth = getAuth();
 
