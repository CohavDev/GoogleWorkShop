import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  BackHandler,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config.js";
import { Picker } from "@react-native-picker/picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import CountryPicker from "react-native-country-codes-picker";

// import { initializeApp } from 'firebase/app';
// import { getDatabase } from "firebase/database"
// import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
// import DatePicker from 'react-native-datepicker' it seems like this import doesnt work on web
// thus i have to comment it out until i manage to fix my emulator

export default function MoreInfo1Screen(props) {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [nationality, setNationality] = useState("");
  // const [nativeLanguage, setNativeLanguage] = useState('')
  // const [secondLanguage, setSecondLanguage] = useState('')
  const [phoneNumber, setPhoneNumber] = useState("");
  const [regionCode, setRegionCode] = useState("+972");
  const [show, setShow] = useState(false);

  // const userID = firebase.auth().currentUser.uid;
  // const userRef = firebase.firestore().collection("users").doc(userID);
  var day = "";
  var month = "";
  var year = "";
  var formattedDateOfBirth = "";
  var regularDate = "";

  // const onFooterLinkPress = () => {
  //     navigation.navigate('LoginScreen')
  // }
  useEffect(() => {
    const backAction = () => {
      console.log("backAction");
      if (show) {
        //country picker is open
        setShow(false);
        return true; // prevent default "goBack"
      }
    };
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  });
  const onMoveOnPress = async () => {
    if (dateOfBirth.length === 0) {
      alert("please fill in your date of birth :)");
      return;
    } else {
      //if using app on web, uncomment following lines
      // day = dateOfBirth.slice(0, 2);
      // month = dateOfBirth.slice(3, 5);
      // year = dateOfBirth.slice(6, 10);
      // // i assume the format of the date of birth is : DD/MM/YYYY
      // formattedDateOfBirth = "".concat(year, month, day);
      // regularDate = dateOfBirth;
      //------

      // if using app on android, uncomment the following lines
      formattedDateOfBirth = stringFormatDate(dateOfBirth, 0);
      regularDate = stringFormatDate(dateOfBirth, 1);
      //----
      console.log(formattedDateOfBirth);
    }
    if (nationality.length === 0) {
      alert("please fill in your nationality (;");
      return;
    }
    // if (nativeLanguage.length === 0) {
    //     alert("please fill in your native language :D")
    //     return
    // }
    if (phoneNumber.length === 0) {
      alert("please fill in 'phone numebr' field :)");
      return;
    }
    const data = {
      dateOfBirth: regularDate,
      formattedDateOfBirth: parseInt(formattedDateOfBirth),
      nationality: nationality,
      // nativeLanguage: "",
      // secondLanguage: "",
      phoneNumber: regionCode + "" + phoneNumber,
    };
    props.navigation.navigate("MoreInfo2Screen", {
      data: JSON.stringify({
        ...JSON.parse(props.route.params.data),
        ...data,
      }),
      password: props.route.params.password,
    });
  };

  //------following functions are for date picker
  const onChangeDate = (selectedDate) => {
    const currentDate = selectedDate;
    setDateOfBirth(currentDate);
    console.log("date changed = " + stringFormatDate(currentDate, 1));
  };

  //format 1 = with "/" format 0 = without "/"
  const stringFormatDate = (dateObject, format) => {
    var day = dateObject.getDate();
    var month = parseInt(dateObject.getMonth() + 1);
    if (day.toString().length == 1) {
      day = "0" + day;
    }
    if (month.toString().length == 1) {
      month = "0" + month;
    }
    if (format == 1) {
      return day + "/" + month + "/" + dateObject.getFullYear();
    }
    //else
    return dateObject.getFullYear() + "" + month + "" + day;
  };

  const openDatePicker = (dateObject) => {
    console.log("called openDatePicker()");

    DateTimePickerAndroid.open({
      value: dateObject,
      onChange: (event, selectedDate) => onChangeDate(selectedDate),
      mode: "date",
      is24Hour: true,
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
        {/* this code is for working on the web: */}
        {/* if you want to use it, comment out the code designated for the emulator
                but dont delete it! because Omer needs it!
                only before submitting the project we will delete the
                web code and will leave the emulator (Androind) code! */}
        {/* <TextInput
          style={styles.input}
          placeholder="Date Of Birth"
          placeholderTextColor="#aaaaaa"
          value={dateOfBirth}
          onChangeText={(text) => setDateOfBirth(text)}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        /> */}

        
        {/* this code is for working on Emulator: */}
        {/* if you want to use it, comment out the code designated for the web
                but dont delete it! because everyone else needs it! */}
        <Text style={styles.input} onPress={() => openDatePicker(dateOfBirth)}>
          {stringFormatDate(dateOfBirth, 1)}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nationality"
          placeholderTextColor="#aaaaaa"
          value={nationality}
          onChangeText={(text) => setNationality(text)}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        {/* <View style={styles.languageConStyle}> */}
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
        {/* <Picker
            // mode = "dropdown"
            selectedValue={nativeLanguage}
            onValueChange={(value, index) => setNativeLanguage(value)}
            style={styles.picker}
          >
            <Picker.Item
              label="Select your native language"
              value="Unknown"
              style={{ color: "#aaaaaa", fontSize: 15, textAlign: "left" }}
            />
            <Picker.Item label="Hebrew" value="Hebrew" />
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Spanish" value="Spanish" />
            <Picker.Item label="French" value="French" />
            <Picker.Item label="Arabic" value="Arabic" />
          </Picker> */}
        {/* </View> */}
        {/* <View style={styles.languageConStyle}> */}
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
        {/* <Picker
            // mode = "dropdown"
            selectedValue={secondLanguage}
            onValueChange={(value, index) => setSecondLanguage(value)}
            style={styles.picker}
          >
            <Picker.Item
              label="Select your second language (optional)"
              value="Unknown"
              style={{ color: "#aaaaaa", fontSize: 15, textAlign: "left" }}
            />
            <Picker.Item label="None" value="None" />
            <Picker.Item label="Hebrew" value="Hebrew" />
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Spanish" value="Spanish" />
            <Picker.Item label="French" value="French" />
            <Picker.Item label="Arabic" value="Arabic" />
          </Picker> */}
        {/* </View> */}
        {/* <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Second Language'
                    value={secondSpokenLanguage}
                    onChangeText={(text) => setSecondSpokenLanguage(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                /> */}
        <CountryPicker
          show={show}
          // when picker button press you will get the country object with dial code
          pickerButtonOnPress={(item) => {
            setRegionCode(item.dial_code);
            setShow(false);
          }}
          onBackdropPress={() => setShow(false)}
        />
        <View style={{ flexDirection: "row", width: "100%" }}>
          <TouchableOpacity
            style={{
              alignSelf: "center",
              marginLeft: 10,
              padding: 3,
              borderRadius: 7,
              backgroundColor: "#DCDCDC",
            }}
            onPress={() => setShow(true)}
          >
            <Text style={{ color: "blue" }}>({regionCode})</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.phoneNumberInput}
            placeholder="Phone number"
            placeholderTextColor="#aaaaaa"
            value={phoneNumber}
            keyboardType="numeric"
            onChangeText={(text) => setPhoneNumber(text)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => onMoveOnPress()}>
          <Text style={styles.buttonTitle}>Lets Move On !</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}

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
