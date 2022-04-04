import { Dimensions } from "react-native";

`use-strict`;
export default {
  background: "#EEDACB",
  circle: "#D9BBA9",
  matchBackground: "rgba(243,224,212,0.5)",
  shapeBackground: 'rgba(243,224,212,0.8)', //circle/oval background color

  primary: "#F79F79",
  secondary: "#F7D08A",
  third:"rgba( 255, 155, 0, 0.5)",
  buttonColor: "#F7D08A",
  secondButtonColor: "rgba( 0, 155, 0, 0.5)",
  thirdButtonColor: "rgba( 255, 105, 50, 0.7)",
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
