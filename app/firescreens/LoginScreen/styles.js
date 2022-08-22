import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import colors from "../../config/colors";

export default StyleSheet.create({
  backgroundImage: {
    width: "100%",
    alignItems: "center",
    flex: 1,
    height: Dimensions.get("screen").height,
    position: "absolute",
  },
  container: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  title: {},
  logo: {
    width: "100%",
    alignSelf: "center",
    marginTop: "15%",
    resizeMode: "contain",
  },
  inputBox: {},
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    marginTop: "5%",
    marginLeft: "10%",
    marginRight: "10%",
    paddingLeft: "3%",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(192, 192, 192)",
  },
  button: {
    backgroundColor: "white",
    marginLeft: "15%",
    marginRight: "15%",
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
    width: "100%",
    flex: 1,
  },
  footerView: {
    alignItems: "center",
    marginTop: "5%",
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
