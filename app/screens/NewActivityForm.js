import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Pressable } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import colors from "../config/colors";

export default function NewActivityForm(props) {
  const pressConfirm = () => {
    props.navigation.navigate("ApproveActivity");
  };

   const [ActivityTime, setActivityTime] = useState("Unknown");
   
   return (
      <View style={styles.container}>
         <View
            style={styles.headerContainer}>
            <Text style={styles.header}> Set your Activity</Text>
         </View>
         <View style={styles.ovalsContainer}>
            <View style={styles.ovalShape}>
               <Text style={styles.subtitle}>Enter your destination</Text>
               <View style={styles.box}>
                  <TextInput style={styles.input}>
                     Put your destination here
                  </TextInput>
               </View>
               <StatusBar style="auto" />
            </View>
            
            <View style={styles.ovalShape}>
               <Text style={styles.subtitle}>Activity date </Text>
               <View style={styles.box}>
                  <TextInput style={styles.input}>Implement here</TextInput>
               </View>
            </View>

            <View style={styles.ovalShape}>
               <Text style={styles.subtitle}>Activity Time</Text>
               <View style={styles.box}>
                  <Picker
                     selectedValue={ActivityTime}
                     onValueChange={(value, index) => setActivityTime(value)}
                     mode="dropdown"
                     style={styles.picker}
                  >
                     <Picker.Item label="-" value="-" />
                     <Picker.Item label="Morning" value="morning" />
                     <Picker.Item label="Noon" value="noon" />
                     <Picker.Item label="Evening/Night" value="eve" />
                  </Picker>
               </View>
            </View>

          <View 
            //  style={{
            //    width: '100%',
            //    //height: '100%',
            //    color: 'white',}}
          >
              <Pressable 
                onPress={pressConfirm}
                style={styles.buttonContainer} >
                <Text style={{fontWeight: "bold",}}>Confirm</Text>
              </Pressable>
          </View>
         </View>
         
      </View>
   );
}

const styles = StyleSheet.create({
   ovalsContainer: {
      backgroundColor: "rgba(255,255,255,0.8)",
      height: "80%",
      width: "100%",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
      alignContent: "space-between",
      //paddingRight: 20,
      //paddingTop: 50,
       //top: 0,
   },
   headerContainer: {
      width: "100%",
      height: "20%",

      backgroundColor: "transparent",
      //alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      //height: 70,
      //left: 20,
      //right: 20,
      //position: "absolute",
   },
   container: {
      backgroundColor: colors.secondary,
      height: "100%",
      width: "100%",
      //flex: 1,
      flexDirection: "column",
      justifyContent: 'space-evenly',
      //backgroundColor: "#fff",
      alignItems: "center",
      //alignContent: "space-between",
      //paddingRight: 20,
      //paddingTop: 100,
      //bottom: 100,
   },
   header: {
      color: "black",
      top: 0,
      //fontWeight: "bold",
      fontSize: 28,
      // justifyContent: 'center',
      //padding: 40,
   },
   ovalShape: {
      shadowColor: "#171717",
      shadowOffset: { width: -5, height: 5 },
      shadowOpacity: 0.9,
      shadowRadius: 3,
      elevation: 5,
    
      backgroundColor: "rgba(255,255,255,0.9)",
      width: 300,
      height: 120,
      borderRadius: 10,
      //bottom: 60,
      //flexDirection: "row",
    
      alignItems: "center",
      justifyContent: "center",
      //marginTop: 50,
      //margin: -10,
      alignContent: 'space-between',
      // position: 'absolute',
   },
   subtitle: {
      color: "#49454F",
      fontWeight: "bold",
      fontSize: 20,
      paddingLeft: 15,
      paddingBottom: 10,
      top: 20,
      bottom: 20,
   },
   picker: {
      width: 175,
      padding: 10,
      borderWidth: 3,
      borderColor: "black",
      alignSelf: "flex-end",
      textAlign: "left",
      direction: "ltr",
   },
   input: {
      flexDirection: "row",
      margin: 4,
      paddingBottom: 10,
      paddingLeft: 10,
      textAlign: "left",
      direction: "ltr",
   },
   box: {
      //frame shape
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 10,
      borderWidth: 1,
      backgroundColor: "white",
      borderColor: "black",
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 30,
      paddingRight: 10,
      top: 20,
      bottom: 20,
   },
   buttonContainer: {
      height:50,
      width: 80,
      top:10,
      borderRadius: 20,
      backgroundColor: colors.primary,

      //borderBottomLeftRadius: 10,
      justifyContent: 'center',
      alignItems: "center",
      alignSelf: "center",
      //backgroundColor: colors.checkButtonColor,
      //padding: 10,
      //flexGrow: 1,
      //top: 100,
   },
});
