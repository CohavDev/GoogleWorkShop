import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    backgroundColor: "white",

    alignItems: "center",
    alignSelf: "center",
    height: undefined,
    width: "100%",
    height: "100%",
    bottom: "0%",
  },
  title: {},
  logo: {
    width: "100%",
    alignSelf: "center",
    width: "100%",
    alignSelf: "center",
    marginTop: "10%",
    resizeMode: "contain",
  },
  inputContainer:{
    height: "50%",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(192, 192, 192)",
  },
  button: {
    backgroundColor: "rgb(52, 175, 183)",
    width: "70%",
    marginLeft: "30%",
    marginRight: "30%",
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    alignItems: "center",
    top: "5%",
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "rgb(52, 175, 183)",
    fontWeight: "bold",
    fontSize: 16,
  },
});
