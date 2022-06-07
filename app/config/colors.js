import { Dimensions } from "react-native";
import Colors from "react-native-multi-selectbox/src/constants/Colors";

`use-strict`;
export default {
    /*3rd Milestone colors*/
    Background: "#FFFFFF",
    Surface: "#FFFFFF",
    Error: "#B00020",
    Primary: "rgb(52, 175, 183)",
    Secondary: "rgb(0, 106, 130)",
    PrimaryVariant: "white",
    SecondaryVariant: "white",
    Button: "white",
    TabBar: "white",
    TabBarText: "rgb(0, 106, 130)",
    grey: "rgb(192,192,192)",

	//new Theme
	// background: "#BFD9CD", //"#96DCD4", //"#EEDACB",
	circle: "#D9BBA9",
	matchBackground: "rgba(243,224,212,0.5)",
	// shapeBackground: 'rgba(245,256,256,0.7)',//'rgba(200,230,230,0.75)',//'rgba(243,224,212,0.8)',// //circle/oval background color
	//   shapeBackground: "rgba(256,256,256,0.9)",
	shapeBackground: "white",
	// secondary: "#D4FFEA", //"#96DCD4", //"#84DCE0", //"#B0EBEA", // "#9DDBD0", //
	// primary: "#336C51", //"#9DDBD0",//"#23A89F", //#AFCFC2
	buttonColor: "#E0FBFC",
	checkButtonColor: "rgba(0,255,140,0.6)",
	editButtonColor: "rgba(100,255,200,0.7)",
	/* Original theme(brown-ish)*/
	// background: "#EEDACB",
	// shapeBackground: 'rgba(243,224,212,0.8)',

	/* Blue theme */
	// background: "#BFD9CD",//"#96DCD4", //"#EEDACB",
	// circle: "#D9BBA9",
	// matchBackground: "rgba(243,224,212,0.5)",
	// // shapeBackground: 'rgba(245,256,256,0.7)',//'rgba(200,230,230,0.75)',//'rgba(243,224,212,0.8)',// //circle/oval background color
	// shapeBackground: 'rgba(256,256,256,0.7)',
	// secondary: "#E0FAF1",//"#96DCD4", //"#84DCE0", //"#B0EBEA", // "#9DDBD0", //
	// primary: "#5ABFBF", //"#9DDBD0",//"#23A89F", //#AFCFC2
	// buttonColor: "rgba(0,131,143,0.6)",
	// checkButtonColor: "rgba(0,255,140,0.6)",

	/* Green theme */
	// background: "#6BF0D2", //"#EEDACB",
	// circle: "#D9BBA9",
	// matchBackground: "rgba(243,224,212,0.5)",
	// shapeBackground: 'rgba(230,240,230,0.75)',//'rgba(200,230,230,0.75)',//'rgba(243,224,212,0.8)',// //circle/oval background color

	// secondary: "#A2FAE0", //"#B8FFE4", //"#84DCE0", //"#B0EBEA", // "#9DDBD0", //"#A2FAE0", //
	// primary: "#66E3C4", //"#69D6B5", //"#9DDBD0",//"#23A89F", //
	// buttonColor: "#5CBD9D",

	/* Orange Theme */
	// primary: "#F79F79",
	// secondary: "#F7D08A",
	// buttonColor: "#F7D08A",
	deviceWidth: Dimensions.get("window").width,
	// delete later , doesnt belong to colors:
    title: {
		// color: "rgb(192,192,192)",
        color: "black",
		fontSize: 14,
	},

	circularImage: {
		height: 60,
		width: 60,
		borderRadius: 30,
        elevation: 5,
		// top: 50,
		// left: 20,

		//backgroundColor: "#66E3C4",//"#69D6B2", //Green theme

		backgroundColor: "rgb(52, 175, 183)", // "#D4FFEA", //"#96DCD4", //Blue theme
		// backgroundColor: "#F7D08A", //Orange theme
		alignItems: "center",
		justifyContent: "center",
	},
	backgroundImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		//shadowColor: "white",
		// opacity: 0.8, //blue theme
		opacity: 0.6, //green theme
	},
};
