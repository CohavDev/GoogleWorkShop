import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config.js'
import { Picker } from '@react-native-picker/picker';
// import { initializeApp } from 'firebase/app';
// import { getDatabase } from "firebase/database"
// import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
// import DatePicker from 'react-native-datepicker' it seems like this import doesnt work on web
// thus i have to comment it out until i manage to fix my emulator

export default function MoreInfo1Screen({navigation}) {
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [nationality, setNationality] = useState('')
    const [nativeLanguage, setNativeLanguage] = useState('')
    const [secondLanguage, setSecondLanguage] = useState('')

    
    const userID=firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection('users').doc(userID)
    var day=''
    var month=''
    var year=''
    var formattedDateOfBirth=''
    
    // const onFooterLinkPress = () => {
    //     navigation.navigate('LoginScreen')
    // }

    const onMoveOnPress = async () => {
        if (dateOfBirth.length === 0) {
            alert("please fill in your date of birth :)")
            return
        }
        else{
            month=dateOfBirth.slice(0,2)
            day=dateOfBirth.slice(3,5)
            year=dateOfBirth.slice(6,10)
            formattedDateOfBirth=''.concat(year,month,day)
            setDateOfBirth(formattedDateOfBirth)
        }
        if (nationality.length === 0) {
            alert("please fill in your nationality (;")
            return
        }
        if (nativeLanguage.length === 0) {
            alert("please fill in your native language :D")
            return
        }
        const data = {
            dateOfBirth: dateOfBirth,
            formattedDateOfBirth: formattedDateOfBirth,
            nationality: nationality,
            nativeLanguage: nativeLanguage,
            secondLanguage: secondLanguage,
        };
        userRef
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
                <View style = {styles.languageConStyle}>
                    {/* <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Native Language'
                        // value={nativeLanguage}
                        // onChangeText={(text) => setNativeLanguage(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    /> */}
                    {/* <Text>Select your native language</Text> */}
                    <Picker 
                        // mode = "dropdown"
                        selectedValue = {nativeLanguage}
                        onValueChange = {(value, index) => setNativeLanguage(value)}
                        style = {styles.picker}
                    >
                        <Picker.Item label="Select your native language" 
                                        value="Unknown" 
                                        style={{color: "#aaaaaa", fontSize: 15, textAlign: "left"}}/>
                        <Picker.Item label="Hebrew" value="Hebrew" />
                        <Picker.Item label="English" value="English" />
                        <Picker.Item label="Spanish" value="Spanish" />
                        <Picker.Item label="French" value="French" />
                        <Picker.Item label="Arabic" value="Arabic" />
                    </Picker>
                </View>
                <View style = {styles.languageConStyle}>
                    {/* <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Native Language'
                        // value={nativeLanguage}
                        // onChangeText={(text) => setNativeLanguage(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    /> */}
                    {/* <Text>Select your native language</Text> */}
                    <Picker 
                        // mode = "dropdown"
                        selectedValue = {secondLanguage}
                        onValueChange = {(value, index) => setSecondLanguage(value)}
                        style = {styles.picker}
                    >
                        <Picker.Item label="Select your second language (optional)" 
                                        value="Unknown" 
                                        style={{color: "#aaaaaa", fontSize: 15, textAlign: "left"}}/>
                        <Picker.Item label="None" value="None" />
                        <Picker.Item label="Hebrew" value="Hebrew" />
                        <Picker.Item label="English" value="English" />
                        <Picker.Item label="Spanish" value="Spanish" />
                        <Picker.Item label="French" value="French" />
                        <Picker.Item label="Arabic" value="Arabic" />
                    </Picker>
                </View>
                {/* <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Second Language'
                    value={secondSpokenLanguage}
                    onChangeText={(text) => setSecondSpokenLanguage(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                /> */}
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

// the next code should open a calander for choosing date of birth
// it doesnt work on the web apperantly (only on android emulator or real android)
// and thus for noe i comment it out until i manage to fix my emulator, so ican keep
// on working on the web
/*
                <SafeAreaView
                    style={styles.input}
                    placeholder='Date Of Birth'
                    placeholderTextColor="#aaaaaa"
                    
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                >
                    <View style={styles.containerDate}>
                        <Text style={styles.titleDate}>
                            React Native Date Picker – 
                            To Pick the Date using Native Calendar
                        </Text>
                        <DatePicker
                            style={styles.datePickerStyle}
                            date={dateOfBirth} // Initial date from state
                            mode="date" // The enum of date, datetime and time
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            minDate="01-01-2016"
                            maxDate="01-01-2019"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                //display: 'none',
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                                },
                                dateInput: {
                                marginLeft: 36,
                                },
                            }}
                            onDateChange={(date) => {
                                setDateOfBirth(date);
                            }}
                        />
                    </View>
                </SafeAreaView>

                */


