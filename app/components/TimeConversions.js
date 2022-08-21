import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { IconButton } from "react-native-paper";
import colors from "../config/colors";
import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/config.js";

export function convertDateToFormattedDate(date) {
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

export function timeToNum(currentHour) {
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

export function dayTimeToNum(dayTime) {
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
