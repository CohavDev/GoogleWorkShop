import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import React, { useState, Component, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import colors from "../config/colors";
// import MultiSelect from "react-native-multiple-select";
import SelectMultiple from "react-native-select-multiple";

import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";
import style from "react-native-datepicker/style";
import SelectMultiLanguages from "../components/SelectMultiLanguages";
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
  

  // on web mode:
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  
  // on android mode:
  //const [startDate, setStartDate] = useState(new Date());
  //const [endDate, setEndDate] = useState(new Date());


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
    // console.log(LANGUAGES[1].item);
    // return (item) =>setSelectedLanguages(selectedLanguages.push(JSON.stringify(item)))
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
    // console.log(SelectMultiLanguages.selectedItems)
    // console.log(typeOf(JSON.stringify(selectedLanguages, ['item'])))
    currentDate = new Date();

    // uncomment the following if when working on Android
    // if (location.localeCompare("UnKnown")){
    //   alert("please enter one of the suggested activity's location");
    // }

    // add else before the following if when working on Android
    if (isNaN(formattedStartDate)){
      if(!condDate){
        alert("please enter activity's date");
      }
      else{
        alert("please enter activity's start date");
      }
    }
    else if (formattedStartDate < convertDateToFormattedDate(currentDate)){
      alert("We are sorry, but the activity's start date must be at the future!");
    }
    else if (isNaN(formattedEndDate)){
      alert("please enter activity's end date");
    }
    else if ((condDate) && (formattedEndDate <= formattedStartDate)){
      alert("We are sorry, but the activity's end date must at least one day after start date!");
    }
    else if ((!condDate) && (activityTime.localeCompare("") == 0)){
      alert("please enter activity's time");
    }
    else if((formattedStartDate == convertDateToFormattedDate(currentDate))
    && (dayTimeToNum(activityTime) < timeToNum(currentDate.getHours()))) {
      alert("We are sorry, but the activity's time must be at the future!");
    }
    else if(selectedLanguages.length == 0){
      alert("please enter at least one language");
    }
    else{
      props.navigation.navigate("ApproveActivity", {
        // type: props.navigation.getParam("activityType"),
        type: props.route.params.activityType,
        // icon: props.navigation.getParam("activityIcon"),
        icon: props.route.params.activityIcon,
        location: location,
  
        // if working on emulator, uncomment the following two lines, and comment the other two designated for web
        // startDate: stringFormatDate(startDate),
        // endDate: stringFormatDate(endDate),
  
        // if working on web, uncomment the following two lines, and comment the other two designated for Androing/Enulator
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
    }
    
  };
  const onChangeDate = (is_start, selectedDate) => {
    const currentDate = selectedDate;
    if (is_start) {
      setStartDate(currentDate);
    } else {
      setEndDate(currentDate);
    }
    console.log("date changed = " + stringFormatDate(currentDate));
  };
  //   formats date object to string

  // when you work om emulator/Android, uncomment the next few lines! (from const to return, take out of comment)
  // but when working on web, comment them out (but dont delete, cause its needed!!!)
  // const openDatePicker = (is_start, dateObject) => {
  //   console.log("called openDatePicker()");

  //   DateTimePickerAndroid.open({
  //     value: dateObject,
  //     onChange: (event, selectedDate) => onChangeDate(is_start, selectedDate),
  //     mode: "date",
  //     is24Hour: true,
  //   });
  // };

  function convertDateToFormattedDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    yyyy = "" + yyyy;
    var strDate = yyyy + mm + dd;
    return parseInt(strDate);
  }



  function timeToNum(currentHour) {
    const splitAfternoon = 12; // 24hr time to split the afternoon
    const splitEvening = 18; // 24hr time to split the evening
    const splitNight = 22;
    const splitMorning = 0;

    if (currentHour >= splitMorning || currentHour < splitAfternoon) {
      return 1;
    }
    if (currentHour >= splitAfternoon && currentHour < splitEvening) {
      // Between 12 PM and 5PM
      return 2;
    }
    if (currentHour >= splitEvening && currentHour < splitNight) {
      // Between 5PM and 22PM
      return 3;
    }
    if (currentHour >= splitNight || currentHour < splitMorning) {
      // its on porpose with or instead of and
      // Between 22PM and 5AM
      return 3;
    }
    
  }

  function dayTimeToNum(dayTime) {
    if (dayTime.localeCompare("Morning") == 0) {
      return 1;
    }
    if (dayTime.localeCompare("After noon") == 0) {
      return 2;
    }
    if (dayTime.localeCompare("Evening/Night") == 0) {
      return 3;
    }
  }

  function strDatetoFormattedDate(strDate){
    var day = strDate.slice(0, 2);
    var month = strDate.slice(3, 5);
    var year = strDate.slice(6, 10);
    // i assume the format of the date of birth is : DD/MM/YYYY
    return parseInt("".concat(year, month, day));
  }

  const GooglePlacesInput = () => {
    // TODO: layout covers date, need to fix
    return (
      <GooglePlacesAutocomplete
        placeholder={location === "UnKnown" ? "Destination" : location}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data.description);
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
            //   height: 90,
              position: "absolute",
            },
            // textInput: {
            //   height: 38,
            //   color: '#5d5d5d',
            //   fontSize: 16,
            // },
            // predefinedPlacesDescription: {
            //   color: '#1faadb',
            // },
          }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Set the details of your Activity</Text>
      </View>
      <View style={styles.ovalsContainer}>
        <View style={styles.ovalShape}>
          <Text style={styles.subtitle}>Destination:</Text>
          <View style={[styles.box, { zIndex: 0, height: 50 }]}>
            {/* <TextInput
              style={styles.input}
              onChangeText={(newText) => setLocation(newText)}
              placeholder="Destination: City, Country"
              maxLength={20}
            ></TextInput> */}
            <GooglePlacesInput />
          </View>
          <StatusBar style="auto" />
        </View>
        <View style={styles.dateContainer}>
          {condDate && (
            <View>
              <Text style={styles.subtitle}>Activity start date:</Text>
              <View style={styles.box}>
                {/* this code is for working on the web: */}
                {/* if you want to use it, comment out the code designated for the emulator
                but dont delete it! because Omer needs it!
                only before submitting the project we will delete the
                web code and will leave the emulator (Androind) code! */}
                <TextInput
                  style={styles.input}
                  placeholder="DD/MM/YYYY"
                  maxLength={10}
                  onChangeText={(newText) => {
                    // i assume the format of the date of birth is : DD/MM/YYYY
                    setFormattedStartDate(strDatetoFormattedDate(newText));
                    setStartDate(newText);                    
                  }
                }

                ></TextInput>

                {/* this code is for working on Emulator: */}
                {/* if you want to use it, comment out the code designated for the web
                but dont delete it! because everyone else needs it! */}

                {/* <Text
                  style={styles.input}
                  onPress={() => {
                    openDatePicker(1, startDate)
                    strDate = stringFormatDate(startDate);
                    setFormattedStartDate(strDatetoFormattedDate(strDate));
                  }
                }
                >
                  {stringFormatDate(startDate)}
                </Text> */}


              </View>
            </View>
          )}
          {!condDate && (
            <View>
              <Text style={styles.subtitle}>Activity date:</Text>
              <View style={styles.box}>
                {/* this code is for working on the web: */}
                {/* if you want to use it, comment out the code designated for the emulator
                but dont delete it! because Omer needs it!
                only before submitting the project we will delete the
                web code and will leave the emulator (Androind) code! */}
                <TextInput
                  style={styles.input}
                  placeholder="DD/MM/YYYY"
                  maxLength={10}
                  onChangeText={(newText) => {
                    // i assume the format of the date of birth is : DD/MM/YYYY
                    setStartDate(newText);
                    setFormattedStartDate(strDatetoFormattedDate(newText));
                    setEndDate(newText);
                    setFormattedEndDate(strDatetoFormattedDate(newText));
                  }}
                ></TextInput>

                {/* this code is for working on Emulator: */}
                {/* if you want to use it, comment out the code designated for the web
                but dont delete it! because everyone else needs it! */}
                
                {/* <Text
                  style={styles.input}
                  onPress={() => {
                    openDatePicker(1, startDate)
                    strDate = stringFormatDate(startDate);
                    // i assume the format of the date of birth is : DD/MM/YYYY
                    setFormattedStartDate(strDatetoFormattedDate(strDate))
                    setEndDate(startDate);
                    setFormattedEndDate(strDatetoFormattedDate(strDate));
                  }
                }
                >
                  {stringFormatDate(startDate)}
                </Text> */}


              </View>
            </View>
          )}

          {condDate && (
            <View style={{ left: 35 }}>
              <Text style={styles.subtitle}>Activity End date:</Text>
              <View style={styles.box}>
                {/* this code is for working on the web: */}
                {/* if you want to use it, comment out the code designated for the emulator
              but dont delete it! because Omer needs it!
              only before submitting the project we will delete the
              web code and will leave the emulator (Androind) code! */}
                <TextInput
                  style={styles.input}
                  placeholder="DD/MM/YYYY"
                  maxLength={10}
                  onChangeText={(newText) => {
                    setEndDate(newText);
                    setFormattedEndDate(strDatetoFormattedDate(newText));
                    
                  }
                }


                ></TextInput>

                {/* this code is for working on Emulator: */}
                {/* if you want to use it, comment out the code designated for the web
              but dont delete it! because everyone else needs it! */}

                {/* <Text
                style={styles.input}
                onPress={() => {
                  openDatePicker(0, endDate)
                  strDate = stringFormatDate(endDate);
                  setFormattedEndDate(strDatetoFormattedDate(strDate));
                  
                }
              }
              >
                {stringFormatDate(endDate)}
              </Text> */}



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
                }
              }
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
              // height = "30%"
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable onPress={pressConfirm}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ovalsContainer: {
    // borderWidth: 1,
    // borderColor: "green",
    backgroundColor: colors.Background,
    height: "75%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    top: "10%",
    // alignItems: "center",
    // paddingBottom: 30,
    // alignContent: "space-around",
    //paddingRight: 20,
    // paddingTop: 50,
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
    // borderColor: "blue",
    // borderWidth: 1,
    // borderColor: "yellow",
    // backgroundColor: "blue",
    backgroundColor: colors.Background,
    paddingTop: "15%",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    // top: "12%",
    // bottom: "15%",
    // height: "40%",
    // left: "3%",
    //flex: 1,
    // justifyContent: "space-between",
    //backgroundColor: "#fff",
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
    // borderWidth: 1,
    // borderColor: "red",
    flexDirection: "row",
    // alignSelf: "stretch",
  },
  languagesContainer: {
    // borderWidth: 1,
    // borderColor: "red",
    // backgroundColor: "white",
    // left: 10,
    height: 40,
    // width: "100%",
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
    // top: -20,
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
    // borderWidth: 1,
    borderBottomWidth: 1,
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
    height: 50,
    width: 100,
    top: 80,
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

// was commented out on the 10.8
// instead of this code i copy pasted the code of NewNewActivityForm from Hilas
// folder

// import { StatusBar } from "expo-status-bar";
// import {
// 	StyleSheet,
// 	Text,
// 	View,
// 	TextInput,
// 	Button,
// 	Pressable,
// } from "react-native";
// import React, { useState, Component } from "react";
// import { Picker } from "@react-native-picker/picker";
// import colors from "../config/colors";
// // import MultiSelect from "react-native-multiple-select";
// import SelectMultiple from "react-native-select-multiple";

// import SelectBox from "react-native-multi-selectbox";
// import { xorBy } from "lodash";
// import style from "react-native-datepicker/style";
// import SelectMultiLanguages from "../../hila/SelectMultiLanguages";

// const LANGUAGES = [
// 	{
// 		id: "1",
// 		item: "Hebrew",
// 	},
// 	{
// 		id: "2",
// 		item: "English",
// 	},
// 	{
// 		id: "3",
// 		item: "Spanish",
// 	},
// 	{
// 		id: "4",
// 		item: "French",
// 	},
// 	{
// 		id: "5",
// 		item: "Arabic",
// 	},
// ];

// // function select() {
// //     const [selectedTeam, setSelectedTeam] = useState({})
// //     const [selectedTeams, setSelectedTeams] = useState([])
// //     return (
// //       <View style={{ margin: 30 }}>
// //         <View style={{ width: '100%', alignItems: 'center' }}>
// //           <Text style={{ fontSize: 30, paddingBottom: 20 }}>Demos</Text>
// //         </View>
// //         {/* <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select Demo</Text>
// //         <SelectBox
// //           label="Select single"
// //           options={K_OPTIONS}
// //           value={selectedTeam}
// //           onChange={onChange()}
// //           hideInputFilter={false}
// //         /> */}
// //         <View style={{ height: 40 }} />
// //             <Text style={{ fontSize: 20, paddingBottom: 10 }}>MultiSelect Demo</Text>
// //             <SelectBox
// //             label="Select multiple"
// //             options={K_OPTIONS}
// //             selectedValues={selectedTeams}
// //             onMultiSelect={onMultiChange()}
// //             onTapClose={onMultiChange()}
// //             isMulti
// //             />
// //       </View>
// //     )

// //     function onMultiChange() {
// //       return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
// //     }

// //     // function onChange() {
// //     //   return (val) => setSelectedTeam(val)
// //     // }
// //   }
// // const STATE = { selectedLanguages: [] }

// // const LANGUAGES =["Hebrew", "English", "Spanish", "French", "Arabic"]

// // class SelectMultiLanguages extends Component {
// //     state = STATE

// //     onconstctionsChange = (selectedLanguages) => {
// //       // selectedFruits is array of { label, value }
// //       this.setState({ selectedLanguages })
// //     }

// //     render () {
// //       return (
// //         <View>
// //           <SelectMultiple
// //             items={LANGUAGES}
// //             selectedItems={this.state.selectedLanguages}
// //             onSelectionsChange={this.onSelectionsChange} />
// //         </View>
// //       )
// //     }
// // }

// export default function NewActivityForm(props) {
// 	const [activityTime, setActivityTime] = useState("Unknown");
// 	const [startDate, setStartDate] = useState("UnKnown");
// 	const [endDate, setEndDate] = useState("UnKnown");
// 	const [location, setLocation] = useState("UnKnown");
// 	const [languages, setLanguages] = useState([]);
// 	// const [selectedTeam, setSelectedTeam] = useState({})
// 	const [selectedLanguages, setSelectedLanguages] = useState([]);
// 	// state = { selectedLanguages: [] }
// 	const selectedItems = [];
// 	const [langList, setLangList] = useState([]);
// 	// onSelectionsChange = (selectedLanguages) => {
// 	//     // selectedFruits is array of { label, value }
// 	//     this.setState({ selectedLanguages })
// 	// }

//     function addLanguage() {
//         // console.log(LANGUAGES[1].item);
//         // return (item) =>setSelectedLanguages(selectedLanguages.push(JSON.stringify(item)))
//         //return (item) => setSelectedLanguages(xorBy(selectedLanguages, [item], 'item'))
// 		return (item) => {
// 			setSelectedLanguages(oldArray => [...oldArray, item])
// 		}

// 	}

//     // function onChange() {
//     //     return (val) => setSelectedTeam(val)
//     // }

// 	const pressConfirm = () => {
//         // console.log(SelectMultiLanguages.selectedItems)
// 		console.log(JSON.stringify(selectedLanguages, ['item']))
// 		props.navigation.navigate("NewApproveActivity", {
// 			// type: props.navigation.getParam("activityType"),
// 			type: props.route.params.activityType,
// 			// icon: props.navigation.getParam("activityIcon"),
// 			icon: props.route.params.activityIcon,
// 			location: location,
// 			startDate: startDate,
// 			endDate: endDate,
// 			time: activityTime,
// 			languages: JSON.stringify(selectedLanguages, ["item"]),

// 			// languages: selectedLanguages
// 			// languages: selectedLanguages,

// 			// please make sure that the language feild is returned as an array
// 			// for example, if the user wants to hang out with people that speak
// 			// hebrew or language, so the returned languages is: [English, French]. namely,
// 			// an array of the desired languages
// 		});
// 	};

// 	return (
// 		<View style={styles.container}>
// 			<View style={styles.headerContainer}>
// 				<Text style={styles.header}>Set your Activity</Text>
// 			</View>
// 			<View style={styles.ovalsContainer}>
// 				<View style={styles.ovalShape}>
// 					<Text style={styles.subtitle}>Enter your destination</Text>
// 					<View style={styles.box}>
// 						<TextInput
// 							style={styles.input}
// 							onChangeText={(newText) => setLocation(newText)}
// 							placeholder="Destination: City, Country"
// 							maxLength={20}
// 						></TextInput>
// 					</View>
// 					<StatusBar style="auto" />
// 				</View>

// 				<View style={styles.ovalShape}>
// 					<Text style={styles.subtitle}>Activity start date</Text>
// 					<View style={styles.box}>
// 						<TextInput
// 							style={styles.input}
// 							placeholder="DD/MM/YYYY"
// 							maxLength={10}
// 							onChangeText={(newText) => setStartDate(newText)}
// 						></TextInput>
// 					</View>
// 				</View>

// 				<View style={styles.ovalShape}>
// 					<Text style={styles.subtitle}>Activity End date</Text>
// 					<View style={styles.box}>
// 						<TextInput
// 							style={styles.input}
// 							placeholder="DD/MM/YYYY"
// 							maxLength={10}
// 							onChangeText={(newText) => setEndDate(newText)}
// 						></TextInput>
// 					</View>
// 				</View>

// 				<View style={styles.ovalShape}>
// 					<Text style={styles.subtitle}>Activity Time</Text>
// 					<View style={styles.box}>
// 						<Picker
// 							selectedValue={activityTime}
// 							onValueChange={(value, index) => setActivityTime(value)}
// 							mode="dropdown"
// 							style={styles.picker}
// 						>
// 							<Picker.Item label="" value="" />
// 							<Picker.Item label="Morning" value="Morning" />
// 							<Picker.Item label="After noon" value="After noon" />
// 							<Picker.Item label="Evening/Night" value="Evening/Night" />
// 						</Picker>
// 					</View>
// 				</View>

// 				<View style={{left: 20, width:"50%"}}
//                 // style={[styles.ovalShape, { paddingBottom: 15 }]}
//                 >
// 					{/* <Text style={styles.subtitle}>Languages Preferences</Text>
// 					<View style={styles.box}>
// 						<Picker
// 							selectedValue={languages}
// 							onValueChange={(value, index) => setLanguages(value)}
// 							mode="dropdown"
// 							style={styles.picker}
// 						>
// 							<Picker.Item label="Native" value="Native" />
// 							<Picker.Item label="Secondary" value="Secondary" />
// 							<Picker.Item label="Any Language" value="Any" />
// 						</Picker>
// 					</View> */}
// 					{/* <View
//                         style = {{
//                                     flex: 1,
//                                     backgroundColor: 'white',
//                                     padding: 10,
//                                 }}
//                                 > */}
// 					{/* <View style={{height: 90, width: "60%", marginLeft: "20%"}} > */}
// 					{/* <View style = {[styles.ovalShape, {top: 10}]} > */}
// 					{/* <View style={{ width: '100%', alignItems: 'center' }}>
//                                 <Text style={{ fontSize: 20, paddingBottom: 20 }}>Demos</Text>
//                             </View> */}
// 					{/* <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select Demo</Text> */}
// 					{/* <View style={{width: 30}} /> */}
// 					{/* <Text style={{ fontSize: 20, paddingBottom: 10 }}>MultiSelect Demo</Text> */}
// 					{/* <View style={{width:"100%", marginLeft: "20%",}}>   */}

// 					{/* <View style={styles.ovalShape}> */}
// 					<Text style={styles.subtitle}>Select Languages</Text>
// 					<SelectBox
// 						// style={styles.box}
// 						// selectedItemStyle = {backgroundColor = "blue"}
// 						// label="Add"
//                         // inputPlaceholder = "Add"
// 						options={LANGUAGES}
// 						selectedValues={selectedLanguages}
// 						onMultiSelect={addLanguage()}
// 						onTapClose={addLanguage()}
// 						isMulti
// 						arrowIconColor="black"
// 						searchIconColor="black"
// 						toggleIconColor="black"
// 						// width="70%"
// 						// height = "80%"
// 					/>
// 					{/* <SelectMultiple
//                                     items={LANGUAGES}
//                                     selectedItems={this.state.selectedLanguages}
//                                     onSelectionsChange={this.onSelectionsChange} /> */}

// 					{/* <SelectMultiLanguages lang={langList} changeLang={setLangList}/> */}

// 					{/* </SelectMultiLanguages>  */}
// 					{/* selectedLanguages={LANGUAGES} */}
// 					{/* </View> */}

// 					{/* </View> */}
// 				</View>
// 				<View style={styles.buttonContainer}>
// 					<Pressable onPress={pressConfirm}>
// 						<Text style={{ fontWeight: "bold" }}>Confirm</Text>
// 					</Pressable>
// 				</View>

// 				{/* <View
// 				//  style={{
// 				//    width: '100%',
// 				//    //height: '100%',
// 				//    color: 'white',}}
// 				> */}
// 				{/* <Pressable onPress={pressConfirm} style={styles.buttonContainer}>
// 						<Text style={{ fontWeight: "bold" }}>Confirm</Text>
// 					</Pressable> */}
// 				{/* </View> */}
// 			</View>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	ovalsContainer: {
// 		// borderWidth: 1,
// 		// borderColor: "blue",
// 		backgroundColor: "rgba(255,255,255,0.8)",
// 		height: "90%",
// 		width: "100%",
// 		flexDirection: "column",
// 		justifyContent: "center",
// 		alignItems: "center",
// 		paddingBottom: 30,
// 		// alignContent: "space-between",
// 		//paddingRight: 20,
// 		//paddingTop: 50,
// 		//top: 0,
// 		// bottom: 50,
// 		marginBottom: 0,
// 		//
// 	},
// 	headerContainer: {
// 		width: "100%",
// 		height: "10%",
// 		backgroundColor: "transparent",
// 		//alignSelf: "center",
// 		justifyContent: "center",
// 		alignItems: "center",
// 		//height: 70,
// 		//left: 20,
// 		//right: 20,
// 		//position: "absolute",
// 	},
// 	container: {
// 		// borderWidth: 1,
// 		// borderColor: "yellow",
// 		backgroundColor: colors.secondary,

// 		height: "100%",
// 		width: "100%",
// 		//flex: 1,
// 		flexDirection: "column",
// 		justifyContent: "space-between",
// 		//backgroundColor: "#fff",
// 		alignItems: "center",
// 		//alignContent: "space-between",
// 		//paddingRight: 20,
// 		paddingTop: 40,
// 		// paddingBottom: 30,
// 		// bottom: 50,
// 	},
// 	header: {
// 		color: "black",
// 		top: 0,
// 		//fontWeight: "bold",
// 		fontSize: 28,
// 		// justifyContent: 'center',
// 		//padding: 40,
// 	},
// 	ovalShape: {
// 		// borderWidth: 1,
// 		// borderColor: "pink",
// 		shadowColor: "#171717",
// 		shadowOffset: { width: -5, height: 5 },
// 		shadowOpacity: 0.9,
// 		shadowRadius: 3,
// 		elevation: 5,

// 		// backgroundColor: "rgba(255,255,255,0.9)",
// 		width: 300,
// 		height: "15%",
// 		marginTop: 5,
// 		borderRadius: 10,
// 		// bottom: 20,
// 		flexDirection: "column",
// 		// justifyContent: "space-between",
// 		alignItems: "center",
// 		justifyContent: "center",
// 		//marginTop: 50,
// 		//margin: -10,
// 		// alignContent: "space-between",
// 		// position: 'absolute',
// 	},
// 	subtitle: {
// 		color: "#49454F",
// 		fontWeight: "bold",
// 		fontSize: 14,
// 		paddingLeft: 15,
// 		paddingBottom: 10,
// 		top: 20,
// 		bottom: 20,
// 	},
// 	picker: {
// 		width: 175,
// 		padding: 10,
// 		borderWidth: 3,
// 		borderColor: "black",
// 		alignSelf: "flex-end",
// 		textAlign: "left",
// 		direction: "ltr",
// 	},
// 	input: {
// 		flexDirection: "row",
// 		// margin: 4,
// 		// paddingBottom: 10,
// 		paddingLeft: 10,
// 		textAlign: "left",
// 		direction: "ltr",
// 	},
// 	box: {
// 		//frame shape
// 		height: 35,
// 		borderTopStartRadius: 10,
// 		borderTopEndRadius: 10,
// 		borderBottomEndRadius: 10,
// 		borderBottomStartRadius: 10,
// 		borderWidth: 1,
// 		backgroundColor: "white",
// 		borderColor: "black",
// 		marginLeft: 15,
// 		marginRight: 15,
// 		marginBottom: 45,
// 		paddingRight: 10,
// 		top: 20,
// 		bottom: 20,
// 		// alignContent: "center",
// 		// alignItems: "center",
// 		// alignSelf:"center"
// 	},
// 	buttonContainer: {
// 		height: 35,
// 		width: 80,
// 		top: 40,
// 		borderRadius: 20,
// 		// backgroundColor: colors.primary,
// 		backgroundColor: "rgb(52, 175, 183)",
// 		//borderBottomLeftRadius: 10,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		alignSelf: "center",
// 		//backgroundColor: colors.checkButtonColor,
// 		//padding: 10,
// 		//flexGrow: 1,
// 		//top: 100,
// 	},
// });
