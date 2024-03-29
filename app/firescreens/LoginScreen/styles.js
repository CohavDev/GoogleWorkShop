import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import colors from "../../config/colors";

export default StyleSheet.create({
  backgroundImage: {
    width: "100%",
    alignItems: "center",
    flex: 1,
    height: Dimensions.get("screen").height,
    // position: "absolute",
  },
  container: {
    // borderColor: "red",
    // borderWidth: 1,
    // alignContent: "stretch",
    // alignItems: "center",
    // alignSelf: "center",
    // flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  title: {},
  logo: {
    // borderColor: "red",
    // borderWidth: 1,
    width: "100%",
    height: "20%",
    alignSelf: "center",
    top: "10%",
    resizeMode: "contain",
  },
  inputBox: {
    // borderColor: "purple",
    // borderWidth: 1,
    height: "30%",
    // top: "20%",
  },
  input: {
    flex: 1,
    height: 48,
    // top: "25%",
    borderRadius: 5,
    overflow: "hidden",
    // margin: "5%",
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: "5%",
    paddingLeft: "3%",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(192, 192, 192)",
    // position: "relative",
  },
  button: {
    backgroundColor: "white",
    marginLeft: "15%",
    marginRight: "15%",
    // marginTop: "50%",
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
  },
  buttonTitle: {
    color: colors.Secondary,
    fontSize: 16,
    fontWeight: "bold",
  },
  loginBox: {
    // borderColor: "yellow",
    // borderWidth: 5,
    // backgroundColor: "green",
    // marginTop: "20%",
    height: "70%",
    width: "100%",
    // flex: 1,
  },
  footerView: {
    // borderColor: "red",
    // borderWidth: 1,
    alignItems: "center",
    marginTop: "5%",
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#92F8B4",
    fontWeight: "bold",
    fontSize: 16,
  },
});
