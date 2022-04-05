import React from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import colors from "../config/colors";
import DATATWO from "../usersData.json";
const DATA = [
  {
    key: "0",
    name: "Lucy Hutton",
    profilePic:
      "https://64.media.tumblr.com/2f3ae3016833a99f2f4f27300894c761/16601d9d5d326f3b-1d/s540x810/e5763bf4c25566a848231ea1e016ecdeb80bd690.png",
    descriptionText:
      "I'm Lucy, I work at a publishing company. I would like to travel with someone who is NOT Josh.",
  },
  {
    key: "1",
    name: "Joshua Templeman",
    profilePic:
      "https://i.pinimg.com/736x/b4/0e/62/b40e62085aae3e3defd8a070b3a918ff.jpg",
    descriptionText:
      "Hey i'm Josh. Stop staring, shortcake. I can feel your eyes on me.",
  },
  {
    key: "2",
    name: "Harry Potter",
    profilePic:
      "https://www.irishtimes.com/polopoly_fs/1.3170107.1501253408!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg",
    descriptionText: "Anything but Slytherin, anything but Slytherin",
  },
  {
    key: "3",
    name: "Hermione Granger",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLCaNlNk8XUfpCpda0ZMJ0Juk1v2twMk70A&usqp=CAU",
    descriptionText: "It's not 'levi-oooo-sa', it's 'levi-o-saaaa'",
  },
  {
    key: "4",
    name: "Lucy Hutton",
    profilePic:
      "https://64.media.tumblr.com/2f3ae3016833a99f2f4f27300894c761/16601d9d5d326f3b-1d/s540x810/e5763bf4c25566a848231ea1e016ecdeb80bd690.png",
    descriptionText:
      "I'm Lucy, I work at a publishing company. I would like to travel with someone who is NOT Josh.",
  },
  {
    key: "5",
    name: "Joshua Templeman",
    profilePic:
      "https://i.pinimg.com/736x/b4/0e/62/b40e62085aae3e3defd8a070b3a918ff.jpg",
    descriptionText:
      "Hey i'm Josh. Stop staring, shortcake. I can feel your eyes on me.",
  },
  {
    key: "6",
    name: "Harry Potter",
    profilePic:
      "https://www.irishtimes.com/polopoly_fs/1.3170107.1501253408!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg",
    descriptionText: "Anything but Slytherin, anything but Slytherin",
  },
  {
    key: "7",
    name: "Hermione Granger",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLCaNlNk8XUfpCpda0ZMJ0Juk1v2twMk70A&usqp=CAU",
    descriptionText: "It's not 'levi-oooo-sa', it's 'levi-o-saaaa'",
  },
];
export default () => {
  return (
    <View
      style={{
        backgroundColor: colors.secondary,
        height: "100%",
        width: "100%",
      }}
    >
      <View style={styles.background}>
        <FlatList
          data={DATATWO}
          keyExtractor={(item) => item.key}
          renderItem={({ item, index }) => {
            return (
              <View style={[styles.shadowProp, styles.matchBackground]}>
                <Image
                  source={{ uri: item.profilePic }}
                  style={styles.profilePicture}
                />
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    height: 30,
                  }}
                >
                  <View style={styles.nameTag}>
                    <Text style={styles.text}>
                      {item.name} {" , "}
                      {item.age} {"\n"}
                    </Text>
                  </View>
                  <View style={styles.textBox}>
                    <Text
                      style={{
                        alignSelf: "flex-start",
                      }}
                    >
                      {item.desc}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.viewTitleText}>
        <Text style={styles.titleText}>Matches</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  background: {
    backgroundColor: "rgba(255,255,255,0.8)",
    height: "100%",
    width: "100%",
    top: 150,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    position: "absolute",
    //flex: 1,
    //alignSelf: "center",
    //alignItems: "center",
    //top: '10%',
    //marginTop: '15%',
    //marginBottom: '15%',
  },
  matchBackground: {
    backgroundColor: "rgba(255,255,255,0.9)", //colors.matchBackground,
    height: 90,
    width: "90%",
    borderRadius: 10,
    flexDirection: "row",
    paddingLeft: 20,
    alignSelf: "center",
    marginTop: 20,
    alignItems: "center",
    // borderBottomColor: "black",
    // justifyContent: 'center',
    // marginRight: 5,
    // marginLeft: -20,
    // paddingTop: 35,
    // padding: 15,
    // marginBottom: 10,
    // borderBottomWidth: 0.5,
    // borderColor: "black",
    // borderWidth: 1,
    // alignContent: "center",
    // position: 'absolute',
    // shadowColor: "black",
    // shadowOffset: { height: 10, width: 0 },
    // shadowOpacity: 0.9,
    // shadowRadius: 15,
    // elevation:1,
  },
  profilePicture: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginRight: 10,
    marginLeft: -10,
    backgroundColor: "white",
    //padding: 20,
    // marginTop: -40,
    //right: 10,
    // alignSelf: 'center',
    // alignItems: 'stretch',
    // alignContent: 'space-around',
  },
  nameTag: {
    //height: 90,
    width: "80%",
    backgroundColor: "transparent",
    textAlign: "left",
    marginTop: 8,
    marginBottom: 5,
  },
  textBox: {
    height: 60,
    width: "80%",
    backgroundColor: "transparent",
    textAlign: "left",
    marginRight: 50,
    // alignSelf: 'flex-start',
    // alignItems: 'center',
    //marginTop: 20,
    // bottom: 15,
    // alignContent: 'flex-start',
    // borderRadius: 50,
  },
  text: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    //padding: 50,
  },
  viewTitleText: {
    justifyContent: "center",
    alignItems: "center",
    left: 20,
    right: 20,
    position: "absolute",
    // top: 10,
    //textAlign: 'center',
    //flex: 1,
    //flexDirection: 'row',
    //backgroundColor: "blue",
  },
  titleText: {
    color: "black",
    fontSize: 30,
    //  fontWeight: "bold",
    top: 80,
    alignSelf: "center",
    justifyContent: "space-evenly",
    //left: 50,
    //position: 'absolute',
    //marginLeft: 150,
    //textAlign: 'center',
    //borderRadius: 100
    //alignContent: 'center',
  },
});
