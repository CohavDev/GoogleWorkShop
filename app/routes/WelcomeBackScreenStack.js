import {
  createNativeStackNavigator,
  createStackNavigator,
} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MainMenu from "../screens/MainMenu";
import ChooseActivity from "../screens/ChooseActivity";
import NewActivity from "../screens/NewActivity";
import MyActivities from "../screens/MyActivities";
import ProfileMatching from "../screens/ProfileMatching";
import MatchesScreen from "../screens/MatchesScreen";
import ApproveActivity from "../screens/ApproveActivity";

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
  ProfileMatching: {
    screen: ProfileMatching,
  },
  MatchesScreen: {
    screen: MatchesScreen,
  },
  NewActivityForm: {
    screen: NewActivity,
  },
  ApproveActivity: {
    screen: ApproveActivity,
  },
};

const WelcomeBackScreenStack = createStackNavigator(screens);

export default createAppContainer(WelcomeBackScreenStack);
