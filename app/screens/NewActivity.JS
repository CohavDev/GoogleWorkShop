import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";



export default function NewActivity() {
  const [ActivityTime, setActivityTime] = useState('Unknown');
  return (
    <View style = {styles.container}>
      <Text style = {styles.header}> Set your Activity</Text>
      <Text style = {styles.subtitle}>Enter your destination</Text>
      <View style = {styles.box}>
          <TextInput style = {styles.input}>
            Put your destination here
            </TextInput>
      </View>
      <StatusBar style="auto" />
      <Text style = {styles.subtitle}>Activity date </Text>
      <View style = {styles.box}>
        <TextInput style = {styles.input}>Implement here</TextInput>
      </View>
      <Text style = {styles.subtitle}>Activity Time</Text>
      <View style =  {styles.box}>

      <Picker
        selectedValue = {ActivityTime} 
        onValueChange = {(value, index) => setActivityTime(value)}
        mode = "dropdown"
        style = {styles.picker}
        >
        <Picker.Item label="-" value="-" />
        <Picker.Item label="Morning" value="morning" />
        <Picker.Item label="Noon" value="noon" />
        <Picker.Item label="Evening/Night" value="eve" />
      </Picker>
      </View>
      <View style = {styles.buttonContainer}>
      <Button title = "Next" color = "lightgreen"
      >
      </Button>
      </View>
      
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop:40
  },
  header: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    // justifyContent: 'center',
    padding: 40,

  },
  subtitle: {
    color: "#49454F", 
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 15,
    paddingBottom:10,
  },
  picker: {
    width: 175,
    padding: 10,
    borderWidth: 3,
    borderColor: 'black',
    alignSelf: 'flex-end',
    textAlign: 'left',
    direction: 'ltr'
  },
  input: {
    flexDirection:'row',
    margin: 4,
    paddingBottom: 10,
    paddingLeft:10,
    textAlign: 'left',
    direction: 'ltr',
  },
  box: {
    //frame shape
    borderTopStartRadius:10,
    borderTopEndRadius:10,
    borderBottomEndRadius:10,
    borderBottomStartRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
    paddingRight: 10,

  },
  buttonContainer: {
    borderBottomLeftRadius:10,
    // justifyContent: 'flex-start',
    // alignItems: "center",
    padding: 20,
    flexGrow: 1,
  },

});
