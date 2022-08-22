import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import colors from "../../config/colors";

export default StyleSheet.create({
  backgroundImage: {
    width: "100%",
    // height: "100%",
    alignItems: "center",
    flex: 1,

    // width: "100%",
    height: Dimensions.get("screen").height,
    // alignItems: "center",
    // flex: 1,
    position: "absolute",
    // top: 0,
    // left: 0,
    // flexDirection: "row",
    // resizeMode: "cover",
  },
  container: {
    // flex: 2,
    alignItems: "center",
    alignSelf: "center",
    height: undefined,
    width: "100%",
    height: "300%",
    bottom: "0%",
    
    // paddingTop: "30%",
    // backgroundColor: "gray",
  },
  title: {

  },
  logo: {
    // flex: 2,
    // height: "50%",
    width: "100%",
    alignSelf: "center",
    marginTop: "15%",
    resizeMode: "contain",
    
  },
  inputBox:{

  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    // backgroundColor: "white",
    marginTop: "5%",
    // marginBottom: "5%",
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
    marginTop: "50%",
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
  loginBox:{
    bottom: "0%",
    // position: "relative",
  },
  footerView: {
    // flex: 1,
    alignItems: "center",
    marginTop: "5%",
    
    // bottom: "5%",
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
