import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import ApprovalItem from "../components/ApprovalItem";
import { Entypo } from "@expo/vector-icons";
import myColors from "../config/colors";
export default function ApproveActivity({ navigation }) {
  
/*  <ApprovalItem
            {...{
              activityIcon: "users",
              approvedInfo: "How\nmany",
              data: "2-4",
            }}
          />
 */ 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerContainer}>Approve Activity</Text>
      </View>

      <ScrollView>
        <View style={[styles.container, { paddingHorizontal: 15 }]}>
          <ApprovalItem
            {...{
              activityIcon: "drink",
              approvedInfo: "Activity\nType",
              data: "Drink",
            }}
          />
          <ApprovalItem
            {...{
              activityIcon: "calendar",
              approvedInfo: "Date",
              data: "7/7/2022",
            }}
          />
          <ApprovalItem
            {...{
              activityIcon: "clock",
              approvedInfo: "Time",
              data: "20:00 - 23:59",
            }}
          />
          <ApprovalItem
            {...{
              activityIcon: "location",
              approvedInfo: "Location",
              data: "Florentin,\nTel-Aviv",
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.approveButton}
          onLongPress={() => alert("clicked 'approve'")}
          android_ripple={{ color: "white" }}
          onPress={() => navigation.navigate("MyActivities")}
        >
          <AntDesign name="check" size={30} color="white" />
          <Text style={styles.ButtonText}>Approve</Text>
        </Pressable>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.editButton}
          onLongPress={() => alert("clicked 'edit'")}
          android_ripple={{ color: "white" }}
          onPress={() => navigation.navigate("NewActivityForm")}
        >
          <AntDesign name="edit" size={30} color="white" />
          <Text style={styles.ButtonText}>Edit</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "center",
    width: myColors.deviceWidth,
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
  header: {
    color: "black",
    top: 0,
    //fontWeight: "bold",
    fontSize: 28,
    // justifyContent: 'center',
    //padding: 40,
  },
  title: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: "20%",
    paddingBottom: 15,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  approveButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    left: 60,
    bottom: -115,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: myColors.checkButtonColor,
  },
  editButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    right: 60,
    bottom: -115,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: myColors.editButtonColor,
  },
  ButtonText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    position: "absolute",
    top: 70,
  },
  setFontSizeOne: {
    fontWeight: "bold",
    fontSize: 15, // Define font size here in Pixels
  },
  setFontSizeTwo: {
    fontWeight: "bold",
    fontSize: 20, // Define font size here in Pixels
  },
  setFontSizeThree: {
    fontWeight: "bold",
    fontSize: 25, // Define font size here in Pixels
  },
  setFontSizeFour: {
    fontWeight: "bold",
    fontSize: 30, // Define font size here in Pixels
  },
});
