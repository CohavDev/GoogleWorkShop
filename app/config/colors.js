import { Dimensions } from "react-native";

`use-strict`;
export default {
  background: "#EEDACB",
  circle: "#D9BBA9",
  matchBackground: "rgba(243,224,212,0.5)",
  primary: "#F79F79",
  secondary: "#F7D08A",
  buttonColor: "#F7D08A",
  deviceWidth: Dimensions.get("window").width,
  // delete later , doesnt belong to colors:
  circularImage: {
    height: 74,
    width: 74,
    borderRadius: 37,
    backgroundColor: "#F7D08A",
    alignItems: "center",
    justifyContent: "center",
  },
};
