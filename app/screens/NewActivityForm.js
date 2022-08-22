import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import colors from "../config/colors";
import {
  convertDateToFormattedDate,
  timeToNum,
  dayTimeToNum,
} from "../components/TimeConversions";
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { googlePlaceAPIKey } from "../googlePlaces/config";

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

export default function NewActivityForm(props) {
  const [activityTime, setActivityTime] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [formattedEndDate, setFormattedEndDate] = useState(NaN);
  const [formattedStartDate, setFormattedStartDate] = useState(NaN);
  const [location, setLocation] = useState("UnKnown");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  // True if should display both start and end dates. false otherwise
  const [condDate, setCondDate] = useState(
    props.route.params.activityType == "Place to sleep" ||
      props.route.params.activityType == "Backpacking"
  );

  var currentDate = new Date();

  function addLanguage() {
    return (item) =>
      setSelectedLanguages(xorBy(selectedLanguages, [item], "item"));
  }
  const stringFormatDate = (dateObject) => {
    var day = dateObject.getDate();
    var month = parseInt(dateObject.getMonth() + 1);
    if (day.toString().length == 1) {
      day = "0" + day;
    }
    if (month.toString().length == 1) {
      month = "0" + month;
    }
    return day + "/" + month + "/" + dateObject.getFullYear();
  };

  const pressConfirm = () => {
    currentDate = new Date();
    if (location.localeCompare("UnKnown") == 0) {
      alert("please enter one of the suggested activity's location");
    }
    else if (isNaN(formattedStartDate)) {
      if (!condDate) {
        alert("please enter activity's date");
      } else {
        alert("please enter activity's start date");
      }
    } else if (formattedStartDate < convertDateToFormattedDate(currentDate)) {
      alert(
        "We are sorry, but the activity's start date must be at the future!"
      );
    } else if (isNaN(formattedEndDate)) {
      alert("please enter activity's end date");
    } else if (condDate && formattedEndDate <= formattedStartDate) {
      alert(
        "We are sorry, but the activity's end date must at least one day after start date!"
      );
    } else if (!condDate && activityTime.localeCompare("") == 0) {
      alert("please enter activity's time");
    } else if (
      formattedStartDate == convertDateToFormattedDate(currentDate) &&
      dayTimeToNum(activityTime) < timeToNum(currentDate.getHours())
    ) {
      alert("We are sorry, but the activity's time must be at the future!");
    } else if (selectedLanguages.length == 0) {
      alert("please enter at least one language");
    } else {
      props.navigation.navigate("ApproveActivity", {
        // type: props.navigation.getParam("activityType"),
        type: props.route.params.activityType,
        // icon: props.navigation.getParam("activityIcon"),
        icon: props.route.params.activityIcon,
        location: location,
        startDate: stringFormatDate(startDate),
        endDate: stringFormatDate(endDate),
        time: activityTime,
        languages: JSON.stringify(selectedLanguages, ["item"]),
      });
    }
  };
  const onChangeDate = (is_start, selectedDate) => {
    const currentDate = selectedDate;
    const formatedDate = strDatetoFormattedDate(stringFormatDate(currentDate));
    if (is_start) {
      if (!condDate) {
        //only 1 single date for activity
        setEndDate(currentDate); // because end date should be the same as start
        setFormattedEndDate(formatedDate); //likewise
      }
      setStartDate(currentDate);
      setFormattedStartDate(formatedDate);
    } else {
      setEndDate(currentDate);
      setFormattedEndDate(formatedDate);
    }
  };
  
  //   formats date object to string
  function strDatetoFormattedDate(strDate) {
    var day = strDate.slice(0, 2);
    var month = strDate.slice(3, 5);
    var year = strDate.slice(6, 10);
    // assuming the format of the date of birth is : DD/MM/YYYY
    return parseInt("".concat(year, month, day));
  }

  const GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder={location === "UnKnown" ? "Destination" : location}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          setLocation(data.description);
        }}
        query={{
          key: googlePlaceAPIKey.key,
          language: "en",
          type: "(cities)",
        }}
        debounce={200}
        multiline={true}
        numberOfLines={1}
        styles={{
          textInputContainer: {
            backgroundColor: colors.Background,
            position: "absolute",
          },
        }}
      />
    );
  };

  const openDatePicker = (is_start, dateObject) => {
    DateTimePickerAndroid.open({
      value: dateObject,
      onChange: (event, selectedDate) => onChangeDate(is_start, selectedDate),
      mode: "date",
      is24Hour: true,
    });
  };

  useEffect(() => {
    const strDate = stringFormatDate(startDate);
    setFormattedStartDate(strDatetoFormattedDate(strDate));
    setFormattedEndDate(strDatetoFormattedDate(strDate));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Set the details of your Activity</Text>
      </View>
      <View style={styles.ovalsContainer}>
        <View style={styles.ovalShape}>
          <Text style={styles.subtitle}>Destination:</Text>
          <View style={[styles.box, { zIndex: 0, height: 50 }]}>
            <GooglePlacesInput />
          </View>
          <StatusBar style="auto" />
        </View>
        <View style={styles.dateContainer}>
          {condDate && (
            <View>
              <Text style={styles.subtitle}>Activity start date:</Text>
              <View style={styles.box}>
                <Text
                  style={styles.input}
                  onPress={() => {
                    openDatePicker(1, startDate);
                  }}
                >
                  {stringFormatDate(startDate)}
                </Text>
              </View>
            </View>
          )}
          {!condDate && (
            <View>
              <Text style={styles.subtitle}>Activity date:</Text>
              <View style={styles.box}>
                <Text
                  style={styles.input}
                  onPress={() => {
                    openDatePicker(1, startDate);
                  }}
                >
                  {stringFormatDate(startDate)}
                </Text>
              </View>
            </View>
          )}

          {condDate && (
            <View style={{ left: 35 }}>
              <Text style={styles.subtitle}>Activity End date:</Text>
              <View style={styles.box}>
                <Text
                  style={styles.input}
                  onPress={() => {
                    openDatePicker(0, endDate);
                  }}
                >
                  {stringFormatDate(endDate)}
                </Text>
              </View>
            </View>
          )}
        </View>

        {!condDate && (
          <View style={styles.ovalShape}>
            <Text style={styles.subtitle}>Activity time:</Text>
            <View style={styles.box}>
              <Picker
                selectedValue={activityTime}
                onValueChange={(value, index) => {
                  setActivityTime(value);
                }}
                mode="dropdown"
                style={styles.picker}
              >
                <Picker.Item
                  label="Select"
                  value=""
                  color="rgba(60, 60, 67, 0.5)"
                />
                <Picker.Item label="Morning" value="Morning" />
                <Picker.Item label="After noon" value="After noon" />
                <Picker.Item label="Evening/Night" value="Evening/Night" />
              </Picker>
            </View>
          </View>
        )}

        <View>
          <Text style={styles.subtitle}>Languages:</Text>
          <View style={{ left: 15 }}>
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
            />
          </View>
        </View>
      </View>
      <Pressable onPress={pressConfirm} style={styles.buttonContainer}>
        <Text
          style={{
            fontWeight: "bold",
            alignItems: "center",
            color: "white",
          }}
        >
          Confirm
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  ovalsContainer: {
    height: "75%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    top: "5%",
  },
  headerContainer: {
  },
  container: {
    backgroundColor: colors.Background,
    paddingTop: "15%",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  dateContainer: {
    flexDirection: "row",
  },
  languagesContainer: {
    borderWidth: 1,
    borderColor: "black",
    textAlign: "left",
    direction: "ltr",
    width: "90%",
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "black",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 45,
    top: 20,
  },
  header: {
    color: "black",
    fontSize: 18,
  },
  ovalShape: {
  },
  subtitle: {
    color: "#49454F",
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
    borderWidth: 1,
    borderColor: "black",
    direction: "ltr",
  },
  input: {
    flexDirection: "row",
    paddingLeft: 10,
    textAlign: "left",
    direction: "ltr",
  },
  box: {
    //frame shape
    height: 35,
    width: "90%",
    borderRadius: 5,
    borderBottomWidth: 1,
    backgroundColor: "white",
    borderColor: "black",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
    paddingRight: 10,
    top: 20,
    alignSelf: "flex-start",
  },
  buttonContainer: {
    height: 50,
    width: 100,
    bottom: 10,
    position: "absolute",
    borderRadius: 20,
    elevation: 3,
    backgroundColor: colors.Primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});