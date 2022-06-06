import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import React, { useState, Component } from "react";
import { Picker } from "@react-native-picker/picker";
import colors from "../app/config/colors";
// import MultiSelect from "react-native-multiple-select";
import SelectMultiple from "react-native-select-multiple";

import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";
import style from "react-native-datepicker/style";
import SelectMultiLanguages from "./SelectMultiLanguages";

const LANGUAGES = [
  {
    id: "1",
    item: "Hebrew",
  },
  {
    id: "2",
    item: "English",
  },
  {
    id: "3",
    item: "Spanish",
  },
  {
    id: "4",
    item: "French",
  },
  {
    id: "5",
    item: "Arabic",
  },
];

export default function NewNewActivityForm(props) {
  const [activityTime, setActivityTime] = useState("Unknown");
  const [startDate, setStartDate] = useState("UnKnown");
  const [endDate, setEndDate] = useState("UnKnown");
  const [location, setLocation] = useState("UnKnown");
  const [languages, setLanguages] = useState("native");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const selectedItems = [];
  const [langList, setLangList] = useState([]);

  function addLanguage() {
    // console.log(LANGUAGES[1].item);
    // return (item) =>setSelectedLanguages(selectedLanguages.push(JSON.stringify(item)))
    return (item) =>
      setSelectedLanguages(xorBy(selectedLanguages, [item], "item"));
  }

  const pressConfirm = () => {
    // console.log(SelectMultiLanguages.selectedItems)
    // console.log(typeOf(JSON.stringify(selectedLanguages, ['item'])))
    props.navigation.navigate("NewApproveActivity", {
      // type: props.navigation.getParam("activityType"),
      type: props.route.params.activityType,
      // icon: props.navigation.getParam("activityIcon"),
      icon: props.route.params.activityIcon,
      location: location,
      startDate: startDate,
      endDate: endDate,
      time: activityTime,
      languages: JSON.stringify(selectedLanguages, ["item"]),

      // languages: selectedLanguages
      // languages: selectedLanguages,

      // please make sure that the language feild is returned as an array
      // for example, if the user wants to hang out with people that speak
      // hebrew or language, so the returned languages is: [English, French]. namely,
      // an array of the desired languages
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Set the details of your Activity</Text>
      </View>
      <View style={styles.ovalsContainer}>
        <View style={styles.ovalShape}>
          <Text style={styles.subtitle}>Destination:</Text>
          <View style={styles.box}>
            <TextInput
              style={styles.input}
              onChangeText={(newText) => setLocation(newText)}
              placeholder="Destination: City, Country"
              maxLength={20}
            ></TextInput>
          </View>
          <StatusBar style="auto" />
        </View>
        <View style={styles.dateContainer}>
          <View>
            <Text style={styles.subtitle}>Activity start date:</Text>
            <View style={styles.box}>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                maxLength={10}
                onChangeText={(newText) => setStartDate(newText)}
              ></TextInput>
            </View>
          </View>
          <View style={{ left: 35 }}>
            <Text style={styles.subtitle}>Activity End date:</Text>
            <View style={styles.box}>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                maxLength={10}
                onChangeText={(newText) => setEndDate(newText)}
              ></TextInput>
            </View>
          </View>
        </View>

        <View style={styles.ovalShape}>
          <Text style={styles.subtitle}>Activity time:</Text>
          <View style={styles.box}>
            <Picker
              selectedValue={activityTime}
              onValueChange={(value, index) => setActivityTime(value)}
              mode="dropdown"
              style={styles.picker}
            >
              <Picker.Item
                label="Select"
                value="-"
                color="rgba(60, 60, 67, 0.5)"
              />
              <Picker.Item label="Morning" value="Morning" />
              <Picker.Item label="Noon" value="Noon" />
              <Picker.Item label="Evening/Night" value="Evening/Night" />
            </Picker>
          </View>
        </View>

        <View >
          <Text style={styles.subtitle}>Languages:</Text>
          <View style={{ left: 15, }}>
            <SelectBox
              // selectedItemStyle = {backgroundColor = "blue"}
              label=""
              options={LANGUAGES}
              selectedValues={selectedLanguages}
              onMultiSelect={addLanguage()}
              onTapClose={addLanguage()}
              isMulti
              arrowIconColor="gray"
              searchIconColor="black"
              toggleIconColor="black"
              width="90%"
              // height = "30%"
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable onPress={pressConfirm}>
            <Text style={{ fontWeight: "bold", alignItems: "center", color: "white" }}>
              Confirm
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ovalsContainer: {
    // borderWidth: 1,
    // borderColor: "blue",
    backgroundColor: colors.Background,
    height: "60%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    // paddingBottom: 30,
    // alignContent: "space-around",
    //paddingRight: 20,
    // paddingTop: 50,
    top: "25%",
    // bottom: 50,
    // marginBottom: 0,
    //
  },
  headerContainer: {
    /////////
    // width: "100%",
    // height: "5%",
    // backgroundColor: "transparent",
    // justifyContent: "center",
    // alignItems: "center",
    ////////
    //alignSelf: "center",
    //height: 70,
    //left: 20,
    //right: 20,
    //position: "absolute",
  },
  container: {
    // borderWidth: 1,
    // borderColor: "yellow",
    // backgroundColor: colors.secondary,
    backgroundColor: colors.Background,
    // top: "12%",
    paddingTop: "15%",
    // bottom: "15%",
    // height: "40%",
    width: "100%",
    height: "80%",
    // left: "3%",
    //flex: 1,
    flexDirection: "column",
    // justifyContent: "space-between",
    //backgroundColor: "#fff",
    alignItems: "center",
    // alignContent: "space-between",
    //paddingRight: 20,
    // paddingTop: 40,
    // paddingBottom: 30,
    // bottom: 50,
    // borderWidth: 1,
  },
  dateContainer: {
    // borderWidth: 1,
    // borderColor: "red",
    flexDirection: "row",
    // alignSelf: "stretch",
  },
  languagesContainer: {
    backgroundColor: "white",
    // left: 10,
    height: 40,
    width: "100%",
    bottom: 0,
    // alignItems: "center",
    // padding: 10,
    borderWidth: 1,
    borderColor: "black",
    // alignSelf: "stretch",
    textAlign: "left",
    direction: "ltr",
    height: 35,
    width: "90%",
    // borderTopStartRadius: 10,
    // borderTopEndRadius: 10,
    // borderBottomEndRadius: 10,
    // borderBottomStartRadius: 10,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "black",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 45,
    // paddingRight: 10,
    top: 20,
    // bottom: 0,
    // alignContent: "center",
    // alignItems: "center",
    // alignSelf: "flex-start",
  },
  header: {
    color: "black",
    top: -20,
    //fontWeight: "bold",
    fontSize: 18,
    // left: 10,
    // justifyContent: 'center',
    // padding: 40,
  },
  ovalShape: {
    // borderWidth: 1,
    // left: 50,
    // borderColor: "pink",
    /////////////
    // shadowColor: "#171717",
    // shadowOffset: { width: -5, height: 5 },
    // shadowOpacity: 0.9,
    // shadowRadius: 3,
    // elevation: 5,
    // width: 300,
    // height: 90,
    // marginTop: 5,
    // borderRadius: 10,
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    ///////////
    // backgroundColor: "rgba(255,255,255,0.9)",
    // bottom: 20,
    // top: 20,
    // justifyContent: "space-between",
    //marginTop: 50,
    //margin: -10,
    // alignContent: "space-between",
    // position: 'absolute',
  },
  subtitle: {
    color: "#49454F",
    // fontWeight: "bold",
    fontSize: 14,
    paddingLeft: 15,
    paddingBottom: 10,
    top: 20,
    bottom: 20,
    alignSelf: "flex-start",
  },
  picker: {
    width: "100%",
    bottom: 10,
    // alignItems: "center",
    // padding: 10,
    borderWidth: 1,
    borderColor: "black",
    // alignSelf: "stretch",
    // textAlign: "left",
    direction: "ltr",
  },
  input: {
    flexDirection: "row",
    // margin: 4,
    // paddingBottom: 10,
    paddingLeft: 10,
    textAlign: "left",
    direction: "ltr",
  },
  box: {
    //frame shape
    height: 35,
    width: "90%",
    // borderTopStartRadius: 10,
    // borderTopEndRadius: 10,
    // borderBottomEndRadius: 10,
    // borderBottomStartRadius: 10,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "black",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
    paddingRight: 10,
    top: 20,
    // bottom: 20,
    // alignContent: "center",
    // alignItems: "center",
    alignSelf: "flex-start",
  },
  buttonContainer: {
    height: 40,
    width: 80,
    top: 40,
    borderRadius: 20,
    // borderWidth: 1,
    elevation: 3,
    backgroundColor: colors.Primary,
    // borderBottomLeftRadius: 10,
    // backgroundColor: "rgb(52, 175, 183)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    //backgroundColor: colors.checkButtonColor,
    //padding: 10,
    //flexGrow: 1,
    //top: 100,
  },
});
