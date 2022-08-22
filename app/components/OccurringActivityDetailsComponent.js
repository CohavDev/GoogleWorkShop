import {
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import BigCircle from "./BigCircle";
  import colors from "../config/colors";
  
  export default function OccurringActivityDetailsComponent(props) {
    const DATA = {
      // type: props.navigation.getParam("type"),
      type: props.type,
      // icon: props.navigation.getParam("icon"),
      icon: props.icon,
      // location: props.navigation.getParam("location"),
      location: props.location,
      // startDate: props.navigation.getParam("startDate"),
      startDate: props.startDate,
      // endDate: props.navigation.getParam("startDate"),
      endDate: props.endDate,
      // time: props.navigation.getParam("time"),
      time: props.time,
      // languages: props.navigation.getParam("languages", "english"),
      languages: props.languages,
      travelPartner: props.travelPartner
    };
    const [condDate, setCondDate] = useState(
      props.type == "Place to sleep" ||
        props.type == "Backpacking"
    );

    return (
      <View style={styles.mainContainer}>
        <View style={styles.activityTypeContainer}>
          <Text style={styles.activityTypeText}>{DATA.type}</Text>
          <View style={{ top: 0 }}>
            <BigCircle iconName={DATA.icon} />
          </View>
        </View>
        <View style={styles.activityDetailsContainer}>
          <View style={{ top: 10, left: 25 }}>
            <Text style={styles.bigTitlesStyle}>Activity details:</Text>
            {/*activity location*/}
            <View style={styles.location}>
            <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.titlesStyle}>Location: </Text>
                <Text style={styles.activityDetailsText}>{DATA.location}</Text>
            </View>
            </View>
            {/*activity date*/}
            <View style={styles.date}>
              <View
                style={{
                  left: 0,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {condDate && <Text style={styles.titlesStyle}>From: </Text>}
                {!condDate && <Text style={styles.titlesStyle}>Date: </Text>}
                <Text style={styles.activityDetailsText}>{DATA.startDate}</Text>
              </View>
  
              <View
                style={{
                  left: 55,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {condDate && <Text style={styles.titlesStyle}>To: </Text>}
                {condDate && (
                  <Text style={styles.activityDetailsText}>{DATA.endDate}</Text>
                )}
              </View>
            </View>
            {/*Activity time*/}
            {!condDate && (
              <View style={styles.time}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.titlesStyle}>When: </Text>
                <Text style={styles.activityDetailsText}>{DATA.time}</Text>
              </View>
            </View>
            )}
            
            {/*Activity languages*/}
            <View style={styles.languages}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <Text style={styles.titlesStyle}>Languages:{"  "}</Text>
                <View style={{ width: "60%" }}>
                  <Text style={styles.activityDetailsText}>{DATA.languages}</Text>
                </View>
              </View>
            </View>


            {/*Travel Partner*/}
            <View style={styles.travelPartner}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <Text style={styles.titlesStyle}>Travel Partner: </Text>
                <View style={{ width: "60%" }}>
                  <Text style={styles.activityDetailsText}>{DATA.travelPartner}</Text>
                </View>
              </View>
            </View>


          </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      width: "100%",
      height: "70%",
    },
    activityTypeContainer: {
      width: "100%",
      height: "45%",
      backgroundColor: colors.Secondary,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-start",
      paddingTop: "20%",
      marginBottom: "10%",
    },
    activityTypeTextContainer: {
      justifyContent: "flex-start",
    },
    activityTypeText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
    },
    activityDetailsText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    activityDetailsContainer: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: colors.Background,
      width: "100%",
      height: "100%",
      paddingTop: "10%",
      paddingLeft: "5%",
    },
    titlesStyle: {
      fontSize: 14,
    },
    bigTitlesStyle: {
      fontSize: 17,
    },
    location: {
      top: 30,
    },
    date: {
      top: 60,
      flexDirection: "row",
    },
    time: {
      top: 90,
    },
    languages: {
      top: 120,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      top: 20,
    },
    buttonStyle: {
      width: 100,
      height: 30,
      elevation: 5,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
    },
    travelPartner: {
      top: 150,
    },

  });
  