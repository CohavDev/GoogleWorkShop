import {
  createNativeStackNavigator,
  createStackNavigator,
} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MainMenu from "../screens/MainMenu";
import ChooseActivity from "../screens/ChooseActivity";
import MyActivities from "../screens/MyActivities";

const screens = {
  MainMenu: {
    screen: MainMenu,
  },
  ChooseActivity: {
    screen: ChooseActivity,
  },
  MyActivities: {
    screen: MyActivities,
  },
};

const WelcomeBackScreenStack = createStackNavigator(screens);

export default createAppContainer(WelcomeBackScreenStack);
