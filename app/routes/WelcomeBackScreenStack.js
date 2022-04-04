import { createNativeStackNavigator, createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import WelcomeBackScreen from "../screens/WelcomeBackScreen";
import ChooseActivity from "../screens/ChooseActivity";
import MyActivities from "../screens/MyActivities";

const screens = {
   WelcomeBackScreen:{
      screen: WelcomeBackScreen
   },
   ChooseActivity:{
      screen: ChooseActivity
   },
   MyActivities: {
      screen: MyActivities
   },
}

const WelcomeBackScreenStack = createStackNavigator(screens);

export default createAppContainer(WelcomeBackScreenStack);