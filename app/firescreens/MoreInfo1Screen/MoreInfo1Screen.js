import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import CountryPicker from "react-native-country-codes-picker";

export default function MoreInfo1Screen(props) {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [nationality, setNationality] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [regionCode, setRegionCode] = useState("+972");
  const [show, setShow] = useState(false);
  const [todaysDate, setTodaysDate] = useState(new Date());
  var formattedDateOfBirth = "";
  var regularDate = "";

  useEffect(() => {
    const backAction = () => {
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
      formattedDateOfBirth = stringFormatDate(dateOfBirth, 0);
      regularDate = stringFormatDate(dateOfBirth, 1);
      if (
        parseInt(stringFormatDate(todaysDate, 0)) -
          parseInt(formattedDateOfBirth) <
        180000
      ) {
        alert("the app is designated only for users older than 18 :/");
        return;
      }
    }
    if (nationality.length === 0) {
      alert("please fill in your nationality (;");
      return;
    }
    if (phoneNumber.length === 0) {
      alert("please fill in 'phone number' field :)");
      return;
    }
    const data = {
      dateOfBirth: regularDate,
      formattedDateOfBirth: parseInt(formattedDateOfBirth),
      nationality: nationality,
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
